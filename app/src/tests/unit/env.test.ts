import { describe, it, expect } from "vitest";
import { getEnv } from "@/config/env";

describe("env", () => {
	it("loads defaults without throwing for optional vars", () => {
		process.env.DATABASE_URL = "postgres://user:pass@localhost:5432/db";
		expect(() => getEnv()).not.toThrow();
	});
});