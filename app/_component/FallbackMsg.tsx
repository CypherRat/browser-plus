"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { APP_DETAILS } from "../_shared/constants";

interface ErrorProps {
  message?: string;
  icon?: IconDefinition;
  showErrorIcon?: boolean;
}

const FallbackMsgComponent: React.FC<ErrorProps> = ({
  message,
  icon,
  showErrorIcon = false,
}) => {
  const router = useRouter();
  const goToHome = () => {
    router.back();
  };

  return (
    <div className="flex flex-col sm:gap-10 bg-accent-2 items-center justify-between sm:justify-center min-h-full min-h-screen transition-all motion-reduce:transition-none">
      <span className="text-4xl flex items-center grow sm:grow-0 transition-all motion-reduce:transition-none">
        {APP_DETAILS.name}
      </span>
      <div className="bg-primary-bg flex flex-col sticky bottom-0 w-full sm:w-auto sm:max-w-screen-sm items-center justify-center gap-4 text-primary-text p-8 rounded-t-lg sm:rounded-md sm:shadow-sm">
        <div
          className={`flex items-center gap-2 ${
            !showErrorIcon && "text-center"
          } justify-center`}
        >
          {showErrorIcon && (
            <FontAwesomeIcon
              icon={icon || faExclamationCircle}
              className="text-secondary-text"
            />
          )}
          <p>{message || "Something Went Wrong."}</p>
        </div>
        <Button onClick={goToHome}>Go back</Button>
      </div>
    </div>
  );
};

export default FallbackMsgComponent;
