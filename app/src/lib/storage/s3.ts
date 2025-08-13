import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/config/env";

const hasS3 = !!(env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY && env.S3_BUCKET);

const client = hasS3
	? new S3Client({ region: env.S3_REGION, credentials: { accessKeyId: env.S3_ACCESS_KEY_ID!, secretAccessKey: env.S3_SECRET_ACCESS_KEY! } })
	: null;

export async function uploadObject(key: string, body: Buffer | Uint8Array | string, contentType?: string) {
	if (!client) {
		return { key, url: `file://local/${key}` };
	}
	await client.send(new PutObjectCommand({ Bucket: env.S3_BUCKET!, Key: key, Body: body, ContentType: contentType }));
	const url = await getSignedUrl(client, new GetObjectCommand({ Bucket: env.S3_BUCKET!, Key: key }), { expiresIn: 3600 });
	return { key, url };
}

export async function getObjectUrl(key: string) {
	if (!client) return `file://local/${key}`;
	return getSignedUrl(client, new GetObjectCommand({ Bucket: env.S3_BUCKET!, Key: key }), { expiresIn: 3600 });
}