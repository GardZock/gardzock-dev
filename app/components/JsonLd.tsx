"use client";

export function JsonLd({ lng }: { lng: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.gardzock.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Miguel Turco",
    "alternateName": "GardZock",
    "url": siteUrl,
    "image": `${siteUrl}/linkedin_pfp.webp`,
    "jobTitle": lng === "pt-BR" ? "Desenvolvedor Full-Stack & GameDev" : "Full-Stack & Game Developer",
    "description":
      lng === "pt-BR"
        ? "Desenvolvedor Full-Stack conectando engenharia web, desenvolvimento de jogos e arte 3D imersiva."
        : "Full-Stack Developer connecting web engineering, game development, and immersive 3D art.",
    "sameAs": [
      "https://github.com/GardZock"
    ],
    "knowsAbout": [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Three.js",
      "WebGL",
      "Node.js",
      "Game Development",
      "3D Web Graphics"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GardZock | Miguel Turco Portfolio",
    "url": siteUrl,
    "inLanguage": ["pt-BR", "en"],
    "author": {
      "@type": "Person",
      "name": "Miguel Turco"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
