"use client";

import Graph from "@/app/components/computer/chrome/content/Graph";
import { CgMouse } from "react-icons/cg";
import { TypeAnimation } from "react-type-animation";
import { useT } from "next-i18next/client";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export const Header = () => {
  const { t } = useT("portfolio");
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full  lg:h-dvh bg-[#0a0a0a] text-white font-sans selection:bg-green-500/30 overflow-hidden flex flex-col justify-between">
      <div className="flex flex-col lg:flex-row w-full h-full items-center my-auto">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full lg:w-[60%] px-6 lg:pl-12 lg:pr-8 py-10">

          <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[5rem] font-extrabold tracking-tighter leading-[1.1] mb-6 text-gray-100 text-shadow-green-400">
            {t("HEADER.TITLE_BUILDING")}{" "}
            <span className="text-green-400">{t("HEADER.TITLE_WEB_SYSTEMS")}</span>,<br />
            {t("HEADER.TITLE_AND")}{" "}
            <span className="text-cyan-400">{t("HEADER.TITLE_MODELS_3D")}</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-xl xl:text-2xl leading-relaxed mb-6 max-w-2xl font-light mx-auto lg:mx-0">
            {t("HEADER.BIO_PART1")}{" "}
            <strong className="text-white font-semibold">{t("HEADER.BIO_NAME")}</strong>
            {t("HEADER.BIO_PART2")}{" "}
            <strong className="text-green-400 font-mono">{t("HEADER.BIO_TAG")}</strong>
            {t("HEADER.BIO_PART3")}
          </p>

          <div className="text-gray-500 font-mono text-base sm:text-lg xl:text-xl mb-8 min-h-10 flex justify-center lg:justify-start w-full">
            <TypeAnimation
              key={t("HEADER.TYPEWRITER.INITIALIZING")}
              sequence={[
                t("HEADER.TYPEWRITER.INITIALIZING"),
                2000,
                t("HEADER.TYPEWRITER.LOADING_ASSETS"),
                2000,
                t("HEADER.TYPEWRITER.COMPILING_LOGIC"),
                2000,
              ]}
              speed={50}
              repeat={reducedMotion ? 0 : Infinity}
            />
          </div>
        </div>

        <div className="w-full lg:w-[40%] h-87.5 sm:h-112.5 lg:h-125 flex items-center justify-center p-4">
          <Graph />
        </div>
      </div>
      
      <div className="w-full pb-8 pt-4 flex justify-center text-white text-center z-10">
        <div className="motion-safe:animate-bounce flex gap-2 items-center text-base sm:text-xl">
          <CgMouse color="#39FF88"/>
          <p>{t("HEADER.SCROLL_DOWN")}</p>
        </div>
      </div>
    </div>
  );
};