/**
 * Nest Library — central business configuration.
 *
 * Timings, rules summary and capacity below are DEMO placeholders describing
 * the shape of future content. Do not present them as real operating facts.
 */

export interface OpeningHours {
  days: string;
  hours: string;
  note: string;
  isPlaceholder: boolean;
}

export const businessConfig = {
  openingHours: {
    days: "Monday – Sunday",
    hours: "Timing to be confirmed",
    note: "Demo placeholder — real opening hours will be published here.",
    isPlaceholder: true,
  } as OpeningHours,

  /** Structural placeholder for a future rules summary (not real rules). */
  rulesSummary: {
    heading: "Study-first environment",
    points: [
      "Placeholder: silence expectations (to be confirmed)",
      "Placeholder: guest and visitor policy (to be confirmed)",
      "Placeholder: seat usage expectations (to be confirmed)",
    ],
    isPlaceholder: true,
  },

  establishedNote: "Demo placeholder — verified business facts will go here.",
} as const;
