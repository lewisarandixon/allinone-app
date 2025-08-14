import crypto from "crypto";
import { env } from "@/config/env";

const algorithm = "aes-256-gcm";

export function encrypt(text: string) {
	const iv = crypto.randomBytes(12);
	const key = crypto.createHash("sha256").update(env.ENCRYPTION_KEY).digest();
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
	const tag = cipher.getAuthTag();
	return `${iv.toString("hex")}.${tag.toString("hex")}.${encrypted.toString("hex")}`;
}

export function decrypt(payload: string) {
	const [ivHex, tagHex, dataHex] = payload.split(".");
	const iv = Buffer.from(ivHex, "hex");
	const tag = Buffer.from(tagHex, "hex");
	const data = Buffer.from(dataHex, "hex");
	const key = crypto.createHash("sha256").update(env.ENCRYPTION_KEY).digest();
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	decipher.setAuthTag(tag);
	const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
	return decrypted.toString("utf8");
}