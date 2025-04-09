import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "node:fs";
import { env } from "../env";

const r2Client = new S3Client({
	region: "auto",
	endpoint: env.ENDPOINT_R2,
	credentials: {
		accessKeyId: env.CLIENT_ID_R2,
		secretAccessKey: env.CLIENT_SECRET_R2,
	},
});

export async function uploadToR2(
	filePath: string,
	key: string,
	contentType: string,
) {
	const fileStream = fs.createReadStream(filePath);

	const uploadParams = {
		Bucket: env.BUCKET_NAME,
		Key: key,
		Body: fileStream,
		ContentType: contentType,
	};

	await r2Client.send(new PutObjectCommand(uploadParams));

	console.log("Upload Feito!");
	return `${env.R2_DOMAIN}/${key}`;
}
