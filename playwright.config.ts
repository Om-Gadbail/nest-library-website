import { defineConfig, devices } from "@playwright/test";

/**
 * Nest Library — end-to-end smoke tests (foundation).
 * Starts the Vite dev server automatically. Run with `npm run test:e2e`.
 * Browsers are installed separately via `npx playwright install --with-deps`.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
    // Escape hatch for machines whose browser cache was populated by a
    // different Playwright version:
    // PLAYWRIGHT_CHROMIUM_PATH="C:\...\chrome.exe" npm run test:e2e
    ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? {
          launchOptions: {
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH,
          },
        }
      : {}),
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 5173",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
