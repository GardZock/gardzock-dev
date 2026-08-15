import { FaDiscord, FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { useT } from "next-i18next/client";

export default function UserStats() {
  const { t } = useT("portfolio");
  const avatarColors = [
    "bg-zinc-800",
    "bg-slate-700",
    "bg-[#1e1f22]",
  ];

  return (
    <div className="flex flex-col items-center gap-3 p-2 sm:p-4 rounded-lg bg-transparent w-full">
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-nowrap w-full">
        <div className="flex items-center shrink-0">
          {avatarColors.map((bgColor, index) => (
            <div
              key={index}
              className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white border-2 sm:border-[3px] border-[#0c0d12] ${bgColor} ${
                index !== 0 ? "-ml-2.5 sm:-ml-4" : ""
              } relative`}
              style={{ zIndex: index + 1 }}
            >
              <FaDiscord className="text-xs sm:text-lg" />
            </div>
          ))}

          <div
            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 sm:border-[3px] border-[#0c0d12] bg-[#57F287] text-black font-extrabold text-[8px] sm:text-[10px] -ml-2.5 sm:-ml-4 relative"
            style={{ zIndex: avatarColors.length + 1 }}
          >
            200K
          </div>
        </div>

        <div className="flex flex-row items-center gap-1.5 flex-nowrap shrink-0">
          <div className="flex gap-0.5 sm:gap-1 text-[#FBBF24]">
            <FaStar className="text-[10px] sm:text-base" />
            <FaStar className="text-[10px] sm:text-base" />
            <FaStar className="text-[10px] sm:text-base" />
            <FaStar className="text-[10px] sm:text-base" />
            <FaStar className="text-[10px] sm:text-base" />
          </div>

          <span className="text-[#8a8d9f] text-[9px] sm:text-sm font-bold tracking-wide whitespace-nowrap">
            {t("MINI_DISCLOUD.USERS_COUNT")}
          </span>
        </div>
      </div>

      <button className="flex items-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-[#2b2d31] hover:bg-[#383a40] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors border border-white/5 cursor-pointer">
        {t("MINI_DISCLOUD.START_FREE")}
        <FiArrowRight className="text-[#FBBF24] text-xs sm:text-lg" />
      </button>
    </div>
  );
}
