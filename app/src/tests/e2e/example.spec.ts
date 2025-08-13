import { test, expect } from "@playwright/test";

test.skip("homepage loads", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByText(/Emails triaged/i)).toBeVisible();
});