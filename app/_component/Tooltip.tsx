import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface TooltipProps {
  title: string;
  children: React.ReactNode;
  color?: "light" | "dark";
  position?: "top" | "bottom" | "right" | "left";
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  color = "light",
  position = "right",
}) => {
  const baseClasses =
    "absolute hidden z-10 invisible opacity-0 group-hover:block group-hover:visible group-hover:opacity-95 group-focus:block group-focus:visible group-focus:opacity-95 rounded-md py-2 px-4 shadow h-auto w-auto max-w-max transition-opacity delay-200 ease-in-out";
  const colorClasses =
    color === "light" ? "bg-gray-50 text-gray-600" : "bg-gray-900 text-white";
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2",
    right: "left-full top-1/2 transform translate-x-2 -translate-y-1/2",
    left: "right-full top-1/2 transform -translate-x-2 -translate-y-1/2",
  }[position];
  const arrowClasses = {
    top: "bottom-0 left-1/2 transform translate-x-1/2 rotate-45",
    bottom: "top-0 left-1/2 transform -translate-x-1/2 rotate-45",
    right: "left-0 top-1/2 transform -translate-y-1/2 rotate-45",
    left: "right-0 top-1/2 transform -translate-y-1/2 rotate-45",
  }[position];

  return (
    <div className="relative group cursor-help inline-flex items-center">
      {children}
      <FontAwesomeIcon
        icon={faInfoCircle}
        className="ml-1 text-accent-1 dark:text-white"
      />
      <div
        className={`${baseClasses} ${colorClasses} ${positionClasses}`}
        role="tooltip"
        style={{ width: "max-content", maxWidth: "200px" }}
      >
        <span className="text-xs">{title}</span>
        <div
          className={`absolute -z-10 w-6 h-6 ${colorClasses} transform ${arrowClasses}`}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
