/**
 * Nest Library — central business configuration.
 *
 * OWNER-EDITABLE. Only confirmed facts are marked live.
 * Anything unverified stays `isPlaceholder: true` and the UI
 * degrades to an honest neutral state instead of inventing claims.
 */

export interface OpeningHours {
  days: string;
  hours: string;
  note: string;
  isPlaceholder: boolean;
}

export const businessConfig = {
  /** Hours not yet confirmed by the owner → UI shows "contact for timings". */
  openingHours: {
    days: "Monday – Sunday",
    hours: "Timings on enquiry",
    note: "Opening hours will be published here once confirmed. Call or WhatsApp Nest for current timings.",
    isPlaceholder: true,
  } as OpeningHours,

  /**
   * Rules are intentionally NOT pre-filled. The rules page renders only
   * confirmed entries from data/rules.ts (currently an honest empty state).
   */
  rulesSummary: {
    heading: "A focused environment with clear expectations",
    points: [] as string[],
    isPlaceholder: true,
  },

  establishedNote:
    "Self study center and co-working study space in New Narsala, Nagpur.",
} as const;
