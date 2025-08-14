import type { Metadata } from "next";
import "./globals.css";
import Nav from "./(app)/nav";

export const metadata: Metadata = {
	title: "daybook.ai | AI bookkeeping for accountancy firms",
	description: "daybook.ai helps accountancy firms triage client emails, capture invoices, and post bills to Xero & QuickBooks. Automate bookkeeping with AI.",
	metadataBase: new URL("https://daybook.ai"),
	keywords: [
		"accountancy automation",
		"AI bookkeeping",
		"invoice processing",
		"Xero integration",
		"QuickBooks bills",
		"email triage",
		"PDF invoice parsing",
		"VAT mapping",
		"daybook.ai",
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
				<Nav />
				{children}
			</body>
		</html>
	);
}
