"use client";
import React, { createContext, useState, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import useLocalStorage from "../_hook/useLocalStorage";
import { initialDisplayName } from "../_shared/constants";

interface DisplayNameContextProps {
  displayName: any;
  setDisplayName: React.Dispatch<React.SetStateAction<any>>;
}

export const DisplayNameContext = createContext<DisplayNameContextProps | null>(
  null
);

export const DisplayNameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);
  // const [displayName, _setDisplayName] = useState("");
  const [displayName, setDisplayName] = useLocalStorage(
    "displayName",
    initialDisplayName
  );
  // const initialDisplayName = parseCookies().displayName || "";
  // const [displayName, _setDisplayName] = useState(initialDisplayName);

  useEffect(() => {
    setIsClient(true);
    // const storedDisplayName =
    //   typeof window !== "undefined" ? localStorage.getItem("displayName") : "";
    // if (storedDisplayName) setDisplayName(storedDisplayName);
    // const initialDisplayName = parseCookies().displayName || "";
    // if (initialDisplayName) {
    //   _setDisplayName(initialDisplayName);
    // }
  }, []);

  // const setDisplayName: React.Dispatch<React.SetStateAction<string>> = (
  //   value
  // ) => {
  //   if (typeof value === "function") {
  //     const newValue = value(displayName);
  //     setCookie(null, "displayName", newValue, { path: "/" });
  //     _setDisplayName(newValue);
  //   } else {
  //     setCookie(null, "displayName", value, { path: "/" });
  //     _setDisplayName(value);
  //   }
  // };

  if (!isClient) return null;

  return (
    <DisplayNameContext.Provider value={{ displayName, setDisplayName }}>
      {children}
    </DisplayNameContext.Provider>
  );
};
