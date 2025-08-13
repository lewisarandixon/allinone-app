import type { Job } from "bullmq";
import { logger } from "@/lib/logger";
import { prisma } from "@/server/db";
import { parseInvoiceBuffer } from "@/lib/services/parseInvoice";
import { mapVatAndAccount } from "@/lib/services/vatMapping";
import { getObjectUrl } from "@/lib/storage/s3";

export default async function processor(job: Job<{ documentId: string; orgId: string }>) {
	const { documentId, orgId } = job.data;
	logger.info("parseInvoice start", { documentId }, { jobName: job.name, orgId });
	const doc = await prisma.document.findFirst({ where: { id: documentId, orgId } });
	if (!doc) return;
	const url = await getObjectUrl(doc.storageKey);
	// In a real system, we would download the buffer from S3; here we assume buffer is available via URL fetch
	const res = await fetch(url);
	const buf = Buffer.from(await res.arrayBuffer());
	const parsed = await parseInvoiceBuffer(buf);
	const mapping = await mapVatAndAccount(orgId, parsed);
	await prisma.document.update({ where: { id: documentId }, data: { status: "parsed", parsedJson: { ...parsed, mapping } } });
	logger.info("parseInvoice done", { documentId }, { jobName: job.name, orgId });
}