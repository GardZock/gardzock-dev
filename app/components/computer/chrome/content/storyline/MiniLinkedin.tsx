import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaBriefcase, FaHome, FaLinkedin, FaSearch } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { useT } from "next-i18next/client";

export default function MiniDevNetwork() {
  const { t } = useT("portfolio");

  return (
    <div className="w-full h-full rounded-lg border border-border-subtle bg-[#1b222b] text-[#eef3f8] font-sans text-[10px] sm:text-xs overflow-hidden shadow-lg select-none">
      <div className="w-full bg-[#0b1016] border-b border-[#2d3846] px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 w-1/2">
          <FaLinkedin className="text-2xl sm:text-4xl text-[#0a66c2]" />
          <div className="hidden sm:flex w-full rounded-full bg-[#202b38] border border-[#2d3846] p-2 text-sm xl:text-xl text-[#8695a4] hover:bg-[#2b3847] leading-4 truncate gap-3">
            <span>
              <FaSearch />
            </span>
            <span>{t("MINI_LINKEDIN.SEARCH")}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-[#8695a4] text-[9px] sm:text-xs font-medium">
          <div className="flex flex-col items-center hover:text-white">
            <FaHome className="text-base sm:text-xl" />
            <span className="hidden sm:inline">{t("MINI_LINKEDIN.HOME")}</span>
          </div>
          <div className="flex flex-col items-center hover:text-white">
            <IoPeopleSharp className="text-base sm:text-xl" />
            <span className="hidden sm:inline">{t("MINI_LINKEDIN.MY_NETWORK")}</span>
          </div>
          <div className="flex flex-col items-center hover:text-white">
            <FaBriefcase className="text-base sm:text-xl" />
            <span className="hidden sm:inline">{t("MINI_LINKEDIN.JOBS")}</span>
          </div>
          <div className="flex flex-col items-center hover:text-white">
            <AiFillMessage className="text-base sm:text-xl" />
            <span className="hidden sm:inline">{t("MINI_LINKEDIN.MESSAGES")}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative w-full h-20 sm:h-30 bg-linear-to-r from-blue-700 via-indigo-800 to-purple-900 overflow-hidden select-none">
          <Image
            src="/assets/icons/linkedin_banner.webp"
            alt="Banner Miguel"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>

        <div className="absolute top-10 sm:top-8 left-3">
          <div className="relative w-16 h-16 sm:w-32 sm:h-32 rounded-full border-2 border-[#1b222b] bg-[#2d3846] overflow-hidden">
            <Image
              src="/assets/icons/linkedin_pfp.webp"
              alt="Profile Photo Miguel"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="pt-8 sm:pt-14 px-3 pb-3">
          <div className="flex justify-between items-start gap-2 w-full">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-base sm:text-3xl text-white truncate">
                  Miguel Turco
                </span>
              </div>

              <div className="text-[10px] sm:text-lg text-[#8695a4] leading-tight max-w-full sm:max-w-92 mt-1">
                {t("MINI_LINKEDIN.HEADLINE")}
              </div>

              <div className="text-[10px] sm:text-xl text-[#8695a4] mt-1 flex items-center gap-1 flex-wrap">
                <span>{t("MINI_LINKEDIN.LOCATION")}</span>
                <GoDotFill size={8} />
                <span className="text-[#1976d3] font-semibold cursor-pointer">
                  {t("MINI_LINKEDIN.CONTACT_INFO")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 max-w-30 sm:max-w-none">
              <Image
                src="/assets/icons/utfpr_logo.webp"
                alt="Logo UTFPR"
                width={20}
                height={20}
                className="rounded sm:w-10 sm:h-10 shrink-0"
              />
              <span className="text-[9px] sm:text-base text-white leading-tight font-bold font-sans">
                {t("MINI_LINKEDIN.UNIVERSITY")}
              </span>
            </div>
          </div>

          <div className="text-xs sm:text-xl text-[#1976d3] font-semibold mt-1">
            {t("MINI_LINKEDIN.CONNECTIONS")}
          </div>

          <div className="flex items-center gap-1.5 mt-2 font-sans text-xs sm:text-xl">
            <button className="px-2.5 py-1 rounded-full bg-[#0a66c2] text-white font-bold hover:bg-[#004182] transition-all cursor-pointer">
              {t("MINI_LINKEDIN.OPEN_TO")}
            </button>
            <button className="px-2.5 py-1 rounded-full border border-[#8695a4] hover:bg-[#202b38] text-[#8695a4] hover:text-white transition-all cursor-pointer">
              {t("MINI_LINKEDIN.MESSAGE")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
