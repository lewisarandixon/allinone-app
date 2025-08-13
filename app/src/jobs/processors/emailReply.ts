import type { Job } from "bullmq";
import { prisma } from "@/server/db";

export default async function processor(job: Job<{ orgId: string; draftId: string }>) {
	await prisma.auditLog.create({ data: { orgId: job.data.orgId, action: "EMAIL_REPLY", meta: { draftId: job.data.draftId, stub: true } } });
}