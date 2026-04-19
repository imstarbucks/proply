import { z } from "zod";

export const ChatInputSchema = z.object({
	input: z.string(),
	previous_response_id: z.string().optional(),
});

export type ChatInputType = z.infer<typeof ChatInputSchema>;
