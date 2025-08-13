import { describe, it, expect } from "vitest";
import { AppError, fromProvider } from "@/lib/errors";

describe("AppError", () => {
	it("wraps provider error", () => {
		const err = fromProvider("stripe", new Error("bad"));
		expect(err).toBeInstanceOf(AppError);
		expect(err.code).toBe("PROVIDER_ERROR");
	});
});