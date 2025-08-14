import { describe, it, expect } from "vitest";
import { PdfcoInvoice } from "@/schemas/pdfco";

describe("Pdfco schema", () => {
	it("accepts minimal invoice", () => {
		const parsed = PdfcoInvoice.parse({ supplier: "Amazon", date: "2025-06-29", total: 25.79, lineItems: [] });
		expect(parsed.supplier).toBe("Amazon");
	});
});