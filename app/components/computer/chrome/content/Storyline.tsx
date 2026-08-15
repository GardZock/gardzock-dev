"use client";

import MiniVSCode from "./storyline/MiniVSCode";
import MiniDiscloud from "./storyline/MiniDiscloud";
import MiniLiveServer from "./storyline/MiniLiveServer";
import MiniDevNetwork from "./storyline/MiniLinkedin";
import MiniGameDevLoading from "./storyline/MiniGameDevLoading";
import MiniSaasDashboard from "./storyline/MiniSaasDashboard";
import MiniInnovationLoading from "./storyline/MiniGithub";
import { useT } from "next-i18next/client";
import { StorylineItem } from "./storyline/StoryLineItem";
import { ReactNode } from "react";

const STORYLINE_YEARS: Record<string, ReactNode> = {
  "2020": <MiniVSCode />,
  "2021": <MiniDiscloud />,
  "2022": <MiniLiveServer />,
  "2023": <MiniDevNetwork />,
  "2024": <MiniInnovationLoading />,
  "2025": <MiniGameDevLoading />,
  "2026": <MiniSaasDashboard/>

};

export default function Storyline() {
  const { t } = useT("portfolio");
  return (
    <section
      className="bg-[#131313] relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-linear-to-b from-accent/0 via-accent/15 to-accent/0 -translate-x-1/2 pointer-events-none" />

      <div className="mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="text-center space-y-3 mb-24">
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-text-main tracking-tight">
            {t("STORYLINE.TITLE")}
          </h2>
          <p className="font-sans text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto">
            {t("STORYLINE.SUBTITLE")}
          </p>
        </div>

        <div className="relative space-y-20 lg:space-y-28">
          {Object.keys(STORYLINE_YEARS).map((year: string) => {

            let isLeft = false;
            const isCentered = year == "2026" ? true : false;
            if (parseInt(year) % 2 == 0) {
              isLeft = true;
            }

            return (
              <StorylineItem
                key={year}
                year={parseInt(year)}
                title={t(`STORYLINE.${year}.TITLE`)}
                text={t(`STORYLINE.${year}.DESCRIPTION`)}
                isLeft={isLeft}
                isCentered={isCentered}
              >
                {STORYLINE_YEARS[year]}
              </StorylineItem>
            );
          })}

        </div>
      </div>
    </section>
  );
}
