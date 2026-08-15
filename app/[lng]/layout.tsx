import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "../components/JsonLd";

import {
  initServerI18next,
  getT,
  getResources,
  generateI18nStaticParams,
} from "next-i18next/server";
import { I18nProvider } from "next-i18next/client";
import i18nConfig from "@/i18n.config";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.gardzock.dev";
  const isPt = lng === "pt-BR";

  const title = isPt
    ? "Miguel Turco (@GardZock) | Desenvolvedor Full-Stack, GameDev & Arte 3D"
    : "Miguel Turco (@GardZock) | Full-Stack Developer, GameDev & 3D Artist";

  const description = isPt
    ? "Portfólio interativo 3D de Miguel Turco (@GardZock). Desenvolvedor Full-Stack focado em engenharia de sistemas web, desenvolvimento de jogos e gráficos 3D imersivos com Next.js, React e Three.js."
    : "Interactive 3D Portfolio of Miguel Turco (@GardZock). Full-Stack Developer focused on web systems engineering, game development, and immersive 3D graphics with Next.js, React, and Three.js.";

  const keywords = [
    "Miguel Turco",
    "GardZock",
    "Full-Stack Developer",
    "Desenvolvedor Full Stack",
    "Game Developer",
    "Three.js Developer",
    "React",
    "Next.js",
    "TypeScript",
    "WebGL",
    "Portfólio 3D",
    "Interactive Portfolio",
  ];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | GardZock",
    },
    description,
    keywords,
    authors: [{ name: "Miguel Turco", url: "https://github.com/GardZock" }],
    creator: "Miguel Turco (@GardZock)",
    publisher: "GardZock",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteUrl}/${lng}`,
      languages: {
        "pt-BR": `${siteUrl}/pt-BR`,
        "en": `${siteUrl}/en`,
        "x-default": `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: isPt ? "pt_BR" : "en_US",
      alternateLocale: isPt ? ["en_US"] : ["pt_BR"],
      url: `${siteUrl}/${lng}`,
      title,
      description,
      siteName: "GardZock | Miguel Turco Portfolio",
      images: [
        {
          url: `${siteUrl}/linkedin_banner.webp`,
          width: 1200,
          height: 630,
          alt: "Miguel Turco (@GardZock) - Portfólio 3D",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/linkedin_banner.webp`],
      creator: "@GardZock",
      site: "@GardZock",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
  };
}

initServerI18next(i18nConfig);

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  const { i18n } = await getT();
  const resources = getResources(i18n);
  return (
    <html
      lang={lng}
      className={`${jetbrainsMono.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <I18nProvider language={lng} resources={resources}>
        <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <JsonLd lng={lng} />
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </I18nProvider>
    </html>
  );
}
