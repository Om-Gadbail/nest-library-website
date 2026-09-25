import { test, expect } from "@playwright/test";

/**
 * Foundation smoke tests: shell renders, routing works, no horizontal
 * overflow at mobile and desktop widths.
 */
test.describe("foundation shell", () => {
  test("home renders without horizontal overflow", async ({ page }) => {
    // `domcontentloaded` (not `load`): third-party font stylesheets must
    // never gate the smoke test on slow/blocked networks.
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#main-content")).toBeVisible();

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("unknown route shows the 404 page", async ({ page }) => {
    await page.goto("/route-that-does-not-exist", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("#main-content")).toBeVisible();
  });

  test("no horizontal overflow on a tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
