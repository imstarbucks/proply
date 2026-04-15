import { z } from "zod";
export const APIResponseSuccessSchema = z.object({
	success: z.literal(true),
	message: z.string(),
});

export const APIResponseFailedSchema = z.object({
	success: z.literal(false),
	error: z.string(),
});

export const APIResponseSchema = z.discriminatedUnion("success", [
	APIResponseSuccessSchema,
	APIResponseFailedSchema,
]);

export type APIResponse = z.infer<typeof APIResponseSchema>;
