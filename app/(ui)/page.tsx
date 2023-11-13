"use client";
import { useContext } from "react";
import { DisplayNameContext } from "../_context/DisplayName";

export default function Home() {
  const { displayName } = useContext(DisplayNameContext)!;

  console.log(displayName, "ad");

  return <div>Home</div>;
}
