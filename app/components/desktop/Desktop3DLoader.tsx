"use client";

import React, { useEffect, useState } from "react";

interface Desktop3DLoaderProps {
  progress: number;
  isComplete: boolean;
  statusLog: string;
  fps: number;
  shouldReduceMotion: boolean;
}

export const Desktop3DLoader: React.FC<Desktop3DLoaderProps> = ({
  isComplete,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 select-none ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-accent border-r-transparent border-b-cyan-400 border-l-transparent animate-spin shadow-[0_0_12px_rgba(57,255,136,0.3)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#39FF88]" />
      </div>
    </div>
  );
};
