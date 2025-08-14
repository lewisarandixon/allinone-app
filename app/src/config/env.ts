import { z } from "zod";

const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	REDIS_URL: z.string().default("redis://localhost:6379"),
	NEXTAUTH_SECRET: z.string().default("dev-secret"),
	NEXTAUTH_URL: z.string().default("http://localhost:3000"),
	GOOGLE_CLIENT_ID: z.string().optional(),
	GOOGLE_CLIENT_SECRET: z.string().optional(),
	AZURE_AD_CLIENT_ID: z.string().optional(),
	AZURE_AD_TENANT_ID: z.string().optional(),
	AZURE_AD_CLIENT_SECRET: z.string().optional(),
	STRIPE_SECRET_KEY: z.string().optional(),
	STRIPE_PRICE_PRO: z.string().optional(),
	STRIPE_WEBHOOK_SECRET: z.string().optional(),
	OPENAI_API_KEY: z.string().optional(),
	PDFCO_API_KEY: z.string().optional(),
	S3_ACCESS_KEY_ID: z.string().optional(),
	S3_SECRET_ACCESS_KEY: z.string().optional(),
	S3_BUCKET: z.string().optional(),
	S3_REGION: z.string().optional(),
	XERO_CLIENT_ID: z.string().optional(),
	XERO_CLIENT_SECRET: z.string().optional(),
	XERO_REDIRECT_URI: z.string().optional(),
	QBO_CLIENT_ID: z.string().optional(),
	QBO_CLIENT_SECRET: z.string().optional(),
	QBO_REDIRECT_URI: z.string().optional(),
	SENTRY_DSN: z.string().optional(),
	ENCRYPTION_KEY: z.string().min(16, "ENCRYPTION_KEY must be at least 16 chars").default("0123456789abcdef"),
});

export type AppEnv = z.infer<typeof EnvSchema>;

let cached: AppEnv | null = null;

export function getEnv(): AppEnv {
	if (cached) return cached;
	const parsed = EnvSchema.safeParse(process.env);
	if (!parsed.success) {
		const issues = parsed.error?.issues ?? [];
		const message = issues.map(e => `${e.path.join(".")}: ${e.message}`).join("; ");
		throw new Error(`Invalid environment variables: ${message}`);
	}
	cached = parsed.data;
	return cached;
}

export const env = getEnv();