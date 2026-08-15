import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.gardzock.dev";
  const languages = ["pt-BR", "en"];

  return languages.map((lng) => ({
    url: `${siteUrl}/${lng}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lng === "pt-BR" ? 1.0 : 0.9,
    alternates: {
      languages: {
        "pt-BR": `${siteUrl}/pt-BR`,
        "en": `${siteUrl}/en`,
        "x-default": `${siteUrl}/en`,
      },
    },
  }));
}
