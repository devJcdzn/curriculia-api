import { webhookController } from "../../webhook/webhook.controller";

import type { FastifyTypedInstance } from "../../types";

export async function webhookRoute(app: FastifyTypedInstance) {
	app.post(
		"/",
		{
			config: {
				rawBody: true,
			},
			schema: {
				// body: createResumeRequestSchema,
			},
		},
		(req, res) => webhookController(req, res),
	);
}
