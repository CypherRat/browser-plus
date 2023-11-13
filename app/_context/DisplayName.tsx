"use client";
import React, { createContext, useState, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";

interface DisplayNameContextProps {
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
}

export const DisplayNameContext = createContext<DisplayNameContextProps | null>(
  null
);

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    }
  }, [key, initialValue]);

  const setValue = (value: any) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

export const DisplayNameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [displayName, _setDisplayName] = useState("");
  // const initialDisplayName = parseCookies().displayName || "";
  // const [displayName, _setDisplayName] = useState(initialDisplayName);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // const storedDisplayName =
    //   typeof window !== "undefined" ? localStorage.getItem("displayName") : "";
    const initialDisplayName = parseCookies().displayName || "";
    if (initialDisplayName) {
      _setDisplayName(initialDisplayName);
    }
  }, []);

  const setDisplayName: React.Dispatch<React.SetStateAction<string>> = (
    value
  ) => {
    if (typeof value === "function") {
      const newValue = value(displayName);
      setCookie(null, "displayName", newValue, { path: "/" });
      _setDisplayName(newValue);
    } else {
      setCookie(null, "displayName", value, { path: "/" });
      _setDisplayName(value);
    }
  };

  if (!isClient) return null;

  return (
    <DisplayNameContext.Provider value={{ displayName, setDisplayName }}>
      {children}
    </DisplayNameContext.Provider>
  );
};
