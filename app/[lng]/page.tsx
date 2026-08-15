"use client";

import { AudioProvider } from "../components/AudioContext";
import { BedProvider } from "../components/bed/BedContext";
import { ComputerProvider } from "../components/computer/ComputerContext";
import { ResponsiveSwitcher } from "../components/ResponsiveSwitcher";

export default function Home() {
  return (
    <AudioProvider>
      <BedProvider>
        <ComputerProvider>
          <ResponsiveSwitcher />
        </ComputerProvider>
      </BedProvider>
    </AudioProvider>
  );
}


