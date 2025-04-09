import z from "zod";

export const createResumeRequestSchema = z.object({
	profileData: z.object({
		fullName: z.string(),
		title: z.string(),
		location: z.string().optional(),
		contact: z.object({
			email: z.string().email(),
			phone: z.string().optional(),
			linkedin: z.string().optional(),
			github: z.string().optional(),
			portfolio: z.string().optional(),
		}),
		about: z.string(),
		experiences: z.array(
			z.object({
				position: z.string(),
				company: z.string(),
				startDate: z.string(), // você pode trocar para z.coerce.date() se quiser validar datas reais
				endDate: z.string().optional(),
				responsibilities: z.array(z.string()),
				achievements: z.array(z.string()).optional(),
			}),
		),
		education: z.array(
			z.object({
				degree: z.string(),
				institution: z.string(),
				yearOfCompletion: z.string(), // ou z.coerce.number().int()
			}),
		),
		skills: z.array(z.string()),
		projects: z
			.array(
				z.object({
					name: z.string(),
					description: z.string(),
					technologies: z.array(z.string()),
					link: z.string().optional(),
				}),
			)
			.optional(),
		certifications: z
			.array(
				z.object({
					name: z.string(),
					issuer: z.string(),
					year: z.string(), // ou z.coerce.number().int()
				}),
			)
			.optional(),
		languages: z
			.array(
				z.object({
					language: z.string(),
					level: z.string(),
				}),
			)
			.optional(),
		selectedTemplate: z.string(),
	}),
});

export const createPaymentBodyRequest = z.object({
	email: z.string().email(),
	method: z.string(),
});

export const createPaymentQueryRequest = z.object({
	fileKey: z.string(),
});
