"use client";

import { createContext, useContext, useState } from "react";

type BedCtxValue = {
  isBedLocked: boolean;
  setIsBedLocked: (locked: boolean) => void;
};

const BedCtx = createContext<BedCtxValue>({
  isBedLocked: false,
  setIsBedLocked: () => {},
});

export const BedProvider = ({ children }: { children: React.ReactNode }) => {
  const [isBedLocked, setIsBedLocked] = useState(false);
  return (
    <BedCtx.Provider value={{ isBedLocked, setIsBedLocked }}>
      {children}
    </BedCtx.Provider>
  );
};

export const useBed = () => useContext(BedCtx);
