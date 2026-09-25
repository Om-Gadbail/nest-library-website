import type { RouteObject } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout.tsx";
import { FoundationHomePage } from "../pages/FoundationHomePage.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";
import { PlaceholderPage } from "../pages/PlaceholderPage.tsx";
import { routePaths } from "../config/navigation.ts";

/**
 * Central route table — extend by adding a real page component and swapping
 * it in for the PlaceholderPage entry. Lazy-load heavy pages later via
 * React.lazy + <Suspense> without changing this shape.
 */
export const appRoutes: RouteObject[] = [
  {
    path: routePaths.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <FoundationHomePage /> },
      {
        path: "about",
        element: (
          <PlaceholderPage
            title="About Nest"
            description="The story, values and study philosophy of Nest Library will live here."
          />
        ),
      },
      {
        path: "facilities",
        element: (
          <PlaceholderPage
            title="Facilities"
            description="Verified Nest facilities — quiet halls, connectivity and amenities — will be listed here."
          />
        ),
      },
      {
        path: "membership",
        element: (
          <PlaceholderPage
            title="Membership plans"
            description="Real membership durations, seat types and fees will be published here once confirmed."
          />
        ),
      },
      {
        path: "membership-plans",
        element: (
          <PlaceholderPage
            title="Membership plans"
            description="Real membership durations, seat types and fees will be published here once confirmed."
          />
        ),
      },
      {
        path: "seats",
        element: (
          <PlaceholderPage
            title="Seat options"
            description="Real seat types, features and availability will be listed here once confirmed."
          />
        ),
      },
      {
        path: "seats/regular",
        element: (
          <PlaceholderPage
            title="Regular seat"
            description="Details of the regular seat option will be published here once confirmed."
          />
        ),
      },
      {
        path: "seats/confirmed",
        element: (
          <PlaceholderPage
            title="Confirmed seat"
            description="Details of the confirmed seat option will be published here once confirmed."
          />
        ),
      },
      {
        path: "study-environment",
        element: (
          <PlaceholderPage
            title="Study environment"
            description="What a focused day at Nest feels like — atmosphere, rhythm and expectations — will be described here."
          />
        ),
      },
      {
        path: "photos",
        element: (
          <PlaceholderPage
            title="Photos"
            description="Real photographs of the Nest space will be showcased here. Placeholder graphics only until then."
          />
        ),
      },
      {
        path: "rules",
        element: (
          <PlaceholderPage
            title="Rules"
            description="Verified community rules for a distraction-free environment will be published here."
          />
        ),
      },
      {
        path: "faq",
        element: (
          <PlaceholderPage
            title="FAQ"
            description="Answers to common questions about seats, membership, timings and visits will live here."
          />
        ),
      },
      {
        path: "location",
        element: (
          <PlaceholderPage
            title="Location"
            description="Verified address, map and directions will be published here."
          />
        ),
      },
      {
        path: "admission",
        element: (
          <PlaceholderPage
            title="Admission"
            description="The step-by-step admission process will be explained here."
          />
        ),
      },
      {
        path: "contact",
        element: (
          <PlaceholderPage
            title="Contact"
            description="Verified phone, WhatsApp, email and enquiry options will live here."
          />
        ),
      },
      {
        path: "seat-inquiry",
        element: (
          <PlaceholderPage
            title="Seat inquiry"
            description="The seat enquiry flow will live here. Forms arrive in a later phase."
          />
        ),
      },
      {
        path: "book-a-visit",
        element: (
          <PlaceholderPage
            title="Book a visit"
            description="The visit-booking flow will live here. Forms arrive in a later phase."
          />
        ),
      },
      {
        path: "book-visit",
        element: (
          <PlaceholderPage
            title="Book a visit"
            description="The visit-booking flow will live here. Forms arrive in a later phase."
          />
        ),
      },
      {
        path: "join",
        element: (
          <PlaceholderPage
            title="Join Nest"
            description="The joining flow will live here. Forms arrive in a later phase."
          />
        ),
      },
      {
        path: "membership-inquiry",
        element: (
          <PlaceholderPage
            title="Membership inquiry"
            description="The membership enquiry flow will live here. Forms arrive in a later phase."
          />
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
