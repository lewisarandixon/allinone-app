import OpenAI from "openai";
import { env } from "@/config/env";
import { prisma } from "@/server/db";

export type MappingResult = { accountCode: string; taxCode: string; confidence: number; rationale: string };

export interface ParsedInvoiceMinimal {
	supplier?: string;
	total?: number;
	[key: string]: unknown;
}

export async function mapVatAndAccount(orgId: string, parsed: ParsedInvoiceMinimal): Promise<MappingResult> {
	// Supplier override first
	const supplierName = (parsed.supplier || "").toString().toLowerCase();
	const override = await prisma.supplierOverride.findFirst({ where: { orgId, supplier: supplierName } });
	if (override) {
		return { accountCode: override.accountCode, taxCode: override.taxCode, confidence: 1, rationale: "Supplier override" };
	}
	if (!env.OPENAI_API_KEY) {
		return { accountCode: "310", taxCode: "20% S", confidence: 0.3, rationale: "Default fallback (no OpenAI key)" };
	}
	const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
	const prompt = `Given this invoice JSON: ${JSON.stringify(parsed)}\nMap to UK chart of accounts with VAT. Return JSON with accountCode, taxCode, confidence (0-1), rationale.`;
	const resp = await client.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{ role: "system", content: "You are a bookkeeping assistant that maps invoices to accounting codes for UK VAT." },
			{ role: "user", content: prompt },
		],
		temperature: 0.1,
	});
	const content = resp.choices[0]?.message?.content || "{}";
	try {
		const data = JSON.parse(content as string) as Partial<MappingResult>;
		return { accountCode: data.accountCode ?? "310", taxCode: data.taxCode ?? "20% S", confidence: data.confidence ?? 0.5, rationale: data.rationale ?? "" };
	} catch {
		return { accountCode: "310", taxCode: "20% S", confidence: 0.4, rationale: "Could not parse model output" };
	}
}