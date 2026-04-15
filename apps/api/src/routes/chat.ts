import type { APIResponse } from "@proply/types";
import { Hono } from "hono";

const chat = new Hono();

chat.post("/", async (c) => {
	const req = c.req;

	const fd = await req.formData();
	const name = fd.get("name");

	if (!name) {
		return c.json<APIResponse>({
			success: false,
			error: "Name field is required.",
		});
	}

	return c.json<APIResponse>({
		success: true,
		message: `Hello ${name}`,
	});
});

export default chat;
