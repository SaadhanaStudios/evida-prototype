import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://evida.uk/sitemap.xml",
    host: "https://evida.uk",
  };
}
