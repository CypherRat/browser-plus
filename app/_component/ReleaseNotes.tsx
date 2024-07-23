"use client";
import Link from "next/link";
import { GrayMatterFile } from "gray-matter";
import Markdown from "markdown-to-jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { APP_DETAILS } from "../_shared/constants";

interface ReleaseNotesProps {
  metadata: GrayMatterFile<string> | null;
  latestLabel?: boolean;
}

const PreBlock: React.FC<React.HTMLProps<HTMLPreElement>> = ({
  children,
  ...props
}) => {
  return (
    <pre {...props} className="whitespace-pre-wrap">
      {children}
    </pre>
  );
};

const ReleaseNotes: React.FC<ReleaseNotesProps> = ({
  metadata,
  latestLabel = false,
}) => {
  const { data, content } = metadata || {};
  const { title, version, date } = data || {};
  return (
    <div className="bg-primary-bg text-primary-text p-4 md:p-6 min-h-full min-h-screen flex flex-col gap-4 justify-start">
      <span className="text-4xl text-center">{APP_DETAILS.name}</span>
      {latestLabel && (
        <h1 className="text-2xl font-semibold text-center">
          Latest Release Notes
        </h1>
      )}
      <div className="bg-secondary-bg p-4 text-secondary-text w-full md:w-1/2 mx-auto rounded-lg shadow-lg">
        <h2 className="text-xl text-primary-text font-semibold mb-2">
          {title || "Untitled"}
        </h2>
        {date || version ? (
          <p className="text-secondary-text text-sm mb-2">
            <FontAwesomeIcon
              icon={faCalendar}
              className="fas fa-calendar-alt mr-1"
            ></FontAwesomeIcon>{" "}
            {date || "Unknown"} | Version {version || "Alpha"}
          </p>
        ) : (
          <p className="text-secondary-text text-sm mb-2">Unknown</p>
        )}
        <Markdown
          options={{
            forceBlock: true,
            wrapper: "article",
            overrides: {
              pre: PreBlock,
            },
          }}
          className="text-secondary-text prose prose-h1:text-4xl prose-h1:text-primary-text prose-h2:text-secondary-text prose-h3:text-secondary prose-h4:text-secondary prose-p:text-base prose-strong:text-accent-1 prose-ul:list-decimal prose-ul:text-secondary-text"
        >
          {content || "No release note details available."}
        </Markdown>
      </div>
      <div className="flex items-center gap-2 md:w-1/2 mx-auto justify-center md:justify-end">
        <Link
          href="/"
          className="text-center bg-button-bg text-white hover:bg-button-hover text-sm border rounded-lg shadow-md px-4 py-2"
        >
          Go home
        </Link>
        <Link
          href="/release_updates/all"
          className="text-center bg-button-bg text-white hover:bg-button-hover text-sm border rounded-lg shadow-md px-4 py-2"
        >
          View All Notes
        </Link>
      </div>
    </div>
  );
};

export default ReleaseNotes;
