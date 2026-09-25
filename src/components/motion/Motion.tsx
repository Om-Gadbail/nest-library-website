import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import {
  motionDelay,
  motionDuration,
  motionEasing,
  motionHoverLift,
  motionStagger,
  motionTapScale,
  motionViewport,
} from "../../lib/motion.ts";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.ts";

/**
 * Nest Library — reusable motion primitives (foundation).
 *
 * Built on `motion/react`. All timing comes from `lib/motion.ts` tokens.
 * Every primitive honours `prefers-reduced-motion`: large movement is
 * removed while opacity/state feedback is retained.
 *
 * RULE: use CSS transitions for trivial hover/color changes. Reach for these
 * primitives only when viewport entry, sequencing, gestures or layout
 * genuinely benefit from Motion.
 */

interface PrimitiveProps {
  children: ReactNode;
  className?: string;
  /** Extra entrance delay in seconds (token-aligned preferred). */
  delay?: number;
}

function useSafeDelay(delay: number): number {
  const reduce = usePrefersReducedMotion();
  return reduce ? 0 : delay;
}

/** Subtle fade-up on viewport entry — default section reveal. */
export function FadeIn({
  children,
  className,
  delay = 0,
}: PrimitiveProps): ReactNode {
  const safeDelay = useSafeDelay(delay);
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{
        duration: reduce ? motionDuration.instant : motionDuration.normal,
        delay: safeDelay,
        ease: motionEasing.standard,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Alias for section reveals with a slightly slower settle. */
export function Reveal({
  children,
  className,
  delay = 0,
}: PrimitiveProps): ReactNode {
  const safeDelay = useSafeDelay(delay);
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{
        duration: reduce ? motionDuration.instant : motionDuration.slow,
        delay: safeDelay,
        ease: motionEasing.standard,
      }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: (stagger: number = motionStagger.normal) => ({
    transition: { staggerChildren: stagger },
  }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.normal,
      ease: motionEasing.standard,
    },
  },
};

/** Staggered entrance for grouped cards. Children must use <StaggerItem>. */
export function Stagger({
  children,
  className,
  interval = motionStagger.normal,
}: PrimitiveProps & { interval?: number }): ReactNode {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={motionViewport}
      custom={interval}
    >
      {children}
    </motion.div>
  );
}

/** Direct child of <Stagger> — animates in sequence. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Gentle scale-in for badges, icons and small highlights. */
export function ScaleIn({
  children,
  className,
  delay = 0,
}: PrimitiveProps): ReactNode {
  const safeDelay = useSafeDelay(delay);
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={motionViewport}
      transition={{
        duration: reduce ? motionDuration.instant : motionDuration.fast,
        delay: safeDelay,
        ease: motionEasing.standard,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Horizontal slide-in for drawers, mobile menu and side content. */
export function SlideIn({
  children,
  className,
  direction = "left",
  delay = 0,
}: PrimitiveProps & { direction?: "left" | "right" }): ReactNode {
  const safeDelay = useSafeDelay(delay);
  const reduce = usePrefersReducedMotion();
  const offset = direction === "left" ? -24 : 24;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reduce ? 0 : offset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={motionViewport}
      transition={{
        duration: reduce ? motionDuration.instant : motionDuration.normal,
        delay: safeDelay,
        ease: motionEasing.standard,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Subtle page-transition wrapper: fade only, no route sliding. */
export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reduce ? motionDuration.instant : motionDuration.fast,
        delay: motionDelay.none,
        ease: motionEasing.standard,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Subtle hover lift + tap response for interactive cards/buttons. */
export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={motionHoverLift}
      whileTap={motionTapScale}
    >
      {children}
    </motion.div>
  );
}

/** Small tactile tap response without hover movement. */
export function TapScale({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} whileTap={motionTapScale}>
      {children}
    </motion.div>
  );
}
