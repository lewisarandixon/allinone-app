import { describe, it, expect } from "vitest";
import { logger } from "@/lib/logger";

describe("logger", () => {
	it("logs without throwing", () => {
		expect(() => logger.info("test", { a: 1 }, { jobName: "x" })).not.toThrow();
	});
});