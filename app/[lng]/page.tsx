"use client";

import { AudioProvider } from "../components/AudioContext";
import { BedProvider } from "../components/bed/BedContext";
import { ResponsiveSwitcher } from "../components/ResponsiveSwitcher";

export default function Home() {
  return (
    <AudioProvider>
      <BedProvider>
        <ResponsiveSwitcher />
      </BedProvider>
    </AudioProvider>
  );
}


