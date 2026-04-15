import { z } from "zod";

export const ChatInputSchema = z.object({
	input: z.string(),
});

export type ChatInputType = z.infer<typeof ChatInputSchema>;
