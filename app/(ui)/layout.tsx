"use client";
import React, { useContext, useEffect, useState } from "react";
import DisplayNameModal from "../_component/DisplayNameModal";
import { DisplayNameContext } from "../_context/DisplayName";

export default function UILayout({ children }: { children: React.ReactNode }) {
  const { displayName } = useContext(DisplayNameContext)!;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  if (!displayName || !displayName.isNameAvailable) {
    return <DisplayNameModal />;
  }

  return isHydrated && <main>{children}</main>;
}
