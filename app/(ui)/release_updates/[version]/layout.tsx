"use client";
import { useEffect, useState } from "react";
import { isValidAppVersion } from "@/app/_shared/utils";
import { AppVersion } from "@/app/_shared/types";
import FallbackMsgComponent from "@/app/_component/FallbackMsg";

export default function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { [key: string]: string };
}) {
  const { version } = params;
  const [versionError, setVersionError] = useState<Boolean>(false);
  useEffect(() => {
    if (!isValidAppVersion(version as AppVersion)) {
      setVersionError(true);
    }
  }, [version]);
  return versionError ? (
    <FallbackMsgComponent message="Provided version is invalid." />
  ) : (
    children
  );
}
