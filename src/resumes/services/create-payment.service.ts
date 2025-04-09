import { createPaymentSession } from "../../config/stripe";
import { ResumeRepository } from "../repository/resume-repository";

const resumeRepo = new ResumeRepository();

export async function createPaymentService({
	email,
	method,
	fileKey,
}: { email: string; method: string; fileKey: string }) {
	const resumeExists = await resumeRepo.findByKey(fileKey);

	if (!resumeExists) throw new Error("Not found resume");

	const stripeCheckoutSessionUrl = await createPaymentSession(fileKey);

	if (!stripeCheckoutSessionUrl) throw new Error("Error to generate checkout");

	await resumeRepo.createOrUpdateResume({
		key: fileKey,
		pdfUrl: resumeExists.pdfUrl,
		previewUrl: resumeExists.previewUrl,
		updatedAt: new Date(),
		status: "pending",
		userEmail: email,
	});

	return {
		checkoutUrl: stripeCheckoutSessionUrl,
	};
}
