import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/facilities",
  "/seats",
  "/seats/regular",
  "/seats/confirmed",
  "/membership",
  "/admission",
  "/opening-offer",
  "/gallery",
  "/member-stories",
  "/reviews",
  "/rules",
  "/faq",
  "/location",
  "/contact",
  "/book-a-visit",
  "/seat-inquiry",
  "/membership-inquiry",
  "/join-nest",
  "/privacy",
  "/terms",
];

test.describe("route sweep: console, errors, overflow, h1", () => {
  for (const path of routes) {
    test(`sweep ${path}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() !== "error") return;
        const text = msg.text();
        // Third-party font fetches can flake on emulated networks; the
        // site falls back to system fonts, so ignore those resource errors.
        if (
          text.includes("ERR_") &&
          (text.includes("fonts.googleapis") ||
            text.includes("fonts.gstatic") ||
            msg.location().url?.includes("fonts.g"))
        ) {
          return;
        }
        consoleErrors.push(text);
      });
      page.on("pageerror", (err) => pageErrors.push(String(err)));
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator("#main-content")).toBeVisible({
        timeout: 15_000,
      });
      await expect(page.locator("#main-content h1").first()).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${path} horizontal overflow`).toBeLessThanOrEqual(1);
      expect(pageErrors, `${path} page errors`).toEqual([]);
      expect(consoleErrors, `${path} console errors`).toEqual([]);
    });
  }
});
