import { getAllReleasesDataList, getReleaseDetails } from "@/app/_lib/releases";
import { AppVersion } from "@/app/_shared/types";
import ReleaseNotes from "@/app/_component/ReleaseNotes";
import FallbackMsgComponent from "@/app/_component/FallbackMsg";
import { APP_DETAILS } from "@/app/_shared/constants";
import { title } from "@/app/_shared/utils";

interface PageProps {
  params: {
    [key: string]: string;
  };
}

export const generateMetadata = async ({ params }: PageProps) => {
  return {
    title: title(APP_DETAILS.name, "|", "Release Notes", params.version),
  };
};

export const generateStaticParams = async () => {
  const releases = getAllReleasesDataList();
  return releases !== null && Array.isArray(releases)
    ? releases.map((release) => ({ version: release.version }))
    : [];
};

export default function LatestRelease({ params }: PageProps) {
  const { version } = params;
  const releaseInfo = getReleaseDetails(version as AppVersion);
  return !releaseInfo ? (
    <FallbackMsgComponent
      message={`Release notes is currently unavailable for v${version}.`}
    />
  ) : (
    <ReleaseNotes metadata={releaseInfo} />
  );
}
