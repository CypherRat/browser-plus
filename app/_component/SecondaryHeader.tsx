"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { APP_DETAILS } from "../_shared/constants";

const SecondaryHeader = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <header className="md:w-1/2 bg-opacity-40 z-[1100] w-full backdrop-blur-sm mx-auto flex items-center justify-between gap-2 p-4 sticky top-0 md:relative">
      <div
        onClick={goBack}
        className="bg-transparent cursor-pointer text-secondary-text"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span className="ml-2">Go Back</span>
      </div>
      <span className="text-sm text-secondary">
        {`${APP_DETAILS.stage} v${APP_DETAILS.version}`}
      </span>
    </header>
  );
};

export default SecondaryHeader;
