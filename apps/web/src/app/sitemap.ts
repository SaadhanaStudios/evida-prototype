import type { MetadataRoute } from "next";

// Explicit sitemap per the July 3 review — helps search + AI crawlers map
// the site ("how does X work" queries → /how-it-works, etc.).
// Update the base URL when the production domain is decided.
const BASE = "https://evida.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/membership", "/how-it-works", "/blog", "/about"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
