/**
 * Nest Library — accessible FAQ accordion item with analytics.
 */

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/cn.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.ts";
import type { Faq } from "../../types/content.ts";

export function FAQItem({
  faq,
  defaultOpen = false,
}: {
  faq: Faq;
  defaultOpen?: boolean;
}): ReactNode {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const reduce = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "rounded-lg border bg-card transition-colors",
        open ? "border-navy/30 shadow-card" : "border-border",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) trackEvent("faq_open", { id: faq.id });
        }}
        className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
      >
        <span>{faq.question}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-5 w-5 shrink-0 text-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.22 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 leading-relaxed text-muted">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
