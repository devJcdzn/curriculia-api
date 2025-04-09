import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { convertPDF } from "pdf2image";
import { uploadToR2 } from "../providers/r2";

const execPromise = promisify(exec);

// Test generate PDF function
export const testGenerate = async () => {
	const tempDir = path.join(process.cwd(), "tmp");
	const texFilePath = path.join(tempDir, "resume_jean_carlos.tex");
	const pdfFilePath = path.join(tempDir, "resume_jean_carlos.pdf");

	const { stdout, stderr } = await execPromise(
		`pdflatex -output-directory=${tempDir} ${texFilePath}`,
	);
	console.log("AEEEE");
	// Logs para diagnóstico
	console.log(stdout);
	if (stderr) {
		console.error(stderr);
	}

	if (!fs.existsSync(pdfFilePath)) {
		throw new Error("Erro ao gerar o PDF");
	}

	return pdfFilePath;
};

export async function generatePDF(latexCode: string, key: string) {
	const tempDir = path.join(process.cwd(), "tmp");
	if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

	const texFilePath = path.join(tempDir, `${key}.tex`);
	const pdfFilePath = path.join(tempDir, `${key}.pdf`);

	const cleanLatexCode = latexCode.replace(/^```latex\s+|```$/g, "");

	fs.writeFileSync(texFilePath, cleanLatexCode);
	console.log("Gerou o LaTeX!");

	try {
		console.log("Tentando pdf");
		const { stdout, stderr } = await execPromise(
			`pdflatex -output-directory=${tempDir} ${texFilePath}`,
		);

		if (stderr) {
			console.error(stderr);
		}

		if (!fs.existsSync(pdfFilePath)) {
			throw new Error("Erro ao gerar o PDF");
		}

		return await uploadToR2(pdfFilePath, `pdfs/${key}`, "application/pdf");
	} catch (error) {
		throw new Error(`Erro ao executar pdflatex: ${(error as Error).message}`);
	}
}

export async function convertToImage(fileKey: string) {
	const tempDir = path.join(process.cwd(), "tmp");
	const pdfFilePath = path.join(tempDir, `${fileKey}.pdf`);
	const imgFilePath = path.join(tempDir, "images");

	if (!fs.existsSync(imgFilePath)) {
		fs.mkdirSync(imgFilePath, { recursive: true });
	}

	try {
		const result = await convertPDF(pdfFilePath, {
			outputFormat: `${imgFilePath}/${fileKey}_%d.png`,
		});

		return await uploadToR2(
			result[0].path,
			`previews/${fileKey}`,
			"application/png",
		);
	} catch (error) {
		throw new Error(
			`Error converting PDF to image: ${(error as Error).message}`,
		);
	}
}

export function deleteLocalFiles() {
	const tempDir = path.join(process.cwd(), "tmp");
	fs.rmSync(tempDir, { recursive: true });
}
