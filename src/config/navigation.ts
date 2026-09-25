/**
 * Nest Library — central navigation + route-path configuration.
 *
 * Planned pages exist as placeholder routes so the information architecture
 * can be reviewed early. Only routes listed in `enabledRoutes` render real
 * placeholders today; the rest resolve to the generic placeholder page until
 * their dedicated page is built.
 */

import type { NavigationConfig } from "../types/navigation.ts";

export const routePaths = {
  home: "/",
  about: "/about",
  facilities: "/facilities",
  membership: "/membership",
  /** Legacy alias kept for existing links; canonical path is /membership. */
  plans: "/membership-plans",
  seats: "/seats",
  seatsRegular: "/seats/regular",
  seatsConfirmed: "/seats/confirmed",
  environment: "/study-environment",
  photos: "/photos",
  rules: "/rules",
  faq: "/faq",
  location: "/location",
  admission: "/admission",
  contact: "/contact",
  seatInquiry: "/seat-inquiry",
  /** Canonical visit path; /book-visit kept as an alias route. */
  bookVisit: "/book-a-visit",
  bookVisitAlias: "/book-visit",
  join: "/join",
  membershipInquiry: "/membership-inquiry",
} as const;

export type RoutePath = (typeof routePaths)[keyof typeof routePaths];

export const navigationConfig: NavigationConfig = {
  primary: [
    { label: "Home", to: routePaths.home },
    { label: "About", to: routePaths.about },
    { label: "Facilities", to: routePaths.facilities },
    { label: "Seats", to: routePaths.seats },
    { label: "Plans", to: routePaths.membership },
    { label: "Photos", to: routePaths.photos },
    { label: "FAQ", to: routePaths.faq },
    { label: "Contact", to: routePaths.contact },
  ],
  footerExplore: [
    { label: "About Nest", to: routePaths.about },
    { label: "Facilities", to: routePaths.facilities },
    { label: "Study environment", to: routePaths.environment },
    { label: "Photos", to: routePaths.photos },
    { label: "Rules", to: routePaths.rules },
  ],
  footerSupport: [
    { label: "Admission", to: routePaths.admission },
    { label: "Location", to: routePaths.location },
    { label: "FAQ", to: routePaths.faq },
    { label: "Contact", to: routePaths.contact },
  ],
  conversions: [
    { label: "Seat inquiry", to: routePaths.seatInquiry },
    { label: "Book a visit", to: routePaths.bookVisit },
    { label: "Join Nest", to: routePaths.join },
    { label: "Membership inquiry", to: routePaths.membershipInquiry },
  ],
};
