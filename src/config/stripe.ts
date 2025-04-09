import Stripe from "stripe";
import { env } from "../env";

export const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, {
	apiVersion: "2025-02-24.acacia",
});

export async function createPaymentSession(fileKey: string) {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "brl",
						product_data: {
							name: "Curriculia - Prossisional Resume",
						},
						unit_amount: 700,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `${env.FRONT_URL}/success`,
			cancel_url: `${env.FRONT_URL}/resume?fileKey=${fileKey}`,
		});

		return session.url;
	} catch (err) {
		console.log(err);
		throw new Error((err as Error).message);
	}
}
