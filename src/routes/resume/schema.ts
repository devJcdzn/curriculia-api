import z from "zod";

export const createResumeRequestSchema = z.object({
	about: z.string(),
});

export const createPaymentBodyRequest = z.object({
	email: z.string().email(),
	method: z.string(),
});

export const createPaymentQueryRequest = z.object({
	fileKey: z.string(),
});
