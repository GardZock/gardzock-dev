"use client";

import { ComputerWebContent } from "../computer/ComputerWebContent";

export function Mobile2DView() {
  return (
    <main className="w-full min-h-screen relative bg-[#101013]">
      <ComputerWebContent is3D={false} />
    </main>
  );
}

