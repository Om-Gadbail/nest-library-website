/**
 * Nest Library — premium dark footer.
 * Config-driven contact facts; socials render only when real links exist.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { navigationConfig, routePaths } from "../../config/navigation.ts";
import { siteConfig } from "../../config/site.ts";
import { contactConfig } from "../../config/contact.ts";
import { businessConfig } from "../../config/business.ts";
import { buildWhatsAppUrl } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { Container } from "../ui/Container.tsx";
import { NestLogo } from "../brand/NestLogo.tsx";

export function SiteFooter(): ReactNode {
  const whatsappHref = buildWhatsAppUrl("general");
  const liveSocials = siteConfig.socials.filter(
    (s) => !s.isPlaceholder && Boolean(s.href),
  );
  const year = new Date().getFullYear();

  return (
    <footer className="nest-dark-deep mt-auto">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link to={routePaths.home} aria-label={`${siteConfig.name} — home`}>
            <NestLogo variant="light" />
          </Link>
          <p className="mt-4 max-w-xs text-small leading-relaxed text-white/70">
            Self Study Center · Co-Working Space. Your Study Space, Our
            Priority.
          </p>
          <div className="mt-5 space-y-2 text-small">
            <a
              href={contactConfig.phone.href}
              className="inline-flex items-center gap-2 font-semibold text-white hover:underline hover:underline-offset-4"
              onClick={() => {
                trackEvent("call_click", { surface: "footer" });
              }}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {contactConfig.phone.value}
            </a>
            <br />
            <a
              href={whatsappHref}
              {...safeLinkProps(whatsappHref)}
              className="inline-flex items-center gap-2 font-semibold text-white hover:underline hover:underline-offset-4"
              onClick={() => {
                trackEvent("whatsapp_click", {
                  intent: "general",
                  surface: "footer",
                });
              }}
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp Nest
            </a>
          </div>
          {liveSocials.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {liveSocials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...safeLinkProps(social.href)}
                    className="text-small text-white/70 hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Explore">
          <p className="text-label font-semibold tracking-[0.18em] text-white/50 uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {navigationConfig.footerExplore.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-small text-white/80 hover:text-white hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Support">
          <p className="text-label font-semibold tracking-[0.18em] text-white/50 uppercase">
            Support
          </p>
          <ul className="mt-4 space-y-2.5">
            {navigationConfig.footerSupport.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-small text-white/80 hover:text-white hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-label font-semibold tracking-[0.18em] text-white/50 uppercase">
            Visit
          </p>
          <p className="mt-4 flex items-start gap-2 text-small leading-relaxed text-white/80">
            <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {contactConfig.address.value}
          </p>
          <p className="mt-3 text-small text-white/60">
            {businessConfig.openingHours.days} ·{" "}
            {businessConfig.openingHours.hours}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to={routePaths.location}
              className="inline-flex min-h-[44px] items-center rounded-md border border-white/20 px-4 py-2 text-small font-semibold text-white hover:bg-white/10"
            >
              Get Directions
            </Link>
            <Link
              to={routePaths.bookVisit}
              className="inline-flex min-h-[44px] items-center rounded-md bg-primary px-4 py-2 text-small font-semibold text-primary-foreground hover:opacity-90"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-small text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link
              to={routePaths.privacy}
              className="hover:text-white hover:underline hover:underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              to={routePaths.terms}
              className="hover:text-white hover:underline hover:underline-offset-4"
            >
              Terms
            </Link>
            <Link
              to={routePaths.rules}
              className="hover:text-white hover:underline hover:underline-offset-4"
            >
              Rules
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
