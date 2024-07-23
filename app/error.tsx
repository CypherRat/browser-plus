"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faBomb } from "@fortawesome/free-solid-svg-icons";
import { APP_DETAILS } from "./_shared/constants";
import Button from "./_component/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col sm:gap-10 bg-accent-2 items-center justify-between sm:justify-center h-screen transition-all motion-reduce:transition-none">
      <span className="text-4xl flex items-center grow sm:grow-0 transition-all motion-reduce:transition-none">
        {APP_DETAILS.name}
      </span>
      <div className="bg-primary-bg flex flex-col w-full sm:w-auto sm:max-w-screen-sm items-center justify-center gap-4 text-primary-text p-8 rounded-t-lg sm:rounded-md sm:shadow-sm">
        <FontAwesomeIcon icon={faBomb} className="mr-2 text-6xl fa-shake" />
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="mr-2 text-secondary-text"
          />
          <p>{error ? error.message : "Something Went Wrong!"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={reset}>Try again</Button>
          <span>or</span>
          <Button variant="success" onClick={goHome}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
