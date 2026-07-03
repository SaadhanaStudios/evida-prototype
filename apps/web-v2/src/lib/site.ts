/*
 * Single source of truth for facts and links used across the site.
 * Figures come from the June 29 messaging framework + July 3 website review.
 */

export const LINKS = {
  book: "https://go.evida.uk/baseline",
  login: "https://dev.evida.uk",
  substack: "https://evidahealth.substack.com/",
  instagram: "https://www.instagram.com/evida.health",
  linkedin: "https://www.linkedin.com/company/evidahealth/",
  email: "hello@evida.uk",
  address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
} as const;

export const PRICE = {
  perMonth: "£27",
  perYear: "£320",
  exactPerMonth: "£26.67",
  perDay: "88p",
} as const;

export const NAV = [
  { href: "/membership", label: "Membership" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

// Reassurance micro-copy under primary CTAs (S8) — answers the three
// standing objections at the click moment.
export const REASSURANCE =
  "Takes 20 minutes to join · works alongside your NHS GP · no wearable needed";

// True scarcity (S11) — from the launch post; replaces the placeholder
// testimonials the old site shipped. Update as launch phase changes.
export const SCARCITY =
  "We're opening a limited number of baseline slots for our UK launch.";

// Evidence quotes with citable sources + backlinks (S12). URLs from the
// references of our own launch article. Micro Habits is a book — no link.
export const EVIDENCE = [
  {
    quote:
      "Around half of UK adults now track their health with a wearable — yet that data rarely reaches a clinician.",
    source: "LondonWorld, on UK health-tracking adoption",
    href: "https://www.londonworld.com/community/wellness-on-the-rise-over-50-of-uk-adults-embrace-health-tracking-devices-4962792",
  },
  {
    quote:
      "We live to 81 on average in the UK — but only around 47 of those years are spent in good health.",
    source: "The Health Foundation, REAL Centre",
    href: "https://www.health.org.uk/sites/default/files/upload/publications/2023/Projected%20patterns%20of%20illness%20in%20England_WEB.pdf",
  },
  {
    quote:
      "Forming a healthy habit alone succeeds 29% of the time. With someone in the loop, 59%. Add commitment: 72%.",
    source: "Micro Habits, Humphrey & Hughes",
    href: undefined,
  },
] as const;

// Flip when a real photo lands at public/images/consult.jpg (S7).
// TeamPhoto renders nothing while this is false.
export const SHOW_CONSULT_PHOTO = false;
