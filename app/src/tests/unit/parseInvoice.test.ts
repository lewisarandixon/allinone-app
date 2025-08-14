import { describe, it, expect } from "vitest";
import { parseInvoiceBuffer } from "@/lib/services/parseInvoice";

describe("parseInvoiceBuffer", () => {
	it("throws without api key", async () => {
		process.env.PDFCO_API_KEY = "";
		await expect(parseInvoiceBuffer(Buffer.from("%PDF"))).rejects.toBeTruthy();
	});
});