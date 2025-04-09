import type { FastifyReply, FastifyRequest } from "fastify";
import type Stripe from "stripe";
import { stripe } from "../config/stripe";
import { env } from "../env";

export const webhookController = (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log("passsou antes");
	const sig = request.headers["stripe-signature"];
	console.log("passsou depois");

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			request.rawBody as Buffer,
			sig as string,
			env.STRIPE_WH_SECRET,
		);
	} catch (err) {
		console.log(err);
		return reply.code(400).send(`Webhook Error: ${(err as Error).message}`);
	}

	switch (event.type) {
		case "payment_intent.succeeded": {
			const paymentIntentSucceeded = event.data.object;
			console.log(paymentIntentSucceeded);
			break;
		}
		default:
			console.log("non event");
	}

	return reply.code(204);
};
