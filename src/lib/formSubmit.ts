/**
 * Nest Library — frontend form-submission abstraction (foundation).
 *
 * Forms call `submitForm(kind, data)` instead of talking to a backend.
 * Today it validates locally and resolves a "not connected" result so flows
 * can be built and tested end-to-end in the UI. When FastAPI exists, route
 * each `kind` to `apiClient` here — form components stay untouched.
 */

import { apiClient } from "./api.ts";
import { trackEvent } from "./analytics.ts";
import type {
  MembershipInquiryPayload,
  SeatInquiryPayload,
  VisitBookingPayload,
} from "../types/api.ts";

export type FormKind = "seat-inquiry" | "book-visit" | "membership-inquiry";

export type FormSubmissionStatus = "idle" | "submitting" | "queued" | "error";

export interface FormSubmissionResult {
  status: Extract<FormSubmissionStatus, "queued" | "error">;
  /** Present once the backend returns a real reference. Null until then. */
  referenceId: string | null;
  message: string;
}

/**
 * Frontend submission entry point. Validated data in → typed result out.
 * Tracks analytics for funnel visibility from day one.
 */
export async function submitForm(
  kind: FormKind,
  data: SeatInquiryPayload | VisitBookingPayload | MembershipInquiryPayload,
): Promise<FormSubmissionResult> {
  if (!apiClient.isConfigured()) {
    trackEvent(
      kind === "seat-inquiry"
        ? "seat_inquiry_submit"
        : kind === "book-visit"
          ? "visit_submit"
          : "membership_inquiry",
      { backend: "not-connected" },
    );
    return {
      status: "queued",
      referenceId: null,
      message:
        "Your details are ready — online submission connects soon. Please reach us via phone or WhatsApp for now.",
    };
  }

  const result =
    kind === "seat-inquiry"
      ? await apiClient.submitSeatInquiry(data as SeatInquiryPayload)
      : kind === "book-visit"
        ? await apiClient.submitVisitBooking(data as VisitBookingPayload)
        : await apiClient.submitMembershipInquiry(
            data as MembershipInquiryPayload,
          );

  if (result.ok) {
    return {
      status: "queued",
      referenceId: result.data.referenceId,
      message: "Submitted successfully.",
    };
  }

  return {
    status: "error",
    referenceId: null,
    message: "Submission failed. Please try again or contact us directly.",
  };
}
