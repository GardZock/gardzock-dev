import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { useT } from "next-i18next/client";

export default function MiniSaasDashboard() {
  const { t } = useT("portfolio");

  return (
    <div className="w-full h-auto rounded border border-border-subtle bg-bg-secondary text-white font-mono text-xs sm:text-base flex shadow-lg select-none">
      <div className="w-8 sm:w-12 bg-bg-main border-r border-border-subtle flex flex-col items-center py-2 gap-2 sm:gap-3 text-text-secondary select-none">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-accent/15 border border-accent/35 flex items-center justify-center text-accent font-bold text-xs sm:text-base">
          S
        </div>
        <div className="flex flex-col gap-2 mt-1 sm:mt-2 text-xs sm:text-base">
          <span className="text-accent cursor-default">
            <IoMdMenu />
          </span>

          <span className="hover:text-accent cursor-default">
            <IoPeopleSharp />
          </span>

          <span className="hover:text-accent cursor-default">
            <HiOutlineCog6Tooth />
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-2.5 sm:p-3 gap-2 sm:gap-2.5 overflow-hidden">
        <div className="flex justify-between items-center pb-1 border-b border-border-subtle/40">
          <div>
            <div className="font-extrabold text-white text-xs sm:text-lg">
              AMENS Console
            </div>
            <div className="text-[10px] sm:text-xs text-text-secondary">
              {t("MINI_SAAS.ACTIVE_PROJECT")}
            </div>
          </div>
          <span className="text-[9px] sm:text-xs px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-bold">
            v1.12.0
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-1.5 rounded border border-border-subtle/50 bg-surface/50">
            <div className="text-[9px] sm:text-xs text-text-secondary uppercase">{t("MINI_SAAS.CLIENTS")}</div>
            <div className="text-text-main font-bold text-xs sm:text-lg mt-0.5">
              {t("MINI_SAAS.ACTIVE_COUNT")}
            </div>
          </div>
          <div className="p-1.5 rounded border border-border-subtle/50 bg-surface/50">
            <div className="text-[9px] sm:text-xs text-text-secondary uppercase">{t("MINI_SAAS.HEALTH")}</div>
            <div className="text-accent font-bold text-xs sm:text-lg mt-0.5">99.98%</div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px] sm:text-xs text-text-secondary">
            <span>{t("MINI_SAAS.DEPLOY_PIPELINE")}</span>
            <span className="text-accent font-bold">88%</span>
          </div>
          <div className="w-full h-1 bg-bg-main rounded-full overflow-hidden border border-border-subtle/20">
            <div className="h-full bg-accent w-[88%]" />
          </div>
        </div>

        <div className="overflow-hidden border border-border-subtle/30 rounded">
          <div className="grid grid-cols-3 bg-surface text-text-secondary text-[9px] sm:text-xs font-bold p-1 border-b border-border-subtle/30">
            <span>{t("MINI_SAAS.DEPLOY")}</span>
            <span>{t("MINI_SAAS.STATUS")}</span>
            <span>{t("MINI_SAAS.LOAD")}</span>
          </div>
          <div className="p-1 grid grid-cols-3 text-[10px] sm:text-xs items-center text-text-main">
            <span className="truncate">api-gateway</span>
            <span className="text-accent">{t("MINI_SAAS.ACTIVE")}</span>
            <span>12%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
