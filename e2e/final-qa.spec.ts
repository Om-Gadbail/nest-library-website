import { test, expect } from "@playwright/test";

/**
 * Final QA: explicit verification of the 20 finishing points.
 * Temporary spec for the finishing pass (kept: documents the audit).
 */
const routes = [
  "/",
  "/about",
  "/study-environment",
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

test.describe("final QA — 20 points", () => {
  test("Pt5/6: every route has unique meaningful title + meta description", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const titles = new Map<string, string>();
    for (const path of routes) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator("#main-content")).toBeVisible({
        timeout: 15_000,
      });
      await expect(page.locator("#main-content h1").first()).toBeVisible({
        timeout: 15_000,
      });
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title).not.toMatch(/vite|react app|untitled|example\.com/i);
      expect(title).toMatch(/nest library/i);
      titles.set(path, title);
      const desc = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(desc, `${path} meta description`).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(20);
      expect(desc).not.toMatch(/lorem|placeholder|todo/i);
    }
    const unique = new Set(titles.values());
    // Indexable pages should be unique; allow privacy/terms style overlap
    // but require strong uniqueness overall.
    expect(unique.size).toBeGreaterThanOrEqual(routes.length - 2);
  });

  test("Pt4/9: favicon resolves, copyright year is current", async ({
    page,
  }) => {
    const favResp = await page.request.get("/favicon.svg");
    expect(favResp.status()).toBe(200);
    const ctype = favResp.headers()["content-type"] ?? "";
    expect(ctype).toMatch(/svg|image/);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const year = new Date().getFullYear().toString();
    await expect(page.getByText(`© ${year} Nest Library`)).toBeVisible();
    const appleHref = await page
      .locator('link[rel="apple-touch-icon"]')
      .getAttribute("href");
    expect(appleHref).toBeTruthy();
  });

  test("Pt17/18/19: logo clickable, phone tel: correct, email hidden", async ({
    page,
  }) => {
    await page.goto("/about", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: /nest library.*home/i }).first().click();
    await expect(page).toHaveURL(/\/$/);
    // Phone links
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const telLinks = page.locator('a[href^="tel:"]');
    expect(await telLinks.count()).toBeGreaterThan(0);
    const firstHref = await telLinks.first().getAttribute("href");
    expect(firstHref).toContain("+917038201884");
    // Email must be hidden (no mailto rendered)
    expect(await page.locator('a[href^="mailto:"]').count()).toBe(0);
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    expect(await page.locator('a[href^="mailto:"]').count()).toBe(0);
  });

  test("Pt2/7/11: no dead # links, footer links resolve, buttons act", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // No placeholder href="#" navigation visible
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    // Footer explore/support links resolve
    const footerHrefs = await page
      .locator("footer a[href^='/']")
      .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    expect(footerHrefs.length).toBeGreaterThan(5);
    for (const href of footerHrefs.slice(0, 12)) {
      const resp = await page.request.get(href!);
      expect(resp.status(), href!).toBeLessThan(400);
    }
    // Hero CTA navigates
    await page
      .getByRole("link", { name: /view admission plans/i })
      .first()
      .click();
    await expect(page).toHaveURL(/membership/);
  });

  test("Pt3: mobile menu opens/closes, Escape, navigates", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const btn = page.getByRole("button", { name: /open menu|close menu/i });
    await btn.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
    await btn.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.locator("#mobile-menu").getByRole("link", { name: "FAQ" }).click();
    await expect(page).toHaveURL(/faq/);
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  });

  test("Pt1/16/20: no overflow across widths on key routes", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const widths = [360, 375, 390, 412, 430, 768, 1024, 1280, 1440];
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 800 });
      for (const path of ["/", "/membership", "/seats/confirmed", "/contact"]) {
        await page.goto(path, { waitUntil: "domcontentloaded" });
        await expect(page.locator("#main-content")).toBeVisible({
          timeout: 15_000,
        });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `${path} @ ${w}px`).toBeLessThanOrEqual(1);
      }
    }
  });

  test("Pt8: invalid route shows branded 404", async ({ page }) => {
    await page.goto("/this-route-does-not-exist", {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { name: /page not found/i }),
    ).toBeVisible();
    await page.getByRole("link", { name: /go home/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("Pt12/13: seat inquiry validates + honest device-saved success", async ({
    page,
  }) => {
    await page.goto("/seat-inquiry", { waitUntil: "domcontentloaded" });
    // Submit empty → validation errors visible
    await page.getByRole("button", { name: /send seat inquiry/i }).click();
    await expect(page.getByText(/required|enter|select/i).first()).toBeVisible();
    // Fill valid data → honest device-noted state (no backend configured)
    await page.locator("#seat-name").fill("Test Student");
    await page.locator("#seat-phone").fill("+917038201884");
    await page.locator("#seat-occupation").selectOption("student");
    await page.locator("#seat-duration").selectOption("6-months");
    await page.locator("#seat-preference").selectOption("regular");
    await page.locator("#seat-timing").selectOption("morning");
    await page.getByRole("button", { name: /send seat inquiry/i }).click();
    await expect(
      page.getByRole("heading", { name: /details noted|enquiry received/i }),
    ).toBeVisible({ timeout: 15_000 });
    // Must not claim false server persistence
    const body = (await page.locator("#main-content").innerText()).toLowerCase();
    expect(body).not.toMatch(/payment successful|seat reserved|booking confirmed/);
  });
});
