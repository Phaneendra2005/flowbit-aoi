import { test, expect } from "@playwright/test";
test("map container and base layers load", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".leaflet-container")).toHaveCount(1);
  await page.waitForSelector(".leaflet-tile", { timeout: 10000 });
  const tileCount = await page.locator(".leaflet-tile").count();
  expect(tileCount).toBeGreaterThan(0);
});
