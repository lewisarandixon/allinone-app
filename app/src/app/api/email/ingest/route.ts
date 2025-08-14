import { NextResponse } from "next/server";
import { requireOrg } from "@/server/tenancy";
import { getQueues } from "@/jobs/queues";

export async function POST() {
	const orgId = await requireOrg();
	const { emailPoll } = getQueues();
	await emailPoll.add("poll", { orgId });
	return NextResponse.json({ ok: true });
}