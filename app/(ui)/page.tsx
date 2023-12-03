"use client";
import { useContext } from "react";
import { DisplayNameContext } from "../_context/DisplayName";
import toast from "react-hot-toast";

export default function Home() {
  const { displayName } = useContext(DisplayNameContext)!;
  console.log(displayName, "ad");

  const appearToast = () => {
    toast.success("Hello Darkness!");
  };
  return (
    <section>
      Welcome {displayName?.val ?? "Pal"}!
      <div className="btn" onClick={appearToast}>
        Open toast
      </div>
    </section>
  );
}
