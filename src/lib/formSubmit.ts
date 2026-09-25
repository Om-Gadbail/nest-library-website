/**
 * Nest Library — frontend form-submission orchestration.
 *
 * Honest states: "submitted" only when a backend confirms. Otherwise
 * "device-saved" — kept in the device outbox with a WhatsApp handoff,
 * and the UI says so plainly. Nothing is ever silently dropped.
 */

import { apiClient } from "./api.ts";
import { trackEvent } from "./analytics.ts";
import {
  captureAttribution,
  isHoneypotCaught,
  markLeadSubmitted,
  sanitizeText,
  saveLeadLocal,
} from "./leads.ts";
import type {
  AttributedPayload,
  MembershipInquiryPayload,
  SeatInquiryPayload,
  VisitBookingPayload,
} from "../types/api.ts";

export type FormKind =
  "seat-inquiry" | "book-visit" | "membership-inquiry" | "contact";

export type FormSubmissionStatus = "submitted" | "device-saved" | "error";

export interface FormSubmissionResult {
  status: FormSubmissionStatus;
  referenceId: string | null;
  message: string;
}

type Payload =
  | SeatInquiryPayload
  | VisitBookingPayload
  | MembershipInquiryPayload
  | Record<string, string>;

function analyticsName(kind: FormKind): Parameters<typeof trackEvent>[0] {
  switch (kind) {
    case "seat-inquiry":
      return "seat_inquiry_submit";
    case "book-visit":
      return "visit_submit";
    case "membership-inquiry":
      return "membership_inquiry_submit";
    case "contact":
      return "contact_submit";
  }
}

function toLeadRecord(kind: FormKind, data: Payload) {
  const d = data as Record<string, string | undefined>;
  const pick = (key: string): string => sanitizeText(d[key], 500);
  return {
    formType: kind,
    name: pick("name").slice(0, 80),
    phone: pick("phone").slice(0, 18),
    seatType: (pick("seatType") || pick("seatPreference")).slice(0, 80),
    plan: pick("plan").slice(0, 80),
    duration: pick("duration").slice(0, 40),
    preferredDate: pick("preferredDate").slice(0, 20),
    preferredTime: pick("preferredTime").slice(0, 20),
    purpose: pick("purpose").slice(0, 160),
    studyGoal: pick("examGoal").slice(0, 120),
    message: pick("message"),
  };
}

export async function submitForm(
  kind: FormKind,
  data: Payload,
): Promise<FormSubmissionResult> {
  // Spam defense: bots that fill the hidden honeypot are silently
  // discarded — nothing is persisted, no analytics, no error shown.
  const raw = data as Record<string, unknown>;
  if (isHoneypotCaught(raw["company"])) {
    return {
      status: "device-saved",
      referenceId: null,
      message:
        "Details noted on this device. Online submission connects soon — please confirm instantly on WhatsApp or by phone so the Nest team has your enquiry.",
    };
  }

  const lead = saveLeadLocal(toLeadRecord(kind, data));
  const attribution = captureAttribution();

  if (!apiClient.isConfigured()) {
    trackEvent(analyticsName(kind), { backend: "not-connected" });
    return {
      status: "device-saved",
      referenceId: lead.id,
      message:
        "Details noted on this device. Online submission connects soon — please confirm instantly on WhatsApp or by phone so the Nest team has your enquiry.",
    };
  }

  const result =
    kind === "seat-inquiry"
      ? await apiClient.submitSeatInquiry({
          ...(data as SeatInquiryPayload),
          attribution,
        })
      : kind === "book-visit"
        ? await apiClient.submitVisitBooking({
            ...(data as VisitBookingPayload),
            attribution,
          })
        : kind === "membership-inquiry"
          ? await apiClient.submitMembershipInquiry({
              ...(data as MembershipInquiryPayload),
              attribution,
            })
          : await apiClient.submitContact({
              ...(data as Record<string, string>),
              attribution,
            } as Record<string, string> & AttributedPayload);

  if (result.ok) {
    markLeadSubmitted(lead.id, result.data.referenceId);
    trackEvent(analyticsName(kind), { backend: "connected" });
    return {
      status: "submitted",
      referenceId: result.data.referenceId,
      message: "Enquiry received. Our team will contact you shortly.",
    };
  }

  trackEvent(analyticsName(kind), { backend: "error" });
  return {
    status: "error",
    referenceId: null,
    message:
      "Submission failed. Your details are kept on this device — please try again or reach Nest via WhatsApp/phone.",
  };
}
