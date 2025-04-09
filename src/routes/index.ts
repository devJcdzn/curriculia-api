import type { FastifyTypedInstance } from "../types";
import { createPaymentRoute } from "./resume/create-payment.route";
import { createResumeRoute } from "./resume/create-resume.route";
import { webhookRoute } from "./webhook/webhook.route";

export async function routes(app: FastifyTypedInstance) {
	app.register(createResumeRoute, { prefix: "/resume" });
	app.register(createPaymentRoute, { prefix: "/pay" });
	app.register(webhookRoute, { prefix: "/wbh" });
}
