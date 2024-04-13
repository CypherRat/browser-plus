import {
  ConfirmDialogProps,
  InitialDisplayName,
  InitialSettings,
  AppProps,
  SettingsImportDS,
} from "./types";

export const APP_DETAILS: AppProps = {
  name: "Browser Plus",
  stage: "Alpha",
  description: "Making the browser window more like your own personal space.",
  version: "0.1.0",
};

export const initialSettings: InitialSettings = {
  settings: {
    darkMode: true,
    clock: "Digital",
    dateTimeFormat: "12hr",
    focusMode: "No",
    defaultSearchEngine: "DuckDuckGo",
    cards: [],
    links: [],
  },
};

export const initialDisplayName: InitialDisplayName = {
  isNameSkipped: false,
  val: null,
};

export const settingsImportDataStructure: SettingsImportDS = {
  settings: {
    darkMode: { type: "boolean" },
    clock: { type: "string", values: ["Digital", "Analog"] },
    dateTimeFormat: { type: "string", values: ["12hr", "24hr"] },
    focusMode: { type: "string", values: ["Yes", "No"] },
    defaultSearchEngine: {
      type: "string",
      values: ["Google", "Bing", "DuckDuckGo", "Yahoo"],
    },
    cards: {
      type: "array",
      structure: {
        id: { type: "number" },
        title: { type: "string", nullable: true },
        description: { type: "string", nullable: true },
        urls: {
          type: "array",
          structure: {
            id: { type: "number" },
            title: { type: "string", nullable: true },
            url: { type: "string", nullable: true },
          },
        },
      },
    },
    links: {
      type: "array",
      structure: {
        id: { type: "number" },
        title: { type: "string", nullable: true },
        url: { type: "string", nullable: true },
      },
    },
  },
};

export const defaultConfirmDialogSetup: ConfirmDialogProps = {
  isOpen: false,
  description: null,
  onAccept: () => {},
};
