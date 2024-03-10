"use client";
import { useContext } from "react";
import { DisplayNameContext } from "../_context/DisplayName";
import toast from "react-hot-toast";
import Link from "next/link";
import { SettingsContext } from "../_context/Settings";

export default function Home() {
  const { displayName } = useContext(DisplayNameContext)!;
  const { settings } = useContext(SettingsContext)!;
  console.log(displayName, "ad");

  const appearToast = () => {
    toast.success("Hello Darkness!");
  };
  return (
    <section className="p-4">
      <h1 className="text-lg">Welcome {displayName?.val ?? "Pal"}!</h1>
      {/* <div className="btn" onClick={appearToast}>
        Open toast
      </div> */}
      <Link href="/settings" shallow>
        Go to Settings
      </Link>
    </section>
  );
}
