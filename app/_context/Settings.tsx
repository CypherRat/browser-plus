"use client";
import React, { createContext, useState, useEffect } from "react";
import useLocalStorage from "../_hook/useLocalStorage";
import { initialSettings } from "../_shared/constants";

interface SettingsContextProps {
  settings: any;
  setSettings: React.Dispatch<React.SetStateAction<any>>;
}

export const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [settings, setSettings] = useLocalStorage("settings", initialSettings);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
