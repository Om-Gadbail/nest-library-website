/**
 * Nest Library — cinematic editorial hero.
 * Dark premium, staggered entrance, honest facility indicators.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  MessageCircle,
  Snowflake,
  Users,
  Wifi,
  Armchair,
} from "lucide-react";
import { motion } from "motion/react";
import { routePaths } from "../../config/navigation.ts";
import { siteConfig } from "../../config/site.ts";
import { buildWhatsAppUrl } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.ts";
import { motionDuration, motionEasing } from "../../lib/motion.ts";
import { Container } from "../ui/Container.tsx";
import { NestLogoMark } from "../brand/NestLogo.tsx";

const trustItems = [
  { icon: Snowflake, label: "Air Cooling" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Users, label: "Unisex" },
  { icon: Armchair, label: "Dedicated Study Space" },
];

export function Hero(): ReactNode {
  const reduce = usePrefersReducedMotion();
  const whatsappHref = buildWhatsAppUrl("general");
  const anim = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0.01 : motionDuration.slow,
      delay: reduce ? 0 : delay,
      ease: motionEasing.standard,
    },
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="nest-dark relative overflow-hidden"
    >
      <div aria-hidden="true" className="nest-hero-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-primary/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-20%] left-[-8%] h-80 w-80 rounded-full bg-accent/15 blur-[100px]"
      />

      <Container className="relative py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.p
              {...anim(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-label font-bold tracking-[0.2em] text-white/85 uppercase"
            >
              <NestLogoMark className="h-5 w-5" />
              Self Study Center · Co-Working Space
            </motion.p>

            <motion.h1
              {...anim(0.08)}
              id="hero-heading"
              className="hero-title mt-5 font-extrabold text-white"
            >
              Better Space,
              <br />
              <span className="text-accent">Bigger Dreams.</span>
            </motion.h1>

            <motion.p
              {...anim(0.16)}
              className="mt-5 max-w-xl text-body leading-relaxed text-white/75 md:text-lg"
            >
              {siteConfig.name} in New Narsala, Nagpur — a calm, focused study
              environment with dedicated seating. {siteConfig.supportingLine}
            </motion.p>

            <motion.div {...anim(0.24)} className="mt-8 flex flex-wrap gap-3">
              <Link
                to={routePaths.membership}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90"
                onClick={() => {
                  trackEvent("hero_cta_click", {
                    label: "View Admission Plans",
                  });
                }}
              >
                {siteConfig.cta.primary}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                to={routePaths.bookVisit}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md border border-white/25 px-7 py-3.5 font-semibold text-white hover:bg-white/10"
                onClick={() => {
                  trackEvent("hero_cta_click", { label: "Book a Visit" });
                }}
              >
                <CalendarCheck aria-hidden="true" className="h-4 w-4" />
                {siteConfig.cta.secondary}
              </Link>
              <a
                href={whatsappHref}
                {...safeLinkProps(whatsappHref)}
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md px-4 py-3.5 font-semibold text-white/85 hover:bg-white/10 hover:text-white"
                onClick={() => {
                  trackEvent("whatsapp_click", {
                    intent: "general",
                    surface: "hero",
                  });
                }}
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                {siteConfig.cta.tertiary}
              </a>
            </motion.div>

            <motion.ul
              {...anim(0.32)}
              aria-label="Confirmed highlights"
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-small font-medium text-white/70"
            >
              {trustItems.map((item) => (
                <li
                  key={item.label}
                  className="inline-flex items-center gap-1.5"
                >
                  <item.icon
                    aria-hidden="true"
                    className="h-4 w-4 text-accent"
                  />
                  {item.label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Editorial visual — branded panel (real photography slot). */}
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduce ? 0.01 : 0.7,
              delay: reduce ? 0 : 0.2,
              ease: motionEasing.standard,
            }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-navy-deep shadow-raised">
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-navy-soft via-navy to-navy-deep">
                <div
                  aria-hidden="true"
                  className="nest-hero-grid absolute inset-0 opacity-70"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <NestLogoMark className="h-16 w-16" />
                  <p className="text-label font-bold tracking-[0.24em] text-white/60 uppercase">
                    Nest Library · Nagpur
                  </p>
                  <p className="max-w-xs text-h3 font-extrabold text-white">
                    Your Study Space, Our Priority.
                  </p>
                  <p className="max-w-xs text-small text-white/60">
                    Real Nest photography will appear here once available.
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/50 to-transparent px-5 pt-10 pb-4">
                  <p className="text-small font-semibold text-white">
                    2nd Floor · New Narsala
                  </p>
                  <p className="rounded-full bg-primary px-3 py-1 text-label font-bold text-primary-foreground">
                    Opening Offer Live
                  </p>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border border-accent/30"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
