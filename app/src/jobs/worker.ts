import { Worker, QueueEvents } from "bullmq";
import { env } from "@/config/env";
import IORedis from "ioredis";
import { logger } from "@/lib/logger";

const connection = new IORedis(env.REDIS_URL);

const processors: Record<string, (job: any) => Promise<any>> = {
	"email:poll": (await import("./processors/emailPoll")).default,
	"parse:invoice": (await import("./processors/parseInvoice")).default,
	"post:xero": (await import("./processors/postXero")).default,
	"post:qbo": (await import("./processors/postQbo")).default,
	"email:reply": (await import("./processors/emailReply")).default,
	"notify": (await import("./processors/notify")).default,
} as any;

for (const [queueName, handler] of Object.entries(processors)) {
	const worker = new Worker(queueName.replace(/:/g, "-"), handler as any, { connection });
	const events = new QueueEvents(queueName.replace(/:/g, "-"), { connection });
	events.on("completed", ({ jobId }) => logger.info("job completed", { jobId }, { jobName: queueName }));
	events.on("failed", ({ jobId, failedReason }) => logger.error("job failed", { jobId, failedReason }, { jobName: queueName }));
	worker.on("error", (err) => logger.error("worker error", { error: String(err) }, { jobName: queueName }));
}

logger.info("Worker started", { redis: env.REDIS_URL });