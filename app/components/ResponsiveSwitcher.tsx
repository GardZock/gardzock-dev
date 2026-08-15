"use client";

import { useEffect, useState } from "react";
import { Desktop3DView } from "./desktop/Desktop3DView";
import { Mobile2DView } from "./mobile/Mobile2DView";

export function ResponsiveSwitcher() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) {
    return (
      <div className="w-screen h-screen bg-[#101013] flex items-center justify-center text-green-400 font-mono">
        Loading...
      </div>
    );
  }

  if (isMobile) {
    return <Mobile2DView />;
  }

  return <Desktop3DView />;
}
