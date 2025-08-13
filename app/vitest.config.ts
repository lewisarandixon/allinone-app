import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	test: {
		environment: "node",
		include: ["src/tests/**/*.test.ts"],
		exclude: ["src/tests/e2e/**"],
		setupFiles: [path.resolve(__dirname, "src/tests/setup.ts")],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});