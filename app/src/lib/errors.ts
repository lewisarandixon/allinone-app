export type AppErrorCode =
	| "UNAUTHORIZED"
	| "NOT_FOUND"
	| "VALIDATION_ERROR"
	| "PROVIDER_ERROR"
	| "RATE_LIMIT"
	| "CONFLICT"
	| "INTERNAL";

export class AppError extends Error {
	code: AppErrorCode;
	cause?: unknown;
	constructor(code: AppErrorCode, message: string, cause?: unknown) {
		super(message);
		this.code = code;
		this.cause = cause;
	}
}

export function fromProvider(provider: string, err: unknown, defaultMessage = "Provider request failed") {
	const message = err instanceof Error ? err.message : defaultMessage;
	return new AppError("PROVIDER_ERROR", `${provider}: ${message}`, err);
}