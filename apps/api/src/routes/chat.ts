import type { APIResponse } from "@proply/types";
import { ChatInputSchema } from "@proply/types";
import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { getChatResponse } from "../utils/openai";

const chat = new Hono();

chat.post("/chat", async (c) => {
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

	return streamSSE(c, async (sseStream) => {
		try {
			const openaiStream = await getChatResponse(
				parsed.data.input,
				parsed.data.previous_response_id
			);

			let responseId: string | null = null;

			for await (const event of openaiStream) {
				if (event.type === "response.created") {
					responseId = event.response.id;
				} else if (event.type === "response.output_text.delta") {
					await sseStream.writeSSE({
						data: event.delta,
						event: "chunk",
					});
				} else if (event.type === "response.web_search_call.searching") {
					const { query } = event as unknown as { query: string };
					if (query) {
						await sseStream.writeSSE({
							data: query,
							event: "web_search",
						});
					}
				}
			}

			if (responseId) {
				await sseStream.writeSSE({
					data: responseId,
					event: "response_id",
				});
			}

			await sseStream.writeSSE({
				data: "[DONE]",
				event: "done",
			});
		} catch (error) {
			console.error(error);
			await sseStream.writeSSE({
				data: "Something went wrong",
				event: "error",
			});
		}
	});
});

export default chat;
