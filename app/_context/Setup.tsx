"use client";
import React, { createContext, useState, useEffect } from "react";
import useLocalStorage from "../_hook/useLocalStorage";
import { initialSetup } from "../_shared/constants";
import { type InitialSetup } from "../_shared/types";

interface SetupContextProps {
  setup: InitialSetup;
  setSetup: React.Dispatch<React.SetStateAction<InitialSetup>>;
}

export const SetupContext = createContext<SetupContextProps | null>(null);

export const SetupProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [setup, setSetup] = useLocalStorage("setup", initialSetup);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <SetupContext.Provider value={{ setup, setSetup }}>
      {children}
    </SetupContext.Provider>
  );
};
