import { describe, expect, it } from "vitest";
import { sanitizeProperties } from "../analytics.ts";
import { captureAttribution, isHoneypotCaught, readOutbox } from "../leads.ts";
import { contactSchema, seatInquirySchema } from "../formSchemas.ts";
import { submitForm } from "../formSubmit.ts";

describe("production hardening", () => {
  it("flags honeypot-filled submissions as spam", () => {
    expect(isHoneypotCaught("bot")).toBe(true);
    expect(isHoneypotCaught("")).toBe(false);
    expect(isHoneypotCaught(undefined)).toBe(false);
  });

  it("rejects a non-empty honeypot at the schema boundary", () => {
    const base = {
      name: "Test Student",
      phone: "+917038201884",
      occupation: "student",
      duration: "6-months",
      seatPreference: "regular",
      timing: "morning",
    };
    expect(seatInquirySchema.safeParse({ ...base, company: "" }).success).toBe(
      true,
    );
    expect(
      seatInquirySchema.safeParse({ ...base, company: "spam" }).success,
    ).toBe(false);
  });

  it("silently discards honeypot submissions without persisting", async () => {
    const before = readOutbox().length;
    const result = await submitForm("contact", {
      name: "Bot",
      phone: "+910000000000",
      message: "spam",
      company: "spam",
    });
    expect(result.status).toBe("device-saved");
    expect(result.referenceId).toBeNull();
    expect(readOutbox().length).toBe(before);
  });

  it("captures marketing-only attribution (never message content)", () => {
    const attribution = captureAttribution();
    expect(attribution.landingPath).toBeDefined();
    expect(attribution).not.toHaveProperty("message");
    expect(attribution).not.toHaveProperty("phone");
    expect(["mobile", "tablet", "desktop"]).toContain(
      attribution.deviceCategory,
    );
  });

  it("strips personal data from analytics payloads", () => {
    const clean = sanitizeProperties({
      surface: "hero",
      phone: "+917038201884",
      message: "secret",
      name: "Someone",
      label: "View Admission Plans",
    });
    expect(clean).toEqual({
      surface: "hero",
      label: "View Admission Plans",
    });
  });

  it("truncates over-long analytics values", () => {
    const clean = sanitizeProperties({ label: "x".repeat(500) });
    expect(clean?.label).toHaveLength(120);
  });

  it("rejects invalid phones and over-long messages (failure injection)", () => {
    expect(
      contactSchema.safeParse({
        name: "Test",
        phone: "abc",
        message: "Hello Nest",
      }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({
        name: "Test",
        phone: "+917038201884",
        message: "x".repeat(501),
      }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({
        name: "T",
        phone: "+917038201884",
        message: "Hello Nest",
      }).success,
    ).toBe(false);
  });
});
