"use client";

import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import { FiMail, FiCopy, FiCheck, FiArrowUpRight } from "react-icons/fi";
import { useT } from "next-i18next/client";

export const ContactSection = () => {
  const { t } = useT("portfolio");
  const [copied, setCopied] = useState(false);

  const email = "gardzock.contato@gmail.com";

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Could not copy email to clipboard:", err);
    }
  };

  const contactLinks = [
    {
      name: "LinkedIn",
      handle: "/in/miguel-turco",
      url: "https://www.linkedin.com/in/miguel-turco/",
      desc: t("CONTACT.LINKEDIN_DESC"),
      icon: FaLinkedin,
      badgeColor: "bg-[#0A66C2]/20 text-[#38BDF8] border-[#0A66C2]/40",
      accentGlow: "group-hover:shadow-[0_0_25px_rgba(10,102,194,0.4)]",
      borderColor: "group-hover:border-[#0A66C2]/60",
      iconColor: "text-[#38BDF8]",
      btnBg: "bg-[#0A66C2]/15 hover:bg-[#0A66C2]/30 text-[#38BDF8]",
    },
    {
      name: "GitHub",
      handle: "@GardZock",
      url: "https://github.com/GardZock",
      desc: t("CONTACT.GITHUB_DESC"),
      icon: FaGithub,
      badgeColor: "bg-white/10 text-white border-white/20",
      accentGlow: "group-hover:shadow-[0_0_25px_rgba(57,255,136,0.3)]",
      borderColor: "group-hover:border-green-500/50",
      iconColor: "text-white",
      btnBg: "bg-white/10 hover:bg-white/20 text-white",
    },
    {
      name: "Instagram",
      handle: "@gardzock",
      url: "https://www.instagram.com/gardzock",
      desc: t("CONTACT.INSTAGRAM_DESC"),
      icon: FaInstagram,
      badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/40",
      accentGlow: "group-hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]",
      borderColor: "group-hover:border-pink-500/60",
      iconColor: "text-pink-400",
      btnBg: "bg-pink-500/15 hover:bg-pink-500/30 text-pink-300",
    },
  ];

  return (
    <section className="w-full bg-[#0a0a0d] border-t border-white/10 py-16 px-6 sm:px-12 lg:px-20 text-white selection:bg-green-500/30">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-12">

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-gray-200 to-green-400 mb-4">
            {t("CONTACT.TITLE")}
          </h2>

          <p className="text-gray-400 text-base sm:text-xl max-w-2xl font-light">
            {t("CONTACT.SUBTITLE")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
          {contactLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#121318] border border-white/10 transition-all duration-300 hover:-translate-y-1 ${item.borderColor} ${item.accentGlow}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xs sm:text-sm font-mono text-gray-400">
                        {item.handle}
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${item.btnBg}`}>
                    <FiArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-400 font-light">
                  {item.desc}
                </p>
              </a>
            );
          })}

          <div className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-linear-to-br from-[#121815] to-[#0c1410] border border-green-500/30 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/60 hover:shadow-[0_0_30px_rgba(57,255,136,0.25)]">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 group-hover:scale-110 transition-transform duration-300">
                  <FiMail className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-green-300 transition-colors">
                    E-mail
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-green-400/80 truncate block max-w-50 sm:max-w-none">
                    {email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                title={t("CONTACT.CLICK_TO_COPY")}
                className="p-2.5 rounded-full bg-green-500/20 hover:bg-green-500/40 text-green-300 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              >
                {copied ? <FiCheck className="w-5 h-5 text-green-400 animate-bounce" /> : <FiCopy className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-sm sm:text-base text-gray-400 font-light">
                {t("CONTACT.EMAIL_DESC")}
              </p>

              {copied && (
                <span className="text-xs font-mono text-green-400 bg-green-950/80 border border-green-500/40 px-2.5 py-1 rounded-md animate-fade-in">
                  {t("CONTACT.COPIED")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
