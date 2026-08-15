import React from "react";
import { IoLogoHtml5 } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { useT } from "next-i18next/client";

export default function MiniLiveServer() {
  const { t } = useT("portfolio");

  return (
    <div className="w-full h-full rounded border border-border-subtle bg-bg-main text-white font-mono text-[9px] overflow-hidden shadow-lg select-none">
      <div className="grid grid-cols-2 h-full">
        <div className="bg-[#1e1e1e] border-r border-border-subtle flex flex-col h-full overflow-hidden">
          <div className="bg-[#2d2d2d] border-b border-[#2b2b2b] px-2 py-1 text-xs sm:text-lg flex items-center gap-1.5 text-[#cccccc]">
            <IoLogoHtml5 className="text-orange-500" />

            <span>index.html</span>
          </div>
          <div className="p-2 flex-1 flex flex-col font-mono text-xs sm:text-base text-[#9cdcfe] leading-normal">
            <div>
              <span className="text-[#808080]">&lt;</span>
              <span className="text-[#569cd6]">body</span>
              <span className="text-[#808080]">&gt;</span>
            </div>
            <div className="pl-2">
              <span className="text-[#808080]">&lt;</span>
              <span className="text-[#569cd6]">h1</span>
              <span className="text-[#808080]">&gt;</span>
              <span className="text-white">Hello World</span>
              <span className="text-[#808080]">&lt;/</span>
              <span className="text-[#569cd6]">h1</span>
              <span className="text-[#808080]">&gt;</span>
            </div>
            <div>
              <span className="text-[#808080]">&lt;/</span>
              <span className="text-[#569cd6]">body</span>
              <span className="text-[#808080]">&gt;</span>
            </div>

            <div className="mt-auto pt-2 border-t border-border-subtle/30 flex items-center gap-1.5 text-xs sm:text-base text-accent font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              <span>{t("MINI_LIVE_SERVER.PORT")}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f0f0] text-black flex flex-col h-full overflow-hidden">
          <div className="bg-[#e0e0e0] border-b border-[#c0c0c0] p-1 flex items-center gap-1 text-xs sm:text-base">
            <div className="flex gap-0.5 mr-1 scale-75">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded px-1.5 py-0.5 border border-[#cccccc] text-[9px] sm:text-xs text-[#555555] truncate select-all">
              http://127.0.0.1:5500/index.html
            </div>
            <IoReload color="#666666" className="text-xs sm:text-base shrink-0" />
            
          </div>

          <div className="bg-white flex-1 p-2.5 sm:p-3 flex flex-col justify-start items-start font-sans">
            <h1 className="text-lg sm:text-3xl font-extrabold text-black tracking-tight select-text">
              Hello World
            </h1>
            <p className="text-xs sm:text-base text-gray-500 mt-1 select-text">
              {t("MINI_LIVE_SERVER.RENDERED_VIA")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
