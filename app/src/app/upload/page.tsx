"use client";

import { useState } from "react";

export default function UploadPage() {
	const [status, setStatus] = useState<string>("");

	async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		setStatus("Uploading...");
		const form = new FormData();
		form.append("file", file);
		const res = await fetch("/api/upload", { method: "POST", body: form });
		const json = await res.json();
		if (res.ok) setStatus(`Uploaded: ${json.id}`);
		else setStatus(`Error: ${json.error}`);
	}

	return (
		<main className="mx-auto max-w-2xl p-8 space-y-6">
			<h1 className="text-2xl font-semibold">Upload invoice</h1>
			<input type="file" onChange={onChange} className="block w-full border border-slate-700 rounded p-3 bg-slate-900" />
			<p className="text-slate-300">{status}</p>
			<div className="text-sm text-slate-400">
				<p>Coming soon: bank statement conversion to CSV for fast reconciliations.</p>
			</div>
		</main>
	);
}