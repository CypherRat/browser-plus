"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPencilAlt,
  faArrowLeft,
  faUpload,
  faDownload,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { DisplayNameContext } from "@/app/_context/DisplayName";
import Link from "next/link";
import { Switch } from "@headlessui/react";
import DisplayNameModal from "@/app/_component/DisplayNameModal";
import { CustomListbox, DialogModal, SettingRow } from "./_utils";
import toast from "react-hot-toast";
import { clockVals, dateTimeFormatVals, yesNoVals } from "./_constants";

export default function Settings() {
  const { displayName } = useContext(DisplayNameContext)!;

  const [darkMode, setDarkMode] = useState(true);
  const [changeNameStatus, setChangeNameStatus] = useState(false);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [exportFileName, setExportFileName] = useState("");

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [isHeadingSticky, setIsHeadingSticky] = useState(false);

  useEffect(() => {
    const checkStickiness = () => {
      const rect: any = headingRef.current?.getBoundingClientRect();
      const stickyPosition = window.innerWidth < 768 ? 16 : 48;
      setIsHeadingSticky(rect?.top <= stickyPosition);
    };

    window.addEventListener("scroll", checkStickiness);

    return () => {
      window.removeEventListener("scroll", checkStickiness);
    };
  }, []);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const isValidStructure = (obj: any) => {
    return (
      obj &&
      obj.settings &&
      typeof obj.settings.darkMode === "boolean" &&
      obj.settings.cards &&
      typeof obj.settings.cards.val === "string"
    );
  };

  const handleImport = () => {
    if (selectedFile) {
      const overrideSettings = confirm(
        "Importing will override your current settings or you may export before you import to save a copy of your settings. Are you sure you want to do that?"
      );
      if (overrideSettings) {
        const reader = new FileReader();
        reader.onload = function (event: any) {
          try {
            const json = JSON.parse(event.target.result);
            if (isValidStructure(json)) {
              // localStorage.setItem("settings", JSON.stringify(json));
              console.log("settings", JSON.stringify(json));
              toast.success("Successfully imported settings");
              setIsImportModalOpen(false);
            } else {
              toast.error("JSON file is corrupted or invalid");
              console.error("Invalid JSON file structure");
            }
          } catch (error) {
            toast.error("Invalid JSON file");
            console.error("Invalid JSON file:", error);
          }
        };
        reader.readAsText(selectedFile);
      } else {
        toast("Import Cancelled!", {
          icon: "❌",
        });
      }
    } else {
      toast.error("No file selected");
    }
  };

  const handleExportFileNameChange = (event: any) => {
    setExportFileName(event.target.value);
  };

  const handleExport = () => {
    if (exportFileName.trim().length) {
      const settings = { settings: { darkMode: true, cards: { val: "none" } } };
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(settings));
      let sanitizedFileName = exportFileName.trim().toLowerCase();
      sanitizedFileName = sanitizedFileName.replace(/\s+/g, "-");
      sanitizedFileName = sanitizedFileName.replace(/[^a-z0-9-]/g, "");
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", sanitizedFileName + ".json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else {
      toast.error("Enter export file name");
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleNameChange = () => {
    setChangeNameStatus(true);
  };

  return changeNameStatus ? (
    <DisplayNameModal supportingBoolFn={setChangeNameStatus} />
  ) : (
    <div className="p-4 md:px-20 lg:px-40 md:py-12">
      <Link
        href="/"
        className="text-gray-400 lg:sticky lg:top-4"
        legacyBehavior
        passHref
      >
        <a>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Go Back
        </a>
      </Link>
      <h1
        ref={headingRef}
        className={`mt-2 text-2xl bg-white p-3 rounded-lg transition-all cursor-pointer
        ${
          isHeadingSticky
            ? "bg-opacity-90 text-black drop-shadow-[0_25px_25px_rgba(196,182,252,0.25)]"
            : "bg-opacity-10 text-white"
        } z-20 sticky top-4 lg:top-12 `}
      >
        <FontAwesomeIcon icon={faCog} className="mr-2" />
        Browser Plus Settings
      </h1>
      <div className="mt-4">
        <SettingRow title="Name">
          <div className="flex items-center">
            {displayName?.val ?? "Guest"}
            <FontAwesomeIcon
              icon={faPencilAlt}
              onClick={handleNameChange}
              className="cursor-pointer ml-2"
            />
          </div>
        </SettingRow>
        <SettingRow title="Dark Mode" tooltipTitle="Default is Dark Mode.">
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${
              darkMode ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
          >
            <span className="sr-only">Enable Dark Mode</span>
            <span
              className={`${
                darkMode ? "translate-x-6 bg-white" : "translate-x-1 bg-black"
              } inline-block w-4 h-4 transform rounded-full transition-transform duration-200 ease-in-out`}
            />
          </Switch>
        </SettingRow>
        <SettingRow title="Clock">
          <CustomListbox options={clockVals} />
        </SettingRow>
        <SettingRow title="Datetime Format">
          <CustomListbox options={dateTimeFormatVals} />
        </SettingRow>
        <SettingRow title="Focus Mode">
          <CustomListbox options={yesNoVals} />
        </SettingRow>
        <SettingRow
          title="Cards"
          tooltipTitle="Cards are the main blocks visible to the screen."
        >
          Add Cards
        </SettingRow>
        <SettingRow
          title="Links"
          tooltipTitle="Add links to websites that you use the most."
        >
          Add Links
        </SettingRow>
        <SettingRow title="Import Settings">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Import
          </button>
        </SettingRow>
        <SettingRow title="Export Settings">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Export
          </button>
        </SettingRow>
        <SettingRow title="Reset/ Repair">
          <button
            onClick={() => {}}
            className="bg-red-700 hover:bg-red-900 text-white text-sm font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faWrench} className="mr-2" />
            Reset Settings
          </button>
        </SettingRow>
        <SettingRow title="About">
          <div className="flex flex-row gap-2 items-center flex-wrap">
            <span> BrowserPlus Alpha v1</span>
            <Link
              href="https://github.com/CypherRat/browser-plus/releases"
              className="text-gray-400 text-sm"
            >
              Check for Update
            </Link>{" "}
          </div>
        </SettingRow>
      </div>
      <div className="dialog-modals">
        <DialogModal
          isOpen={isImportModalOpen}
          setIsOpen={setIsImportModalOpen}
          title="Import Settings"
        >
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            style={{ transition: "all .15s ease" }}
          />
          <button
            type="button"
            onClick={handleImport}
            className="mt-4 float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Import
          </button>
        </DialogModal>
        <DialogModal
          isOpen={isExportModalOpen}
          setIsOpen={setIsExportModalOpen}
          title="Export Settings"
        >
          <div className="flex">
            <input
              type="text"
              value={exportFileName}
              onChange={handleExportFileNameChange}
              placeholder="Enter export file name"
              className="shadow appearance-none border-t border-b border-l rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={handleExport}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              Export
            </button>
          </div>
        </DialogModal>
      </div>
    </div>
  );
}
