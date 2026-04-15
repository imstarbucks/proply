import { ChatInputSchema, type APIResponse } from "@proply/types";
import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { getChatResponse } from "../utils/openai";

const chat = new Hono();

chat.post("/", async (c) => {
	const req = c.req;

	const body = await req.json();
	const parsed = ChatInputSchema.safeParse(body);

	if (!parsed.success) {
		return c.json<APIResponse>(
			{
				success: false,
				error: parsed.error.issues[0].message,
			},
			400
		);
	}

	return streamSSE(c, async (stream) => {
		try {
			const res = await getChatResponse(parsed.data.input);

			await stream.writeSSE({
				data: res,
				event: "chunk",
			});

			await stream.writeSSE({
				data: "[DONE]",
				event: "done",
			});
		} catch (error) {
			console.error(error);
			await stream.writeSSE({
				data: "Something went wrong",
				event: "error",
			});
		}
	});
});

export default chat;
