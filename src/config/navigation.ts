/**
 * Nest Library — central navigation + route-path configuration.
 * Single source of truth for every route. Components must import
 * paths from here, never hardcode URL strings.
 */

import type { NavigationConfig } from "../types/navigation.ts";

export const routePaths = {
  home: "/",
  about: "/about",
  environment: "/study-environment",
  facilities: "/facilities",
  seats: "/seats",
  seatsRegular: "/seats/regular",
  seatsConfirmed: "/seats/confirmed",
  membership: "/membership",
  /** Legacy alias kept for existing links; canonical path is /membership. */
  plans: "/membership-plans",
  admission: "/admission",
  openingOffer: "/opening-offer",
  gallery: "/gallery",
  /** Legacy alias; canonical path is /gallery. */
  photos: "/photos",
  memberStories: "/member-stories",
  reviews: "/reviews",
  rules: "/rules",
  faq: "/faq",
  location: "/location",
  contact: "/contact",
  bookVisit: "/book-a-visit",
  bookVisitAlias: "/book-visit",
  seatInquiry: "/seat-inquiry",
  membershipInquiry: "/membership-inquiry",
  join: "/join-nest",
  /** Legacy alias; canonical path is /join-nest. */
  joinAlias: "/join",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type RoutePath = (typeof routePaths)[keyof typeof routePaths];

export const navigationConfig: NavigationConfig = {
  primary: [
    { label: "Home", to: routePaths.home },
    { label: "About", to: routePaths.about },
    { label: "Facilities", to: routePaths.facilities },
    { label: "Seats", to: routePaths.seats },
    { label: "Plans", to: routePaths.membership },
    { label: "Study Environment", to: routePaths.environment },
    { label: "Gallery", to: routePaths.gallery },
    { label: "FAQ", to: routePaths.faq },
    { label: "Contact", to: routePaths.contact },
  ],
  footerExplore: [
    { label: "About Nest", to: routePaths.about },
    { label: "Facilities", to: routePaths.facilities },
    { label: "Seats & Plans", to: routePaths.seats },
    { label: "Membership", to: routePaths.membership },
    { label: "Study Environment", to: routePaths.environment },
    { label: "Gallery", to: routePaths.gallery },
  ],
  footerSupport: [
    { label: "Admission", to: routePaths.admission },
    { label: "Opening Offer", to: routePaths.openingOffer },
    { label: "Location", to: routePaths.location },
    { label: "Rules", to: routePaths.rules },
    { label: "FAQ", to: routePaths.faq },
    { label: "Contact", to: routePaths.contact },
  ],
  conversions: [
    { label: "Book a Visit", to: routePaths.bookVisit },
    { label: "Seat Inquiry", to: routePaths.seatInquiry },
    { label: "Membership Inquiry", to: routePaths.membershipInquiry },
    { label: "Join Nest", to: routePaths.join },
  ],
};
