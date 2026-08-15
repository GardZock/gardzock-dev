"use client";

import React from "react";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { FiShieldOff } from "react-icons/fi";
import { useAudio } from "./AudioContext";
import { useComputer } from "./computer/ComputerContext";
import { useT } from "next-i18next/client";

export const MuteButton = () => {
  const { isMuted, toggle, showAdBlockNotice } = useAudio();
  const { isComputerLocked } = useComputer();
  const { t } = useT("portfolio");

  const isExpanded = showAdBlockNotice;

  return (
    <div
      className={`fixed top-6 left-6 z-50 flex items-center transition-all duration-500 ease-in-out ${
        isComputerLocked
          ? "opacity-0 pointer-events-none -translate-y-2"
          : "opacity-100 pointer-events-auto translate-y-0"
      }`}
    >
      <button
        onClick={toggle}
        title={isMuted ? "Ativar som" : "Mutar"}
        className={`group relative flex items-center h-11 rounded-full border backdrop-blur-md transition-all duration-500 ease-out overflow-hidden cursor-pointer ${
          isExpanded
            ? "w-auto max-w-95 pl-0 pr-4 bg-[#12131a]/90 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
            : "w-11 h-11 max-w-11 justify-center px-0 bg-[#12131a]/75 border-white/15 hover:border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
        }`}
      >
        <div className="w-11 h-11 shrink-0 flex items-center justify-center text-white">
          {isMuted ? (
            <IoVolumeMuteOutline className="w-5 h-5 text-white/50" />
          ) : (
            <IoVolumeHighOutline className="w-5 h-5 text-white" />
          )}
        </div>

        {isExpanded && (
          <div className="flex items-center gap-2 pl-0 pr-1 whitespace-nowrap text-amber-300">
            <div className="flex items-center justify-center p-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 shrink-0">
              <FiShieldOff className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <span className="text-xs sm:text-sm font-mono font-medium tracking-wide">
              {t("ADBLOCK_NOTICE", "Desative o AdBlock para ouvir!")}
            </span>
          </div>
        )}
      </button>
    </div>
  );
};
