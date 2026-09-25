import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, whatsappTemplate } from "../whatsapp.ts";
import { contactConfig } from "../../config/contact.ts";

describe("WhatsApp integration", () => {
  it("centralizes the verified Nest number (no hardcoded digits in components)", () => {
    expect(contactConfig.whatsappNumber).toBe("917038201884");
  });

  it("builds encoded wa.me links with contextual templates", () => {
    const url = buildWhatsAppUrl("confirmed-seat");
    expect(url.startsWith("https://wa.me/917038201884?text=")).toBe(true);
    expect(url).toContain(encodeURIComponent("Confirmed Seat"));
    expect(whatsappTemplate("opening-offer")).toMatch(/opening offer/i);
  });

  it("appends calculator detail to the pre-filled message", () => {
    const url = buildWhatsAppUrl(
      "membership",
      "Regular Seat · 6 Months · ₹3,999",
    );
    expect(url).toContain(encodeURIComponent("Regular Seat"));
  });

  it("covers every conversion intent", () => {
    for (const intent of [
      "general",
      "regular-seat",
      "confirmed-seat",
      "membership",
      "book-visit",
      "opening-offer",
      "seat-availability",
      "join",
    ] as const) {
      expect(buildWhatsAppUrl(intent)).toContain("https://wa.me/");
    }
  });
});
