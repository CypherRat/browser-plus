import { getReleaseDetails } from "@/app/_lib/releases";
import FallbackMsgComponent from "@/app/_component/FallbackMsg";
import ReleaseNotes from "@/app/_component/ReleaseNotes";

export default function Releases() {
  const latestReleaseData = getReleaseDetails();
  return !latestReleaseData ? (
    <FallbackMsgComponent message="Latest release notes is currently unavailable." />
  ) : (
    <ReleaseNotes metadata={latestReleaseData} latestLabel />
  );
}
