import React from "react";
import { FaJsSquare, FaRegWindowRestore } from "react-icons/fa";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { IoIosArrowDown, IoLogoHtml5, IoMdClose } from "react-icons/io";
import { MdMinimize, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { VscVscodeInsiders } from "react-icons/vsc";
import { useT } from "next-i18next/client";

export default function MiniVSCode() {
  const { t } = useT("portfolio");

  return (
    <div className="flex flex-col w-full min-h-full rounded border border-border-subtle bg-[#181818] text-[#cccccc] font-mono text-[10px] sm:text-xs overflow-hidden shadow-lg select-none">
      <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 bg-[#1e1e1e] border-b border-[#2b2b2b] text-[#858585]">
        <div className="flex justify-between items-center text-xs sm:text-xl gap-2 sm:gap-5 w-full">
          <div className="flex gap-1.5 sm:gap-2 items-center">
            <VscVscodeInsiders className="text-[#007acc] text-sm sm:text-xl" />
            <span className="hover:bg-[#272727] p-0.5 sm:p-1 rounded-md">{t("MINI_VSCODE.FILE")}</span>
            <span className="hover:bg-[#272727] p-0.5 sm:p-1 rounded-md">{t("MINI_VSCODE.EDIT")}</span>
            <span className="hover:bg-[#272727] p-0.5 sm:p-1 rounded-md">{t("MINI_VSCODE.TERMINAL")}</span>
          </div>
          <span className="py-0.5 w-full px-2 sm:px-5 text-xs sm:text-lg bg-[#2E3239] hover:bg-[#34383E] rounded-xl border border-[#41454d] mx-2 sm:mx-5 truncate text-center">
            Red Dragon
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-lg">
          <span className="hover:text-white cursor-pointer">
            <MdMinimize />
          </span>

          <span className="hover:text-white cursor-pointer">
            <FaRegWindowRestore />
          </span>

          <span className="hover:text-red-500 cursor-pointer">
            <IoMdClose />
          </span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="w-10 sm:w-12 bg-[#333333] flex flex-col items-center py-2 gap-2.5 sm:gap-3.5 border-r border-[#2b2b2b] text-[#858585]">
          <div className="text-white cursor-pointer hover:text-white">
            <svg
              className="w-5 h-5 sm:w-8 sm:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
          </div>

          <div className="cursor-pointer hover:text-white">
            <svg
              className="w-5 h-5 sm:w-8 sm:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="cursor-pointer hover:text-white">
            <svg
              className="w-5 h-5 sm:w-8 sm:h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>
        </div>

        <div className="hidden xs:flex w-28 sm:w-40 bg-[#252526] border-r border-[#2b2b2b] flex-col p-1.5 text-xs sm:text-base select-none">
          <div className="font-bold text-[#858585] uppercase mb-1.5 tracking-wide px-1 text-[9px] sm:text-xs">
            {t("MINI_VSCODE.EXPLORER")}
          </div>
          <div className="flex items-center gap-1 font-bold text-white px-1 py-0.5 text-xs sm:text-sm">
            <IoIosArrowDown /> <span>PORTFOLIO</span>
          </div>

          <div className="pl-1.5 space-y-0.5 mt-1 text-[#cccccc] text-[10px] sm:text-xs">
            <div className="flex items-center gap-1 text-[#858585] hover:text-[#cccccc]">
              <MdOutlineKeyboardArrowRight />
              <span className="text-[#cccccc]">assets</span>
            </div>
            <div className="flex items-center gap-1 text-[#858585] hover:text-[#cccccc]">
              <MdOutlineKeyboardArrowRight />
              <span className="text-[#cccccc]">css</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 bg-[#37373d] text-white rounded-sm py-0.5">
              <IoLogoHtml5 className="text-orange-500" />
              <span>index.html</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 hover:bg-[#2a2d2e] py-0.5">
              <FaJsSquare className="text-yellow-500"/>
              <span>main.js</span>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#1e1e1e] flex flex-col min-w-0">
          <div className="flex bg-[#2d2d2d] border-b border-[#2b2b2b] text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 bg-[#1e1e1e] px-2 sm:px-3 py-1 border-t border-[#007acc] text-white">
              <IoLogoHtml5 className="text-orange-500" />
              <span>index.html</span>
              <span className="text-xs text-[#858585] hover:text-white cursor-pointer ml-1">
                <IoMdClose />
              </span>
            </div>
          </div>

          <div className="flex flex-1 p-2 overflow-hidden text-[10px] sm:text-base leading-relaxed">
            <div className="text-right text-[#858585] pr-2 border-r border-[#2b2b2b] flex flex-col select-none text-[10px] sm:text-xs">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
            </div>

            <div className="pl-2 flex flex-col text-[#9cdcfe] overflow-x-auto">
              <div>
                <span className="text-[#808080]">&lt;</span>
                <span className="text-[#569cd6]">div</span>{" "}
                <span className="text-[#9cdcfe]">id</span>=
                <span className="text-[#ce9178]">&quot;root&quot;</span>
                <span className="text-[#808080]">&gt;</span>
              </div>
              <div className="pl-2 sm:pl-3">
                <span className="text-[#808080]">&lt;</span>
                <span className="text-[#569cd6]">h1</span>
                <span className="text-[#808080]">&gt;</span>
                <span className="text-white">Hello World</span>
                <span className="text-[#808080]">&lt;/</span>
                <span className="text-[#569cd6]">h1</span>
                <span className="text-[#808080]">&gt;</span>
              </div>
              <div className="pl-2 sm:pl-3">
                <span className="text-[#808080]">&lt;</span>
                <span className="text-[#569cd6]">p</span>
                <span className="text-[#808080]">&gt;</span>
                <span className="text-white">{t("MINI_VSCODE.FIRST_LINES")}</span>
                <span className="text-[#808080]">&lt;/</span>
                <span className="text-[#569cd6]">p</span>
                <span className="text-[#808080]">&gt;</span>
              </div>
              <div className="pl-2 sm:pl-3">
                <span className="text-[#808080]">&lt;</span>
                <span className="text-[#569cd6]">script</span>{" "}
                <span className="text-[#9cdcfe]">src</span>=
                <span className="text-[#ce9178]">&quot;main.js&quot;</span>
                <span className="text-[#808080]">&gt;</span>
                <span className="text-[#808080]">&lt;/</span>
                <span className="text-[#569cd6]">script</span>
                <span className="text-[#808080]">&gt;</span>
              </div>
              <div>
                <span className="text-[#808080]">&lt;/</span>
                <span className="text-[#569cd6]">div</span>
                <span className="text-[#808080]">&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#007acc] text-white flex items-center justify-between px-2 py-0.5 text-[9px] sm:text-xs">
        <div className="flex items-center gap-1 sm:gap-2">
          <HiOutlineCog8Tooth size={14} className="sm:w-5 sm:h-5" />
        </div>
        <div>
          <span>UTF-8</span>
          <span className="ml-2">HTML</span>
        </div>
      </div>
    </div>
  );
}
