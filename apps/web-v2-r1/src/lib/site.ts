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
