import { z } from "zod";

export const PdfcoLineItem = z.object({
	description: z.string().optional(),
	quantity: z.number().optional(),
	unitPrice: z.number().optional(),
	amount: z.number(),
});

export const PdfcoInvoice = z.object({
	supplier: z.string(),
	invoiceNo: z.string().nullable().optional(),
	date: z.string(),
	currency: z.string().default("GBP"),
	subtotal: z.number().optional(),
	tax: z.number().optional(),
	total: z.number(),
	lineItems: z.array(PdfcoLineItem).default([]),
});

export type PdfcoInvoiceT = z.infer<typeof PdfcoInvoice>;