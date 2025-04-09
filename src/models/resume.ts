import { Schema, model } from "mongoose";

export interface IResume {
	key: string;
	userEmail?: string;
	status?: "none" | "pending" | "paid" | "failed" | "canceled";
	pdfUrl: string;
	previewUrl: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const resumeSchema = new Schema<IResume>({
	key: { type: String, required: true, unique: true },
	userEmail: { type: String, required: false },
	status: {
		type: String,
		enum: ["pending", "paid", "failed", "canceled", "none"],
		default: "none",
	},
	pdfUrl: { type: String, required: true },
	previewUrl: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

// Criando o modelo Resume
const Resume = model<IResume>("Resume", resumeSchema);

export { Resume };
