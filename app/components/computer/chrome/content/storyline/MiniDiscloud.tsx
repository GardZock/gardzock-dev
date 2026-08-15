import { TypeAnimation } from "react-type-animation";
import UserStats from "./Discloud/UserStats";
import { useT } from "next-i18next/client";

export default function MiniDiscloud() {
  const { t } = useT("portfolio");

  return (
    <div className="flex flex-col w-full h-full rounded-lg border border-border-subtle bg-[#0c0d12] text-white font-sans text-[10px] p-4 gap-5 shadow-lg select-none">
      <div className="flex items-center justify-between border-b border-[#1b1c26]/60 pb-3">
        <div className="flex items-center gap-1.5 font-mono">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 872 624"
            fill="none"
          >
            <path
              d="M871.849 0.00049407L736.042 130.875V0.529486L493.288 118.142C461.367 136.58 422.042 136.542 390.196 118.029L221.296 19.9113C175.851 -6.4978 119.752 -6.64906 74.1557 19.5333C28.5592 45.7157 0.377758 94.2267 0.226651 146.818L0 231.788V623.995L135.958 493.121V623.995L378.032 507.969C410.255 488.285 450.639 488.831 483.315 506.797L650.742 604.084C696.187 630.493 752.286 630.644 797.882 604.5C843.479 578.317 871.66 529.806 871.773 477.253L872 392.283L871.849 0.00049407ZM725.464 420.052C725.464 443.967 700.003 459.231 678.923 447.934L559.511 384.084C476.364 339.616 376.181 341.127 294.394 388.051L193.983 445.668C172.904 457.757 146.611 442.532 146.611 418.238V205.757C146.611 181.388 173.017 166.162 194.097 178.366L293.487 235.944C375.727 283.586 476.856 285.097 560.493 239.949L678.81 176.061C699.889 164.689 725.464 179.952 725.464 203.906V420.052Z"
              fill="#39FF88"
            />
          </svg>
          <span className="font-extrabold text-lg sm:text-2xl tracking-wider text-white">
            Discloud
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-text-secondary font-medium text-xl">
          <span className="hover:text-[#57F287]">{t("MINI_DISCLOUD.PLANS")}</span>
          <span className="hover:text-[#57F287]">{t("MINI_DISCLOUD.SERVICES")}</span>
          <span className="hover:text-[#57F287]">{t("MINI_DISCLOUD.TOOLS")}</span>
          <span className="hover:text-[#57F287]">{t("MINI_DISCLOUD.DOCS")}</span>
        </div>
        <div className="w-6 h-6 sm:w-7.5 sm:h-7.5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs sm:text-lg text-[#57F287] font-bold">
          GD
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center items-center text-center space-y-1.5">
        <h3 className="text-xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <TypeAnimation
            key={t("MINI_DISCLOUD.TYPEWRITER.SITE")}
            sequence={[
              t("MINI_DISCLOUD.TYPEWRITER.SITE"),
              7000,
              t("MINI_DISCLOUD.TYPEWRITER.DB"),
              7000,
              t("MINI_DISCLOUD.TYPEWRITER.BOT"),
              7000,
              t("MINI_DISCLOUD.TYPEWRITER.API"),
              7000,
            ]}
            speed={50}
            repeat={Infinity}
            className="text-white after:bg-linear-to-r after:from-[#57F287] after:to-tech-blue after:bg-clip-text after:text-transparent after:font-medium"
          />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-tech-blue to-[#57F287]">
            {t("MINI_DISCLOUD.ONLINE_NOW")}
          </span>
        </h3>

        <p className="text-[#8a8d9f] text-xs sm:text-lg max-w-full sm:max-w-xl">
          {t("MINI_DISCLOUD.SUBTITLE")}
        </p>

        <div>
          <UserStats />
        </div>
      </div>
    </div>
  );
}
