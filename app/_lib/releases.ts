import fs from "fs";
import path from "path";
import matter, { type GrayMatterFile } from "gray-matter";
import { AppVersion, ReleaseProps } from "../_shared/types";
import { APP_DETAILS } from "../_shared/constants";
import { isValidAppVersion } from "../_shared/utils";

const releasesDirectory = path.join(process.cwd(), "release-notes");

export function getReleaseDetails(
  version?: AppVersion
): GrayMatterFile<string> | null {
  try {
    const currentAppVersion = APP_DETAILS.version;
    const readAppVersion = version ?? currentAppVersion;
    if (!isValidAppVersion(readAppVersion)) return null;
    const fileName = `${readAppVersion}.md`;
    const fullPath = path.join(releasesDirectory, fileName);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return matterResult || null;
    } else {
      throw new Error("Release information unavailable.");
    }
  } catch (err) {
    throw new Error("Release information unavailable.");
  }
}
export function getAllReleasesDataList(): ReleaseProps[] | null {
  try {
    if (!fs.existsSync(releasesDirectory)) return null;
    const fileNames = fs.readdirSync(releasesDirectory);
    const allReleasesData: ReleaseProps[] = fileNames.map((fileName) => {
      const fullPath = path.join(releasesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        title: data.title,
        version: data.version,
        date: data.date,
      };
    });
    return allReleasesData && allReleasesData.length
      ? allReleasesData.sort((a, b) => a.version.localeCompare(b.version))
      : null;
  } catch (err) {
    throw new Error("No release information details found.");
  }
}
