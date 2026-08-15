"use client";

import React, { RefObject } from "react";
import { Tabs } from "./chrome/Tabs";
import { Header } from "./chrome/content/Header";
import Storyline from "./chrome/content/Storyline";
import { ContactSection } from "./chrome/content/ContactSection";
import { useT } from "next-i18next/client";

import { GoHome, GoDiamond } from "react-icons/go";
import { IoReload } from "react-icons/io5";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { VscSettings } from "react-icons/vsc";
import { AiOutlineSend } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { RiMenuLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

import Image from "next/image";

interface ComputerWebContentProps {
  is3D?: boolean;
  onClose?: (e?: React.MouseEvent) => void;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
  onWheel?: (e: React.WheelEvent<HTMLDivElement>) => void;
  pulsed?: boolean;
  milestone?: number;
}

export const ComputerWebContent: React.FC<ComputerWebContentProps> = ({
  is3D = false,
  onClose,
  scrollContainerRef,
  onWheel,
  pulsed = false,
  milestone = 0,
}) => {
  const { t } = useT("portfolio");

  const tabs = [
    {
      name: t("NAV.TAB_NAME"),
      iconPath: "/favicon.ico",
    },
  ];

  if (is3D) {
    return (
      <div className="flex flex-col w-[2165px] h-309 overflow-hidden bg-white">
        <div className="flex w-full bg-[#2F343F] gap-5">
          <Tabs tabs={tabs} />
          <div className="flex items-center px-5 gap-3">
            <div className="p-1 rounded-full text-white hover:bg-white hover:text-black transition">
              <MdKeyboardArrowDown size={30} />
            </div>
            <div className="p-2 rounded-full text-white hover:bg-white hover:text-black transition">
              <GoDiamond size={30} />
            </div>
            <div
              className="p-1 rounded-full bg-white hover:bg-red-400 transition cursor-pointer"
              onClick={onClose}
            >
              <IoMdClose size={35} />
            </div>
          </div>
        </div>

        <div className="flex py-8 px-4 text-3xl text-[#D3DAE3] bg-[#101013] w-full gap-5 items-center">
          <div className="flex items-center gap-5">
            <div className="hover:bg-[#232326] p-2 rounded-full">
              <SlArrowLeft size={35} />
            </div>
            <div>
              <SlArrowRight color="gray" size={35} />
            </div>
            <div className="hover:bg-[#232326] p-2 rounded-full">
              <IoReload color="royalblue" size={35} />
            </div>
            <div className="hover:bg-[#232326] p-2 rounded-full">
              <GoHome color="royalblue" size={35} />
            </div>
          </div>

          <div className="flex hover:bg-[#202124] w-full rounded-full h-full items-center p-2 justify-between">
            <div className="flex items-center gap-3">
              <VscSettings
                className="bg-[#101013] p-2 rounded-full hover:bg-[#1b1b1d]"
                size={45}
              />
              <p>
                <span className="text-[#798177]">https://</span>
                www.gardzock.dev
              </p>
            </div>
            <div className="flex items-center gap-3 px-3 text-[#9EA3AA]">
              <div className="hover:bg-[#1b1b1d] p-2 rounded-full">
                <AiOutlineSend size={35} />
              </div>
              <div className="hover:bg-[#1b1b1d] p-2 rounded-full">
                <CiBookmark size={35} />
              </div>
            </div>
          </div>

          <div className="hover:bg-[#232326] p-2 rounded-full">
            <RiMenuLine color="royalblue" size={35} />
          </div>
        </div>

        <div
          className="flex-1 min-h-0 overflow-y-auto scrollbar-none"
          ref={scrollContainerRef}
          onWheel={onWheel}
        >
          <Header />
          <div className="w-full bg-green-400 h-px"></div>
          <Storyline />
          <ContactSection />

          <div className="bg-[#0a0f0c] border-t border-green-500/20 text-3xl text-center py-14 px-8 flex flex-col items-center gap-8">
            <p
              className={`font-extrabold leading-snug bg-clip-text text-transparent
                bg-[linear-gradient(to_right,#818cf8,#e0e7ff,#38bdf8,#818cf8)]
                transition-transform duration-150
                ${pulsed ? "scale-[1.04]" : ""}`}
            >
              {t("EOF_HINT.LINE1")}
              <br />
              {t("EOF_HINT.LINE2")}
              <br />
              {t("EOF_HINT.LINE3")}
              <br />
              {t("EOF_HINT.LINE4")}
            </p>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i < milestone
                      ? "w-2 h-2 bg-green-400 shadow-[0_0_6px_#39FF88]"
                      : "w-1.5 h-1.5 bg-green-900/60"
                  }`}
                />
              ))}
            </div>

            <svg
              className="hint-float w-6 h-6 text-green-400/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m0 0l-5-5m5 5l5-5"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#101013] text-white overflow-x-hidden selection:bg-green-500/30 selection:text-green-300">
      <div className="sticky top-0 z-50 flex flex-col w-full bg-[#101013] shadow-md border-b border-white/10">
        <div className="flex items-center justify-between px-2 pt-2 bg-[#2F343F] text-xs">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2 bg-[#101013] px-3 py-1.5 rounded-t-lg text-[#D3DAE3] font-medium max-w-45 sm:max-w-55">
              <Image src="/favicon.ico" alt="icon" width={14} height={14} className="w-3.5 h-3.5 rounded-full" />
              <span className="truncate text-xs">{t("NAV.TAB_NAME")}</span>
              <div className="hover:bg-[#232326] p-0.5 rounded-full text-gray-400 ml-auto">
                <IoMdClose size={12} />
              </div>
            </div>
            <div className="text-gray-400 px-2 py-1 hover:bg-white/5 rounded text-sm font-light cursor-pointer">
              +
            </div>
          </div>

          <div className="flex items-center gap-2 px-2 text-gray-400">
            <div className="p-1 hover:bg-white/10 rounded-full cursor-pointer">
              <MdKeyboardArrowDown size={16} />
            </div>
            <div className="p-1 hover:bg-white/10 rounded-full cursor-pointer">
              <GoDiamond size={14} />
            </div>
            <div className="p-1 hover:bg-red-500/80 hover:text-white rounded-full cursor-pointer">
              <IoMdClose size={14} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2 gap-2 text-xs text-[#D3DAE3] bg-[#101013]">
          <div className="flex items-center gap-3">
            <div className="p-1 hover:bg-[#232326] rounded-full cursor-pointer text-gray-300">
              <SlArrowLeft size={14} />
            </div>
            <div className="p-1 text-gray-600">
              <SlArrowRight size={14} />
            </div>
            <div className="p-1 hover:bg-[#232326] rounded-full cursor-pointer text-blue-400">
              <IoReload size={14} />
            </div>
            <div className="p-1 hover:bg-[#232326] rounded-full cursor-pointer text-blue-400 hidden xs:block">
              <GoHome size={14} />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-between bg-[#1b1b1d] hover:bg-[#202124] rounded-full px-3 py-1.5 border border-white/5 transition-colors">
            <div className="flex items-center gap-2 truncate">
              <VscSettings className="bg-[#101013] p-1 rounded-full text-gray-400 shrink-0" size={20} />
              <p className="truncate text-xs">
                <span className="text-[#798177]">https://</span>
                <span className="text-white font-medium">www.gardzock.dev</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#9EA3AA] shrink-0">
              <AiOutlineSend size={14} className="hover:text-white cursor-pointer" />
              <CiBookmark size={14} className="hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="p-1 hover:bg-[#232326] rounded-full cursor-pointer text-blue-400">
            <RiMenuLine size={16} />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center">
        <Header />
        <div className="w-full bg-green-400 h-px"></div>
        <Storyline />
        <ContactSection />
      </div>
    </div>
  );
};
