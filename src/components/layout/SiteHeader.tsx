/**
 * Nest Library — production navbar.
 * Dark premium header: sticky, scroll-aware, keyboard-friendly,
 * smooth mobile drawer with clear CTAs. All labels/paths centralized.
 */

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import { navigationConfig, routePaths } from "../../config/navigation.ts";
import { siteConfig } from "../../config/site.ts";
import { buildWhatsAppUrl } from "../../lib/whatsapp.ts";
import { trackEvent } from "../../lib/analytics.ts";
import { safeLinkProps } from "../../lib/urls.ts";
import { cn } from "../../lib/cn.ts";
import { Container } from "../ui/Container.tsx";
import { Button } from "../ui/Button.tsx";
import { NestLogo } from "../brand/NestLogo.tsx";

export function SiteHeader(): ReactNode {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const whatsappHref = buildWhatsAppUrl("general");

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The drawer closes via link onClick handlers and the Escape key
  // (handled below); no route-change effect needed.

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "nest-dark sticky top-0 z-50 border-b border-white/10 transition-shadow",
        scrolled && "shadow-raised",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-3 md:h-[72px]">
          <Link
            to={routePaths.home}
            aria-label={`${siteConfig.name} — home`}
            className="shrink-0"
          >
            <NestLogo variant="light" />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 justify-center lg:flex"
          >
            <ul className="flex flex-wrap items-center justify-center gap-0.5">
              {navigationConfig.primary.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-2.5 py-2 text-small font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white xl:px-3",
                        isActive && "bg-white/10 font-semibold text-white",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={whatsappHref}
              {...safeLinkProps(whatsappHref)}
              onClick={() => {
                trackEvent("whatsapp_click", {
                  intent: "general",
                  surface: "navbar",
                });
              }}
              className="hidden h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:bg-white/10 md:inline-flex"
              aria-label="Chat with Nest on WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
            </a>
            <Button
              to={routePaths.bookVisit}
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => {
                trackEvent("cta_click", {
                  label: "Book a Visit",
                  surface: "navbar",
                });
              }}
            >
              {siteConfig.cta.secondary}
            </Button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setMenuOpen((open) => !open);
              }}
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="nest-dark-deep max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navigationConfig.primary.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="rounded-md px-3 py-3 font-medium text-white/90 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2 border-t border-white/10 pt-4 pb-2">
              <Button
                to={routePaths.bookVisit}
                size="lg"
                fullWidth
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {siteConfig.cta.secondary}
              </Button>
              <Button
                href={whatsappHref}
                variant="outline"
                size="lg"
                fullWidth
                className="border-white/25 bg-transparent text-white hover:bg-white/10"
                {...safeLinkProps(whatsappHref)}
                onClick={() => {
                  trackEvent("whatsapp_click", {
                    intent: "general",
                    surface: "mobile-menu",
                  });
                  setMenuOpen(false);
                }}
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                {siteConfig.cta.tertiary}
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
