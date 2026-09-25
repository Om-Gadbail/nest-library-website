/**
 * Nest Library — 10-second opening-offer popup (REQUIRED feature).
 *
 * Behavior: opens ~10s after first page load, once per session
 * (sessionStorage). Accessible dialog: Escape closes, backdrop closes,
 * focus moves to the dialog, reduced-motion respected, analytics tracked.
 * Mobile renders as a bottom sheet; desktop as a centered modal.
 * Content is config-driven (data/offers.ts). Hidden when offer inactive.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, Crown, X } from "lucide-react";
import { openingOffer } from "../../data/offers.ts";
import { routePaths } from "../../config/navigation.ts";
import { buildWhatsAppUrl } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.ts";
import { motionDuration, motionEasing } from "../../lib/motion.ts";

const SEEN_KEY = "nest-offer-popup-seen-v1";
const DELAY_MS = 10_000;

export function OfferPopup(): ReactNode {
  const [open, setOpen] = useState(false);
  const reduce = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!openingOffer.active) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // session awareness is best-effort; show once per load instead.
    }
    if (seen) return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      trackEvent("popup_open", { surface: "opening-offer" });
      trackEvent("offer_view", { surface: "popup" });
    }, DELAY_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const close = useCallback(
    (reason: "dismiss" | "cta" | "escape" | "backdrop") => {
      setOpen(false);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // session awareness is best-effort.
      }
      if (
        reason === "dismiss" ||
        reason === "escape" ||
        reason === "backdrop"
      ) {
        trackEvent("popup_close", { reason });
        trackEvent("offer_dismiss", { surface: "popup" });
      }
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close("escape");
      // Minimal focus trap: keep Tab cycling inside the dialog.
      if (event.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const whatsappHref = buildWhatsAppUrl("opening-offer");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-navy-deep/70 p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduce ? 0.01 : motionDuration.fast,
            ease: motionEasing.standard,
          }}
          onClick={() => {
            close("backdrop");
          }}
          aria-hidden="false"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-popup-title"
            aria-describedby="offer-popup-description"
            className="w-full max-w-md overflow-hidden bg-card text-card-foreground shadow-raised rounded-t-2xl sm:rounded-2xl"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{
              duration: reduce ? 0.01 : motionDuration.normal,
              ease: motionEasing.standard,
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="nest-dark px-6 pt-6 pb-5">
              <div className="flex items-start justify-between gap-4">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-label font-bold tracking-[0.14em] uppercase">
                  {openingOffer.eyebrow}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => {
                    close("dismiss");
                  }}
                  aria-label="Close offer popup"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
              <h2
                id="offer-popup-title"
                className="mt-3 text-h3 font-extrabold text-white"
              >
                {openingOffer.title}
              </h2>
              <p
                id="offer-popup-description"
                className="mt-1 text-small text-white/70"
              >
                {openingOffer.validityNote}
              </p>
            </div>

            <div className="space-y-3 px-6 py-5">
              <p className="flex items-start gap-2.5 text-small font-medium">
                <BadgeCheck
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-leaf"
                />
                {openingOffer.freeRegistrationNote}
              </p>
              <p className="flex items-start gap-2.5 text-small font-medium">
                <Crown
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                />
                {openingOffer.prioritySeatSelectionNote}
              </p>

              <div className="grid gap-2 pt-2">
                <Link
                  to={routePaths.membership}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
                  onClick={() => {
                    trackEvent("popup_cta_click", {
                      label: "View Admission Plans",
                    });
                    trackEvent("offer_click", { surface: "popup" });
                    close("cta");
                  }}
                >
                  {openingOffer.primaryCtaLabel}
                </Link>
                <a
                  href={whatsappHref}
                  {...safeLinkProps(whatsappHref)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-border bg-card px-5 py-3 font-semibold hover:bg-muted-background"
                  onClick={() => {
                    trackEvent("whatsapp_click", {
                      intent: "opening-offer",
                      surface: "popup",
                    });
                    trackEvent("popup_cta_click", { label: "WhatsApp Us" });
                    close("cta");
                  }}
                >
                  {openingOffer.secondaryCtaLabel}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    close("dismiss");
                  }}
                  className="mx-auto px-4 py-2 text-small font-medium text-muted hover:underline hover:underline-offset-4"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
