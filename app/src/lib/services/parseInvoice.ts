import axios from "axios";
import { env } from "@/config/env";
import { PdfcoInvoice } from "@/schemas/pdfco";
import { AppError } from "@/lib/errors";

export async function parseInvoiceBuffer(file: Buffer) {
	if (!env.PDFCO_API_KEY) {
		throw new AppError("PROVIDER_ERROR", "PDF.co API key missing");
	}
	const res = await axios.post("https://api.pdf.co/v1/pdf/classifier", file, {
		headers: {
			"x-api-key": env.PDFCO_API_KEY,
			"Content-Type": "application/pdf",
		},
		maxContentLength: 20_000_000,
	});
	const json = res.data?.body ?? res.data;
	const result = PdfcoInvoice.safeParse(json);
	if (!result.success) {
		throw new AppError("VALIDATION_ERROR", "Invalid PDF.co response", result.error);
	}
	return result.data;
}