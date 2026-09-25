/**
 * Nest Library — form validation schemas (foundation).
 * Zod schemas for every future conversion flow. UI forms validate against
 * these via `@hookform/resolvers/zod` — no backend connection yet.
 * Frontend validation is UX only; the backend must re-validate everything.
 */

import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(80, "Name is too long.");

const phoneSchema = z
  .string()
  .trim()
  .min(10, "Please enter a valid phone number.")
  .max(18, "Please enter a valid phone number.")
  .regex(/^[+\d][\d\s-]*$/, "Please enter a valid phone number.");

const optionalMessage = z
  .string()
  .trim()
  .max(500, "Message must be under 500 characters.")
  .optional()
  .or(z.literal(""));

/** Seat Inquiry — §18 field list. */
export const seatInquirySchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  occupation: z.enum(["student", "professional", "other"], {
    message: "Please select who this seat is for.",
  }),
  examGoal: z.string().trim().max(120).optional().or(z.literal("")),
  duration: z.string().trim().min(1, "Please select a duration."),
  seatPreference: z.string().trim().min(1, "Please select a seat preference."),
  timing: z.string().trim().min(1, "Please select a timing."),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  message: optionalMessage,
});

export type SeatInquiryInput = z.infer<typeof seatInquirySchema>;

/** Book a Visit — §18 field list. */
export const bookVisitSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  preferredDate: z.string().min(1, "Please choose a preferred date."),
  preferredTime: z.string().min(1, "Please choose a preferred time."),
  purpose: z.string().trim().max(160).optional().or(z.literal("")),
  message: optionalMessage,
});

export type BookVisitInput = z.infer<typeof bookVisitSchema>;

/** Membership Inquiry — §18 field list. */
export const membershipInquirySchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  plan: z.string().trim().min(1, "Please select a plan."),
  seatType: z.string().trim().min(1, "Please select a seat type."),
  duration: z.string().trim().min(1, "Please select a duration."),
  message: optionalMessage,
});

export type MembershipInquiryInput = z.infer<typeof membershipInquirySchema>;

/** Contact — general enquiry fallback. */
export const contactSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  message: z
    .string()
    .trim()
    .min(5, "Please tell us briefly how we can help.")
    .max(500, "Message must be under 500 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
