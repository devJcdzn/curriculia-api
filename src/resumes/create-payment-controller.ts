import type { FastifyReply, FastifyRequest } from "fastify";
import { createPaymentService } from "./services/create-payment.service";

interface createPaymentRequest extends FastifyRequest {
	body: {
		email: string;
		method: string;
	};
	query: {
		fileKey: string;
	};
}

export const createPaymentController = async (
	request: createPaymentRequest,
	reply: FastifyReply,
) => {
	const { email, method } = request.body;
	const { fileKey } = request.query;

	const result = await createPaymentService({ email, method, fileKey });

	return reply.code(200).send({
		result,
	});
};
