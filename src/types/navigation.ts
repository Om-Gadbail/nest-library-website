/**
 * Nest Library — navigation types.
 * Consumed by the central navigation config and navigation components.
 */

export interface NavLink {
  label: string;
  to: string;
  /** Short description used by footers / sitemaps. */
  description?: string;
}

export interface NavigationConfig {
  primary: NavLink[];
  footerExplore: NavLink[];
  footerSupport: NavLink[];
  /** High-intent conversion actions (enquire, book a visit, join). */
  conversions: NavLink[];
}
