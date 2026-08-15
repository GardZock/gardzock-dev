"use client";

import { createContext, useContext, useState } from "react";

type ComputerCtxValue = {
  isComputerLocked: boolean;
  setIsComputerLocked: (locked: boolean) => void;
};

const ComputerCtx = createContext<ComputerCtxValue>({
  isComputerLocked: true,
  setIsComputerLocked: () => {},
});

export const ComputerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isComputerLocked, setIsComputerLocked] = useState(true);
  return (
    <ComputerCtx.Provider value={{ isComputerLocked, setIsComputerLocked }}>
      {children}
    </ComputerCtx.Provider>
  );
};

export const useComputer = () => useContext(ComputerCtx);
