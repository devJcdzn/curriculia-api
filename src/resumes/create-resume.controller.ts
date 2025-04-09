import type { FastifyReply, FastifyRequest } from "fastify";
import { createResumeService } from "./services/create-resume.service";

interface createResumeRequest extends FastifyRequest {
	body: {
		profileData: {
			fullName: string;
			title: string;
			location?: string;
			contact: {
				email: string;
				phone?: string;
				linkedin?: string;
				github?: string;
				portfolio?: string;
			};
			about: string;
			experiences: Array<{
				position: string;
				company: string;
				startDate: string;
				endDate?: string;
				responsibilities: string[];
				achievements?: string[];
			}>;
			education: Array<{
				degree: string;
				institution: string;
				yearOfCompletion: string;
			}>;
			skills: string[];
			projects?: Array<{
				name: string;
				description: string;
				technologies: string[];
				link?: string;
			}>;
			certifications?: Array<{
				name: string;
				issuer: string;
				year: string;
			}>;
			languages?: Array<{
				language: string;
				level: string;
			}>;
			selectedTemplate: string;
		};
	};
}

export const createResumeController = async (
	request: createResumeRequest,
	reply: FastifyReply,
) => {
	const { profileData } = request.body;

	const result = await createResumeService({ profileData });

	return reply.code(200).send({
		result,
	});
};
