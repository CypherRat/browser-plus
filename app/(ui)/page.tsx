"use client";
import { useContext, useEffect, useState } from "react";
import { DisplayNameContext } from "../_context/DisplayName";
import toast from "react-hot-toast";
import Link from "next/link";
import { SettingsContext } from "../_context/Settings";
import { InitialSetupDialog } from "./settings/_utils";
import { SetupContext } from "../_context/Setup";

export default function Home() {
  const { displayName } = useContext(DisplayNameContext)!;
  const { settings } = useContext(SettingsContext)!;
  const { setup } = useContext(SetupContext)!;
  const [initialSetupOpen, setInitialSetupOpen] = useState<boolean>(false);

  const appearToast = () => {
    toast.success("Hello Darkness!");
  };

  useEffect(() => {
    if (setup?.isFirstTime) {
      setInitialSetupOpen(true);
    }
    return () => setInitialSetupOpen(false);
  }, [setup?.isFirstTime]);

  return (
    <section className="p-4">
      <h1 className="text-lg">Welcome {displayName?.val ?? "Pal"}!</h1>
      {/* <div className="btn" onClick={appearToast}>
        Open toast
      </div> */}
      <Link href="/settings">Go to Settings</Link>
      <InitialSetupDialog
        isOpen={initialSetupOpen}
        setIsOpen={setInitialSetupOpen}
      />
    </section>
  );
}
