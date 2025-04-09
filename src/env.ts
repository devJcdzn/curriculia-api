import { z } from "zod";

export const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	GEMINI_API_KEY: z.string(),
	TOKEN_R2: z.string(),
	CLIENT_ID_R2: z.string(),
	CLIENT_SECRET_R2: z.string(),
	ENDPOINT_R2: z.string().url(),
	R2_DOMAIN: z.string().url(),
	BUCKET_NAME: z.string(),
	MONGODB_URL: z.string(),
	STRIPE_PUB_KEY: z.string(),
	STRIPE_PRIVATE_KEY: z.string(),
	FRONT_URL: z.string().url(),
	STRIPE_WH_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
