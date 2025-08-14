type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
	jobName?: string;
	orgId?: string;
	provider?: string;
	correlationId?: string;
}

function log(level: LogLevel, message: string, meta?: Record<string, unknown>, ctx?: LogContext) {
	const record = { level, message, time: new Date().toISOString(), ...ctx, ...meta };
	if (level === "error") console.error(record);
	else if (level === "warn") console.warn(record);
	else if (level === "debug") console.debug(record);
	else console.log(record);
}

export const logger = {
	debug: (msg: string, meta?: Record<string, unknown>, ctx?: LogContext) => log("debug", msg, meta, ctx),
	info: (msg: string, meta?: Record<string, unknown>, ctx?: LogContext) => log("info", msg, meta, ctx),
	warn: (msg: string, meta?: Record<string, unknown>, ctx?: LogContext) => log("warn", msg, meta, ctx),
	error: (msg: string, meta?: Record<string, unknown>, ctx?: LogContext) => log("error", msg, meta, ctx),
};