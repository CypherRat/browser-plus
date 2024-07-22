import { Metadata } from "next";
import Link from "next/link";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { getAllReleasesDataList } from "@/app/_lib/releases";
import FallbackMsgComponent from "@/app/_component/FallbackMsg";
import ReleaseList from "@/app/_component/ReleaseList";
import { APP_DETAILS } from "@/app/_shared/constants";
import { title } from "@/app/_shared/utils";

export const metadata: Metadata = {
  title: title(APP_DETAILS.name, "|", "All Release Notes"),
};

export default function AllReleases() {
  const allReleasesData = getAllReleasesDataList() || [];
  return allReleasesData.length === 0 ? (
    <FallbackMsgComponent icon={faBug} message="No release notes found." />
  ) : (
    <div className="bg-primary-bg text-primary-text p-4 md:p-6 min-h-screen flex flex-col gap-4 justify-start">
      <span className="text-4xl pt-8 md:pt-12 text-center">
        {APP_DETAILS.name}
      </span>
      <h1 className="text-2xl font-semibold text-center">All Release Notes</h1>
      <div className="bg-secondary-bg p-4 text-secondary-text w-full md:w-1/2 mx-auto rounded-lg shadow-lg">
        <ReleaseList releases={allReleasesData} />
      </div>
      <div className="flex items-center gap-2 md:w-1/2 mx-auto justify-center md:justify-end">
        <Link
          href="/"
          className="text-center bg-button-bg text-white hover:bg-button-hover text-sm border rounded-lg shadow-md px-4 py-2"
        >
          Go home
        </Link>
        <Link
          href="/release_updates"
          className="text-center bg-button-bg text-white hover:bg-button-hover text-sm border rounded-lg shadow-md px-4 py-2"
        >
          View Latest Notes
        </Link>
      </div>
    </div>
  );
}
