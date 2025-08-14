export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { requireOrg } from "@/server/tenancy";
import { uploadObject } from "@/lib/storage/s3";
import { getQueues } from "@/jobs/queues";

export async function POST(req: NextRequest) {
	const orgId = await requireOrg();
	const form = await req.formData();
	const file = form.get("file") as File | null;
	if (!file) return NextResponse.json({ error: "file missing" }, { status: 400 });
	const arrayBuf = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuf);
	const document = await prisma.document.create({
		data: {
			orgId,
			source: "upload",
			filename: file.name,
			mimeType: file.type,
			storageKey: `${orgId}/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}` +
				`/${Date.now()}-${file.name}`,
			status: "received",
		},
	});
	await uploadObject(document.storageKey, buffer, file.type);
	const { parseInvoice } = getQueues();
	await parseInvoice.add("parse", { documentId: document.id, orgId });
	return NextResponse.json({ ok: true, id: document.id });
}