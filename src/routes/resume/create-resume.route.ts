import { createResumeController } from "../../resumes/create-resume.controller";
import type { FastifyTypedInstance } from "../../types";
import { createResumeRequestSchema } from "./schema";

export async function createResumeRoute(app: FastifyTypedInstance) {
	app.post(
		"/create",
		{
			schema: {
				body: createResumeRequestSchema,
			},
		},
		(req, res) => createResumeController(req, res),
	);
}
