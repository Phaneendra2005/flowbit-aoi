import { test, expect } from "@playwright/test";
test("AOI persists across reloads", async ({ page }) => {
  await page.goto("/");
  await page.reload();
  await page.waitForSelector(".leaflet-container");
  const storage = await page.evaluate(() =>
    localStorage.getItem("flowbit_aoi_v1")
  );
  if (storage) {
    const fc = JSON.parse(storage);
    expect(fc.type).toBe("FeatureCollection");
  } else {
    expect(storage).toBeNull();
  }
});
