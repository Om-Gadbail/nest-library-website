/**
 * Nest Library — audience + study-goal content (OWNER-EDITABLE).
 * Only categories relevant to a self-study center are listed.
 */

export const audienceGroups = [
  {
    id: "competitive",
    title: "Competitive Exam Aspirants",
    description: "A consistent daily seat for long preparation arcs.",
    icon: "target",
  },
  {
    id: "government",
    title: "Government Exam Aspirants",
    description: "Quiet routine-friendly space for syllabus + revision.",
    icon: "landmark",
  },
  {
    id: "entrance",
    title: "Entrance Exam Students",
    description: "Focused blocks for concepts, mocks and practice.",
    icon: "graduation-cap",
  },
  {
    id: "college",
    title: "College / University Students",
    description: "A better-than-home setup for semesters and projects.",
    icon: "book-open",
  },
  {
    id: "professional",
    title: "Professional Exam Students",
    description: "Deep-work evenings for CA, CS, CMA and similar goals.",
    icon: "briefcase",
  },
  {
    id: "working",
    title: "Working Learners",
    description: "Study around a job with a dedicated, calm desk.",
    icon: "laptop",
  },
] as const;

export const studyGoals = [
  "Competitive Exam",
  "College / University",
  "Professional Exam",
  "Self Study",
  "Work / Projects",
  "Other",
] as const;

export const whyNestPoints = [
  {
    id: "focus",
    title: "Built for focus",
    description:
      "A dedicated study environment that removes the distractions of studying at home.",
    icon: "crosshair",
  },
  {
    id: "comfort",
    title: "Comfortable for long hours",
    description:
      "Air-cooled seating designed for extended, consistent study sessions.",
    icon: "armchair",
  },
  {
    id: "dedicated",
    title: "Your seat, your routine",
    description:
      "Regular and Confirmed options — including priority seat selection — so your routine stays stable.",
    icon: "armchair",
  },
  {
    id: "connected",
    title: "Connected & convenient",
    description:
      "Wi-Fi and a convenient setup in New Narsala, Nagpur, with easy enquiry on call or WhatsApp.",
    icon: "wifi",
  },
] as const;
