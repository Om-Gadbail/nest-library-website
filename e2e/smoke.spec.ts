import { test, expect } from "@playwright/test";

/**
 * Production smoke tests: homepage journey renders, key conversion routes
 * resolve, popups/forms behave, and no horizontal overflow at any width.
 */
test.describe("nest library production smoke", () => {
  test("home renders the conversion journey without overflow", async ({
    page,
  }) => {
    // `domcontentloaded` (not `load`): third-party font stylesheets must
    // never gate the smoke test on slow/blocked networks.
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /better space/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /view admission plans/i }).first(),
    ).toBeVisible();

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("no horizontal overflow on a small mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("no horizontal overflow on a tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("key conversion routes resolve", async ({ page }) => {
    for (const path of [
      "/membership",
      "/seats/confirmed",
      "/opening-offer",
      "/faq",
      "/book-a-visit",
      "/join-nest",
    ]) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      // Cold dev-server transforms can delay React mount past the default
      // 5 s assertion budget — wait explicitly for the app shell.
      await expect(page.locator("#main-content")).toBeVisible({
        timeout: 15_000,
      });
    }
  });

  test("unknown route shows the 404 page", async ({ page }) => {
    await page.goto("/route-that-does-not-exist", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /page not found/i }),
    ).toBeVisible();
  });

  test("offer popup opens after ~10s and closes cleanly", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const dialog = page.getByRole("dialog", {
      name: /special introductory prices/i,
    });
    // Not immediately visible.
    await expect(dialog).toHaveCount(0);
    // Appears after the 10s delay.
    await expect(dialog).toBeVisible({ timeout: 20_000 });
    // Escape closes it.
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
});
