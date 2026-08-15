"use client";

import { useState } from "react";
import { useT } from "next-i18next/client";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useBed } from "./BedContext";

type SectionKey =
  | "HISTORIA"
  | "MANTRAS"
  | "APRENDIZADOS"
  | "VIRADAS"
  | "HOJE"
  | "RECADO";

const SECTIONS: SectionKey[] = [
  "HISTORIA",
  "MANTRAS",
  "APRENDIZADOS",
  "VIRADAS",
  "HOJE",
  "RECADO",
];

const bg =
  "linear-gradient(50deg," +
  " rgba(8, 12, 22, 0.22) 7%," +
  " rgba(20, 28, 48, 0.12) 14%," +
  " rgba(10, 14, 24, 0.97) 34%," +
  " rgba(10, 14, 24, 0.97) 51%," +
  " rgb(10, 14, 24) 100%" +
  ")";

const mask =
  "linear-gradient(50deg," +
  " transparent 7%," +
  " rgba(0,0,0,0.15) 14%," +
  " rgba(0,0,0,0.7) 34%," +
  " black 51%," +
  " black 100%" +
  ")";

export const BedPanel = () => {
  const { isBedLocked } = useBed();
  const { t } = useT("bed");

  const [activeSection, setActiveSection] = useState<SectionKey>("HISTORIA");
  const [currentPage, setCurrentPage] = useState(0);

  const pagesData = (t(`SECTIONS.${activeSection}.PAGES`, {
    returnObjects: true,
  }) as Array<{
    SUBTITLE?: string | null;
    TYPE: "TEXT" | "LIST";
    CONTENT?: string;
    ITEMS?: string[];
  }>) || [];

  const totalPages = Array.isArray(pagesData) && pagesData.length > 0 ? pagesData.length : 1;
  const currentPageData = Array.isArray(pagesData) && pagesData[currentPage]
    ? pagesData[currentPage]
    : pagesData[0];

  const handleSelectSection = (key: SectionKey) => {
    setActiveSection(key);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-40 flex justify-end overflow-hidden transition-all duration-700 ease-in-out ${
        isBedLocked
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 translate-x-16 pointer-events-none"
      }`}
    >
      <div
        className="relative h-full flex flex-col justify-between p-10 text-white shadow-2xl"
        style={{
          width: "46vw",
          minWidth: "360px",
          maxWidth: "900px",
          background: bg,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        <div className="pt-8 pr-4 flex justify-end">
          <nav className="flex items-center gap-1.5 flex-wrap font-mono text-sm tracking-wide py-2.5 px-4 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md text-slate-400">
            <span className="text-sky-300/90 font-bold select-none">&lt;</span>
            {SECTIONS.map((secKey, idx) => {
              const isActive = secKey === activeSection;
              return (
                <div key={secKey} className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSelectSection(secKey)}
                    className={`transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-sky-200 font-bold underline decoration-sky-300/70 underline-offset-4 shadow-[0_0_12px_rgba(165,201,255,0.4)]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {t(`NAV.${secKey}`)}
                  </button>
                  {idx < SECTIONS.length - 1 && (
                    <span className="text-slate-600 select-none font-normal">
                      —
                    </span>
                  )}
                </div>
              );
            })}
            <span className="text-sky-300/90 font-bold select-none">&gt;</span>
          </nav>
        </div>

        <div className="flex-1 flex flex-col justify-center items-end text-end gap-5 py-6 pr-4 w-[45%] ml-auto overflow-y-auto scrollbar-none">
          <div className="flex flex-col items-end gap-1.5 border-b border-slate-800/80 pb-4 w-full">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-100">
              {t(`SECTIONS.${activeSection}.TITLE`)}
            </h2>
            <span className="text-sm font-mono text-sky-300/90 font-medium text-end">
              {t("PAGINATION.PAGE")} {currentPage + 1}
              {currentPageData?.SUBTITLE ? ` — ${currentPageData.SUBTITLE}` : ""}
            </span>
          </div>

          {currentPageData?.TYPE === "LIST" && currentPageData.ITEMS ? (
            <ul className="flex flex-col items-end gap-3 pt-2 w-full text-end">
              {currentPageData.ITEMS.map((item, i) => (
                <li
                  key={i}
                  className="flex flex-row-reverse items-start gap-3 text-slate-300 font-light text-base leading-relaxed text-end"
                >
                  <span className="text-sky-300 font-mono text-sm mt-0.5 select-none shrink-0">
                    ◂
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base text-slate-300 leading-relaxed font-light pt-2 text-end">
              {currentPageData?.CONTENT}
            </p>
          )}
        </div>

        <div className="w-[40%] ml-auto flex justify-end">
          <div className="flex items-center gap-2 p-2 border-t border-slate-800/60 text-slate-400 w-full justify-end">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:text-sky-300 active:scale-95 cursor-pointer"
            >
              <SlArrowLeft size={11} />
              <span>{t("PAGINATION.PREV", "Anterior")}</span>
            </button>

            <div className="flex items-center gap-1.5 mx-1">
              {Array.from({ length: totalPages }).map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => setCurrentPage(pIdx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    pIdx === currentPage
                      ? "w-2 h-2 bg-sky-300 shadow-[0_0_10px_#a5c9ff]"
                      : "w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                  title={`${t("PAGINATION.PAGE")} ${pIdx + 1}`}
                />
              ))}
              <span className="text-xs font-mono tracking-widest uppercase text-slate-400 ml-1">
                {currentPage + 1} / {totalPages}
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-all disabled:opacity-25 disabled:cursor-not-allowed hover:text-sky-300 active:scale-95 cursor-pointer"
            >
              <span>{t("PAGINATION.NEXT", "Próximo")}</span>
              <SlArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
