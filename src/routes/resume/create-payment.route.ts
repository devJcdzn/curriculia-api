import { createPaymentController } from "../../resumes/create-payment-controller";
import type { FastifyTypedInstance } from "../../types";
import { createPaymentBodyRequest, createPaymentQueryRequest } from "./schema";

export async function createPaymentRoute(app: FastifyTypedInstance) {
	app.post(
		"/",
		{
			schema: {
				body: createPaymentBodyRequest,
				querystring: createPaymentQueryRequest,
			},
		},
		(req, res) => createPaymentController(req, res),
	);
}
