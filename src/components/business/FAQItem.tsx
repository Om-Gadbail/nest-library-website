import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn.ts";
import type { Faq } from "../../types/content.ts";

/**
 * FAQ disclosure item. Uses a native <button> + region wiring so keyboard
 * and screen-reader behaviour is correct. Motion height animation is added
 * during the UI build; this foundation keeps state + semantics ready.
 */
export function FAQItem({ faq }: { faq: Faq }): ReactNode {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="rounded-md border border-border bg-card">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen((value) => !value);
        }}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
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
      {open && (
        <div id={panelId} role="region" className="px-5 pb-5 text-muted">
          {faq.answer}
        </div>
      )}
    </div>
  );
}
