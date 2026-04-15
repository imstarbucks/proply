import type { APIResponse } from "@proply/types";
import { Hono } from "hono";
import { getChatResponse } from "../utils/openai";

const chat = new Hono();

chat.post("/", async (c) => {
	const req = c.req;

	const fd = await req.formData();
	const input = fd.get("input");

	if (!input) {
		return c.json<APIResponse>({
			success: false,
			error: "input field is required.",
		});
	}

	if (typeof input !== "string") {
		return c.json<APIResponse>({
			success: false,
			error: "input field must be a string.",
		});
	}

	const res = await getChatResponse(input);

	return c.json<APIResponse>({
		success: true,
		message: res,
	});
});

export default chat;
