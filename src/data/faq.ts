/**
 * Nest Library — FAQ (verified facts only, OWNER-EDITABLE).
 * No invented policies, timings, or availability claims.
 * Timings/availability answers honestly direct visitors to contact Nest.
 */

import type { Faq } from "../types/content.ts";

export const faqs: Faq[] = [
  {
    id: "what-is-nest",
    question: "What is Nest Library?",
    answer:
      "Nest Library is a self study center and co-working study space in New Narsala, Nagpur. It provides a calm, focused environment with dedicated seating for students and working learners.",
    category: "general",
    isPlaceholder: false,
  },
  {
    id: "regular-vs-confirmed",
    question:
      "What is the difference between a Regular Seat and a Confirmed Seat?",
    answer:
      "A Regular Seat is a flexible study option for members. A Confirmed Seat is a more dedicated option and includes priority seat selection, which is especially useful for long-term, consistent study.",
    category: "seats",
    isPlaceholder: false,
  },
  {
    id: "admission-plans",
    question: "What admission plans are available?",
    answer:
      "Both Regular and Confirmed Seats are available in 1, 3, 6, 8 and 12-month durations. Standard admission prices start at ₹800/month (Regular) and ₹1,000/month (Confirmed). Limited-period opening-offer prices are currently live — see the Membership page for the full table.",
    category: "membership",
    isPlaceholder: false,
  },
  {
    id: "opening-offer",
    question: "What is the current opening offer?",
    answer:
      "The opening offer includes special introductory prices for early admissions, free registration for early admissions, and priority seat selection for Confirmed-Seat members. It is a limited-period offer.",
    category: "offer",
    isPlaceholder: false,
  },
  {
    id: "facilities",
    question: "Which facilities are available at Nest?",
    answer:
      "The currently confirmed facilities are air cooling, Wi-Fi, a unisex space and a convenience space. Additional facilities will be published here once confirmed.",
    category: "facilities",
    isPlaceholder: false,
  },
  {
    id: "visit-before-joining",
    question: "Can I visit Nest before joining?",
    answer:
      "Yes. Use the Book a Visit page to share your name, phone number and preferred date/time, or message Nest on WhatsApp. The team will confirm your visit.",
    category: "visit",
    isPlaceholder: false,
  },
  {
    id: "how-to-join",
    question: "How do I join Nest?",
    answer:
      "Choose your seat type and duration on the Membership page, then submit a seat, membership or visit enquiry — or message Nest on WhatsApp. The team confirms availability and next steps with you directly.",
    category: "admission",
    isPlaceholder: false,
  },
  {
    id: "timings",
    question: "What are the study timings?",
    answer:
      "Opening hours are being finalised and will be published here soon. For current timings, please call or WhatsApp Nest Library.",
    category: "timings",
    isPlaceholder: false,
  },
  {
    id: "availability",
    question: "How do I check current seat availability?",
    answer:
      "Seat availability is confirmed enquiry-by-enquiry at the moment — there is no live seat counter yet. Submit a seat enquiry or ask on WhatsApp and the team will confirm what is available.",
    category: "seats",
    isPlaceholder: false,
  },
  {
    id: "location",
    question: "Where is Nest Library located?",
    answer:
      "Nest Library is on the 2nd Floor in New Narsala, Nagpur, Maharashtra, India. See the Location page for the address card and directions (map link will appear once the verified Google Maps URL is configured).",
    category: "location",
    isPlaceholder: false,
  },
  {
    id: "payments",
    question: "How do payments work?",
    answer:
      "Payments are confirmed with the Nest team directly after your enquiry or visit. Online payment options will be introduced in the future; for now the team will guide you.",
    category: "payments",
    isPlaceholder: false,
  },
  {
    id: "rules",
    question: "Are there rules for the study space?",
    answer:
      "Nest maintains a focused, distraction-free environment. The confirmed community guidelines will be published on the Rules page — anything not listed there should be confirmed with the team directly.",
    category: "rules",
    isPlaceholder: false,
  },
];

export const faqCategories = [
  { value: "all", label: "All" },
  { value: "general", label: "General" },
  { value: "seats", label: "Seats" },
  { value: "membership", label: "Membership" },
  { value: "offer", label: "Opening Offer" },
  { value: "facilities", label: "Facilities" },
  { value: "visit", label: "Visit" },
  { value: "admission", label: "Admission" },
  { value: "timings", label: "Timings" },
  { value: "location", label: "Location" },
  { value: "payments", label: "Payments" },
  { value: "rules", label: "Rules" },
] as const;
