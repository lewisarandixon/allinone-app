import { describe, it, expect, vi } from "vitest";
import { mapVatAndAccount } from "@/lib/services/vatMapping";

vi.mock("@/server/db", () => ({ prisma: { supplierOverride: { findFirst: vi.fn().mockResolvedValue(null) } } }));

describe("vatMapping", () => {
	it("returns fallback when no OpenAI key", async () => {
		process.env.OPENAI_API_KEY = "";
		const res = await mapVatAndAccount("org1", { supplier: "Test", total: 10 });
		expect(res.accountCode).toBeDefined();
	});
});