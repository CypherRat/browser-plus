"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { ReleaseProps } from "../_shared/types";

interface ListProps {
  releases: ReleaseProps[];
}
const ReleaseList: React.FC<ListProps> = ({ releases }) => {
  return releases && Array.isArray(releases) && releases.length ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {releases.map((release, idx) => (
        <li
          key={release?.version || idx}
          className="bg-accent-2 p-4 rounded-md shadow-md"
        >
          <Link href={`/release_updates/${release?.version || "all"}`}>
            <div className="text-primary-text font-semibold text-xl">
              {release?.title || "Untitled"}
            </div>
          </Link>
          <div className="flex items-center flex-wrap gap-2 text-secondary-text">
            <div className="flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faCalendar} />
              <span>{release?.date || "Unknown"}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faCodeBranch} />
              <span className="text-secondary">
                {release?.version || "Alpha"}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-sm">
      No release notes is found. Please check back sometime later.
    </p>
  );
};

export default ReleaseList;
