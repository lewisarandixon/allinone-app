import { env } from "@/config/env";

export default function BillingPage() {
	return (
		<main className="mx-auto max-w-3xl p-8 space-y-6">
			<h1 className="text-2xl font-semibold">Billing</h1>
			<p className="text-slate-300">Upgrade to Pro to enable multiple mailboxes, higher monthly invoice parsing, and priority support.</p>
			<div className="flex gap-3">
				<a className="rounded bg-blue-600 px-4 py-2" href="/api/billing/checkout">Upgrade to Pro</a>
				<a className="rounded border border-slate-700 px-4 py-2" href="/api/billing/portal">Open Customer Portal</a>
			</div>
			<p className="text-xs text-slate-500">Stripe configured: {env.STRIPE_SECRET_KEY ? "yes" : "no"}</p>
		</main>
	);
}