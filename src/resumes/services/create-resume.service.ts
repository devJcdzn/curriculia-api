import { nanoid } from "nanoid";
import { generateLatexResumeByJson } from "../../lib/prompts";
import { convertToImage, deleteLocalFiles, generatePDF } from "../../lib/utils";
import { geminiAi } from "../../providers/gemini";
import { ResumeRepository } from "../repository/resume-repository";

const resumeRepo = new ResumeRepository();

interface ProfileData {
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
}

export async function createResumeService({ profileData }: ProfileData) {
	const prompt = generateLatexResumeByJson(profileData);

	const response = await geminiAi.models.generateContent({
		model: "gemini-2.0-flash",
		contents: prompt,
	});

	if (response.text) {
		try {
			const fileKey = `resume_${profileData.fullName.replace(" ", "_").toLowerCase()}-${nanoid()}`;

			const pdfUrl = await generatePDF(response.text, fileKey);
			const previewUrl = await convertToImage(fileKey);

			const resumeData = {
				key: fileKey,
				pdfUrl,
				previewUrl,
			};

			const resume = await resumeRepo.createOrUpdateResume(resumeData);

			deleteLocalFiles();

			return {
				previewUrl: resume.previewUrl,
			};
		} catch (err) {
			console.error(err);
		}
	}
}
