/**
 * Nest Library — form success panel (honest states).
 * Distinguishes real server submission from device-noted + WhatsApp handoff.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Info, MessageCircle } from "lucide-react";
import { routePaths } from "../../config/navigation.ts";
import { buildWhatsAppUrl, type WhatsAppIntent } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import type { FormSubmissionResult } from "../../lib/formSubmit.ts";

interface FormSuccessProps {
  result: FormSubmissionResult;
  intent: WhatsAppIntent;
  whatsappLabel?: string;
}

export function FormSuccess({
  result,
  intent,
  whatsappLabel = "WhatsApp Nest",
}: FormSuccessProps): ReactNode {
  const submitted = result.status === "submitted";
  const whatsappHref = buildWhatsAppUrl(intent);
  const title = submitted
    ? "Enquiry Received"
    : "Details Noted — Confirm on WhatsApp";
  const body = submitted
    ? "Thank you for contacting Nest. Our team will contact you shortly."
    : result.message;

  return (
    <div
      className="rounded-xl border border-border bg-card p-8 text-center shadow-card"
      role="status"
    >
      {submitted ? (
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto h-12 w-12 text-leaf"
        />
      ) : (
        <Info aria-hidden="true" className="mx-auto h-12 w-12 text-primary" />
      )}
      <h2 className="mt-4 text-h3 font-extrabold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md leading-relaxed text-muted">{body}</p>
      {result.referenceId && (
        <p className="mt-2 text-small text-muted">
          Reference:{" "}
          <code className="font-mono">{result.referenceId.slice(0, 8)}</code>
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href={whatsappHref}
          {...safeLinkProps(whatsappHref)}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
          onClick={() => {
            trackEvent("whatsapp_click", { intent, surface: "form-success" });
          }}
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          {whatsappLabel}
        </a>
        <Link
          to={routePaths.location}
          className="inline-flex min-h-[48px] items-center rounded-md border border-border px-6 py-3 font-semibold hover:bg-muted-background"
        >
          Get Directions
        </Link>
        <Link
          to={routePaths.home}
          className="inline-flex min-h-[48px] items-center rounded-md px-4 py-3 font-semibold text-muted hover:underline hover:underline-offset-4"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
