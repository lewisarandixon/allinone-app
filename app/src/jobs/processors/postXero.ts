import type { Job } from "bullmq";
import { prisma } from "@/server/db";
import { logger } from "@/lib/logger";

export default async function processor(job: Job<{ documentId: string; orgId: string }>) {
	const { documentId, orgId } = job.data;
	logger.info("postXero start", { documentId }, { jobName: job.name, orgId });
	await prisma.auditLog.create({ data: { orgId, action: "POST_BILL", subjectId: documentId, meta: { provider: "xero", stub: true } } });
	await prisma.document.update({ where: { id: documentId }, data: { status: "posted" } });
	logger.info("postXero done", { documentId }, { jobName: job.name, orgId });
}