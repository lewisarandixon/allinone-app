import Image from "next/image";
import styles from "./page.module.css";

export default function HomePage() {
	return (
		<main className="mx-auto max-w-6xl px-6 py-16">
			<section className="text-center space-y-6">
				<h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
					Emails triaged. Invoices captured. Time regained.
				</h1>
				<p className="text-slate-300 text-lg max-w-2xl mx-auto">
					daybook.ai prioritises client email, extracts and classifies invoices, and posts bills to Xero or QuickBooks with correct VAT and account codes.
				</p>
				<div className="flex items-center justify-center gap-3">
					<a href="/api/auth/signin" className="rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-500">Sign in with Google or Microsoft</a>
					<a href="/dashboard" className="rounded-md border border-slate-700 px-5 py-3 hover:bg-slate-900">View dashboard</a>
				</div>
			</section>
			<section className="mt-16 grid gap-6 md:grid-cols-3">
				<div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
					<h3 className="text-xl font-medium">Smart inbox for accountants</h3>
					<p className="mt-2 text-slate-300">Gmail and Microsoft 365 ingestion with AI intent classification and auto-reply drafts.</p>
				</div>
				<div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
					<h3 className="text-xl font-medium">Invoice capture</h3>
					<p className="mt-2 text-slate-300">PDF/IMG uploads and email attachments parsed via PDF.co and mapped with OpenAI.</p>
				</div>
				<div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
					<h3 className="text-xl font-medium">Post to Xero & QuickBooks</h3>
					<p className="mt-2 text-slate-300">Correct VAT and account codes, audit trail, retries, and idempotency.</p>
				</div>
			</section>
		</main>
	);
}
