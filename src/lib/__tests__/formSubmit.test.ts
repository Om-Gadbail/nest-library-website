import { afterEach, describe, expect, it, vi } from "vitest";

describe("form submission honesty (no backend connected)", () => {
  // Hermetic precondition: these cases assert the unconfigured path, so
  // they clear VITE_API_BASE_URL explicitly instead of relying on the
  // ambient developer .env (which now points at the local backend).
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("apiClient reports unconfigured without a base URL", async () => {
    vi.resetModules();
    vi.stubEnv("VITE_API_BASE_URL", "");
    const { apiClient } = await import("../api.ts");
    expect(apiClient.isConfigured()).toBe(false);
  });

  it("never claims a server submission when no backend exists", async () => {
    vi.resetModules();
    vi.stubEnv("VITE_API_BASE_URL", "");
    const { submitForm } = await import("../formSubmit.ts");
    const result = await submitForm("book-visit", {
      name: "Test Student",
      phone: "+917038201884",
      preferredDate: "2026-10-01",
      preferredTime: "10:00",
    });
    expect(result.status).toBe("device-saved");
    expect(result.referenceId).not.toBeNull();
  });
});
