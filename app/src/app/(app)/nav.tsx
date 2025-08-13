"use client";
import Link from "next/link";

export default function Nav() {
	return (
		<nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
			<div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
				<Link href="/" className="font-semibold">daybook.ai</Link>
				<div className="flex items-center gap-4 text-sm">
					<Link href="/dashboard">Dashboard</Link>
					<Link href="/upload">Upload</Link>
					<Link href="/settings/connections">Connections</Link>
					<Link href="/billing">Billing</Link>
				</div>
			</div>
		</nav>
	);
}