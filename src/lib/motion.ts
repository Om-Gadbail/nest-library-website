/**
 * Nest Library — motion tokens (foundation).
 * Single source of truth for durations, easing, springs and stagger.
 * Components must use these constants — never random inline values.
 * Calm, premium, study-oriented motion: subtle and fast.
 */

/** Durations in seconds. */
export const motionDuration = {
  instant: 0.12,
  fast: 0.2,
  normal: 0.32,
  slow: 0.55,
} as const;

/** Delays in seconds. */
export const motionDelay = {
  none: 0,
  tight: 0.04,
  normal: 0.08,
  loose: 0.16,
} as const;

/** Easing curves (cubic-bezier arrays for Motion). */
export const motionEasing = {
  /** Default: calm ease-out for reveals and entrances. */
  standard: [0.22, 1, 0.36, 1],
  /** Subtle acceleration for exits. */
  exit: [0.4, 0, 1, 1],
  /** Snappy tactile feedback for taps. */
  snap: [0.34, 1.56, 0.64, 1],
} as const;

/** Spring presets for gesture / layout motion. */
export const motionSpring = {
  soft: { type: "spring", stiffness: 260, damping: 28 },
  snappy: { type: "spring", stiffness: 400, damping: 30 },
} as const;

/** Stagger intervals for grouped cards. */
export const motionStagger = {
  tight: 0.05,
  normal: 0.08,
  loose: 0.12,
} as const;

/** Viewport thresholds for `whileInView` reveals. */
export const motionViewport = {
  /** Trigger once the section is 20% visible; small margin for early reveal. */
  once: true,
  amount: 0.2,
  margin: "-64px",
} as const;

/** Subtle hover lift (transform + opacity only — no shadow animation). */
export const motionHoverLift = {
  y: -3,
  transition: { duration: motionDuration.fast, ease: motionEasing.standard },
} as const;

/** Small tactile tap response. */
export const motionTapScale = {
  scale: 0.97,
  transition: { duration: motionDuration.instant, ease: motionEasing.snap },
} as const;

/** Standard fade-up reveal used by section entrances. */
export const motionReveal = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: motionDuration.normal, ease: motionEasing.standard },
} as const;
