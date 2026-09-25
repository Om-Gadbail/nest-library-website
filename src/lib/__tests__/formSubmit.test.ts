import { describe, expect, it } from "vitest";
import { submitForm } from "../formSubmit.ts";
import { apiClient } from "../api.ts";

describe("form submission honesty (no backend connected)", () => {
  it("apiClient reports unconfigured without a base URL", () => {
    expect(apiClient.isConfigured()).toBe(false);
  });

  it("never claims a server submission when no backend exists", async () => {
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
