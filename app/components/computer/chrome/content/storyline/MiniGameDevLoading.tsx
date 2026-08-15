import React from "react";
import { useT } from "next-i18next/client";

export default function MiniGameDevLoading() {
  const { t } = useT("portfolio");

  return (
    <div className="w-full h-full rounded border border-border-subtle bg-black text-white font-mono text-sm sm:text-xl p-3 sm:p-4 flex flex-col items-center justify-between shadow-lg select-none">

      <div className="flex flex-col items-center justify-center my-auto space-y-3 sm:space-y-4">
        <div className="relative w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-30 sm:h-30 bg-white rotate-15 flex items-center justify-center relative shadow-md">
            <div className="w-5 h-5 sm:w-8 sm:h-8 bg-black" />
          </div>
        </div>

        <div className="text-center">
          <div className="font-bold text-2xl sm:text-4xl tracking-wide">
            Roblox Studio
          </div>
          <div className="hidden sm:flex text-accent text-lg mt-1.5 h-3 items-center justify-center gap-1">
            <span className="w-1 h-1 bg-accent rounded-full animate-ping" />
            <span>{t("MINI_GAME_DEV.SYNC_SCRIPTS")}</span>
          </div>
        </div>
      </div>

      <div className="w-full space-y-1.5 sm:space-y-2">
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-accent animate-[pulse_1.5s_infinite]" />
        </div>

        <div className="flex justify-between items-center pt-1.5 border-t border-zinc-900">
          <div className="font-sans font-black tracking-wider text-sm sm:text-xl text-white">
            ROBLOX
          </div>

          <button className="px-2 py-0.5 rounded border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-xs sm:text-xl cursor-default">
            {t("MINI_GAME_DEV.CANCEL")}
          </button>
        </div>
      </div>
    </div>
  );
}
