import type { Job } from "bullmq";
import { prisma } from "@/server/db";
import { logger } from "@/lib/logger";

export default async function processor(job: Job<{ orgId: string }>) {
	const { orgId } = job.data;
	logger.info("emailPoll start", {}, { jobName: job.name, orgId });
	// TODO: integrate Gmail / MS Graph. For now, create a placeholder AuditLog entry.
	await prisma.auditLog.create({ data: { orgId, action: "EMAIL_POLL", meta: { note: "Stub poll executed" } } });
	logger.info("emailPoll done", {}, { jobName: job.name, orgId });
}