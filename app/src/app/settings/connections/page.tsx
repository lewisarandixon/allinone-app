import Link from "next/link";

export default async function ConnectionsPage() {
	return (
		<main className="mx-auto max-w-3xl p-8 space-y-6">
			<h1 className="text-2xl font-semibold">Connections</h1>
			<div className="rounded border border-slate-800 bg-slate-900/50 p-6">
				<h2 className="text-lg font-medium">Email</h2>
				<p className="text-slate-300">Connect Gmail or Microsoft 365 to ingest client emails.</p>
				<div className="mt-3 flex gap-3">
					<Link className="rounded bg-blue-600 px-4 py-2" href="/api/auth/signin">Connect Google</Link>
					<Link className="rounded bg-blue-600 px-4 py-2" href="/api/auth/signin">Connect Microsoft</Link>
				</div>
			</div>
			<div className="rounded border border-slate-800 bg-slate-900/50 p-6">
				<h2 className="text-lg font-medium">Accounting</h2>
				<p className="text-slate-300">Connect Xero or QuickBooks to post bills.</p>
				<div className="mt-3 flex gap-3">
					<button className="rounded bg-slate-800 px-4 py-2" disabled>Connect Xero (setup in docs)</button>
					<button className="rounded bg-slate-800 px-4 py-2" disabled>Connect QuickBooks (setup in docs)</button>
				</div>
			</div>
		</main>
	);
}