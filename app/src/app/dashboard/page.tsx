import { prisma } from "@/server/db";
import { authOptions } from "@/server/auth/options";
import { getServerSession } from "next-auth";
import DashboardNav from "../(app)/dashboard-nav";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const orgId = (session?.user as any)?.orgId as string | undefined;
	if (!orgId) return <div className="p-8">Please sign in</div>;
	const [totalDocs, failedDocs, postedDocs] = await Promise.all([
		prisma.document.count({ where: { orgId } }),
		prisma.document.count({ where: { orgId, status: "failed" } }),
		prisma.document.count({ where: { orgId, status: "posted" } }),
	]);
	return (
		<main className="mx-auto max-w-6xl p-8 flex gap-6">
			<DashboardNav />
			<div className="flex-1">
				<h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
				<div className="grid md:grid-cols-3 gap-4">
					<div className="rounded border border-slate-800 p-4 bg-slate-900/50"><div className="text-slate-400">Documents</div><div className="text-3xl font-semibold">{totalDocs}</div></div>
					<div className="rounded border border-slate-800 p-4 bg-slate-900/50"><div className="text-slate-400">Posted</div><div className="text-3xl font-semibold">{postedDocs}</div></div>
					<div className="rounded border border-slate-800 p-4 bg-slate-900/50"><div className="text-slate-400">Exceptions</div><div className="text-3xl font-semibold">{failedDocs}</div></div>
				</div>
			</div>
		</main>
	);
}