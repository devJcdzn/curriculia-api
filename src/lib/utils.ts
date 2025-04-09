import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
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
	const tempDir = path.join("/tmp");
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
	const tempDir = path.join("/tmp");
	const pdfFilePath = path.join(tempDir, `${fileKey}.pdf`);
	const imgDirPath = path.join(tempDir, "images");
	const outputPrefix = path.join(imgDirPath, fileKey);

	if (!fs.existsSync(imgDirPath)) {
		fs.mkdirSync(imgDirPath, { recursive: true });
	}

	const outputImagePath = `${outputPrefix}.png`;

	try {
		await execPromise(
			`pdftoppm -png -singlefile "${pdfFilePath}" "${outputPrefix}"`,
		);

		if (!fs.existsSync(outputImagePath)) {
			throw new Error("Imagem não foi gerada.");
		}

		return await uploadToR2(
			outputImagePath,
			`previews/${fileKey}`,
			"image/png",
		);
	} catch (error) {
		throw new Error(
			`Erro ao converter PDF para imagem: ${(error as Error).message}`,
		);
	}
}

export function deleteLocalFiles() {
	const tempDir = path.join("/tmp");
	fs.rmSync(tempDir, { recursive: true });
}
