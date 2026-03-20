"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalState {
  globalPremium: number;
  setGlobalPremium: (amount: number) => void;
  activePlan: string;
  setActivePlan: (plan: string) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalPremium, setGlobalPremium] = useState(89);
  const [activePlan, setActivePlan] = useState("Active Shield");

  return (
    <GlobalContext.Provider value={{ globalPremium, setGlobalPremium, activePlan, setActivePlan }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
};
