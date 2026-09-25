import { Suspense, lazy } from "react";
import type { ComponentType, ReactNode } from "react";
import type { RouteObject } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout.tsx";
import { LoadingFallback } from "../components/common/LoadingFallback.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";

/**
 * Central route table — every public page is a real page.
 * No dead routes. Legacy aliases render the canonical page.
 * Non-critical pages lazy-load (one chunk per page module).
 */

function page<T extends object>(
  importer: () => Promise<T>,
  select: (module: T) => ComponentType,
): ComponentType {
  return lazy(() => importer().then((module) => ({ default: select(module) })));
}

const HomePage = page(
  () => import("../pages/HomePage.tsx"),
  (m) => m.HomePage,
);
const AboutPage = page(
  () => import("../pages/AboutPage.tsx"),
  (m) => m.AboutPage,
);
const StudyEnvironmentPage = page(
  () => import("../pages/StudyEnvironmentPage.tsx"),
  (m) => m.StudyEnvironmentPage,
);
const FacilitiesPage = page(
  () => import("../pages/FacilitiesPage.tsx"),
  (m) => m.FacilitiesPage,
);
const SeatsPage = page(
  () => import("../pages/SeatsPages.tsx"),
  (m) => m.SeatsPage,
);
const RegularSeatPage = page(
  () => import("../pages/SeatsPages.tsx"),
  (m) => m.RegularSeatPage,
);
const ConfirmedSeatPage = page(
  () => import("../pages/SeatsPages.tsx"),
  (m) => m.ConfirmedSeatPage,
);
const MembershipPage = page(
  () => import("../pages/MembershipPages.tsx"),
  (m) => m.MembershipPage,
);
const AdmissionPage = page(
  () => import("../pages/MembershipPages.tsx"),
  (m) => m.AdmissionPage,
);
const OpeningOfferPage = page(
  () => import("../pages/MembershipPages.tsx"),
  (m) => m.OpeningOfferPage,
);
const GalleryPage = page(
  () => import("../pages/GalleryPages.tsx"),
  (m) => m.GalleryPage,
);
const MemberStoriesPage = page(
  () => import("../pages/GalleryPages.tsx"),
  (m) => m.MemberStoriesPage,
);
const ReviewsPage = page(
  () => import("../pages/GalleryPages.tsx"),
  (m) => m.ReviewsPage,
);
const RulesPage = page(
  () => import("../pages/InfoPages.tsx"),
  (m) => m.RulesPage,
);
const FaqPage = page(
  () => import("../pages/InfoPages.tsx"),
  (m) => m.FaqPage,
);
const LocationPage = page(
  () => import("../pages/InfoPages.tsx"),
  (m) => m.LocationPage,
);
const ContactPage = page(
  () => import("../pages/ConversionPages.tsx"),
  (m) => m.ContactPage,
);
const BookVisitPage = page(
  () => import("../pages/ConversionPages.tsx"),
  (m) => m.BookVisitPage,
);
const SeatInquiryPage = page(
  () => import("../pages/ConversionPages.tsx"),
  (m) => m.SeatInquiryPage,
);
const MembershipInquiryPage = page(
  () => import("../pages/ConversionPages.tsx"),
  (m) => m.MembershipInquiryPage,
);
const JoinPage = page(
  () => import("../pages/ConversionPages.tsx"),
  (m) => m.JoinPage,
);
const PrivacyPage = page(
  () => import("../pages/ConversionPages.tsx"),
  (m) => m.PrivacyPage,
);
const TermsPage = page(
  () => import("../pages/ConversionPages.tsx"),
  (m) => m.TermsPage,
);

function withSuspense(Component: ComponentType): ReactNode {
  return (
    <Suspense fallback={<LoadingFallback label="Loading page…" />}>
      <Component />
    </Suspense>
  );
}

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: "about", element: withSuspense(AboutPage) },
      {
        path: "study-environment",
        element: withSuspense(StudyEnvironmentPage),
      },
      { path: "facilities", element: withSuspense(FacilitiesPage) },
      { path: "seats", element: withSuspense(SeatsPage) },
      { path: "seats/regular", element: withSuspense(RegularSeatPage) },
      { path: "seats/confirmed", element: withSuspense(ConfirmedSeatPage) },
      { path: "membership", element: withSuspense(MembershipPage) },
      { path: "membership-plans", element: withSuspense(MembershipPage) },
      { path: "admission", element: withSuspense(AdmissionPage) },
      { path: "opening-offer", element: withSuspense(OpeningOfferPage) },
      { path: "gallery", element: withSuspense(GalleryPage) },
      { path: "photos", element: withSuspense(GalleryPage) },
      { path: "member-stories", element: withSuspense(MemberStoriesPage) },
      { path: "reviews", element: withSuspense(ReviewsPage) },
      { path: "rules", element: withSuspense(RulesPage) },
      { path: "faq", element: withSuspense(FaqPage) },
      { path: "location", element: withSuspense(LocationPage) },
      { path: "contact", element: withSuspense(ContactPage) },
      { path: "book-a-visit", element: withSuspense(BookVisitPage) },
      { path: "book-visit", element: withSuspense(BookVisitPage) },
      { path: "seat-inquiry", element: withSuspense(SeatInquiryPage) },
      {
        path: "membership-inquiry",
        element: withSuspense(MembershipInquiryPage),
      },
      { path: "join-nest", element: withSuspense(JoinPage) },
      { path: "join", element: withSuspense(JoinPage) },
      { path: "privacy", element: withSuspense(PrivacyPage) },
      { path: "terms", element: withSuspense(TermsPage) },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
