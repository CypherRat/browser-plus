import {
  CLOCK_TYPES,
  DATE_TIME_FORMATS,
  FOCUS_MODES,
  SEARCH_ENGINES,
  STAGES,
  STATUSES,
  THEMES,
} from "./globalValues";

export type AppVersion = `${number}.${number}.${number}`;
export type ClockType = (typeof CLOCK_TYPES)[number];
export type DateTimeFormatType = (typeof DATE_TIME_FORMATS)[number];
export type FocusModeType = (typeof FOCUS_MODES)[number];
export type SearchEngineType = (typeof SEARCH_ENGINES)[number];
export type StageType = (typeof STAGES)[number];
export type StatusType = (typeof STATUSES)[number];
export type ThemeType = (typeof THEMES)[number];

export type SettingImportDSObjectType = {
  type: string;
  values?: string[];
  structure?: object;
};

export interface AppProps {
  name: string;
  stage: StageType;
  version: AppVersion;
  description: string;
}

export interface URLProps {
  id: number;
  title?: string | null;
  url: string | null;
}

export interface CardProps {
  id: number;
  title: string | null;
  description?: string | null;
  urls: URLProps[];
}

export interface Settings {
  darkMode: boolean;
  clock: ClockType;
  dateTimeFormat: DateTimeFormatType;
  focusMode: FocusModeType;
  defaultSearchEngine: SearchEngineType;
  cards: CardProps[];
  links: URLProps[];
}

export interface InitialSettings {
  settings: Settings;
}

export interface InitialDisplayName {
  isNameSkipped: boolean;
  val: string | null;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  description?: string | null;
  onAccept: () => void;
}

export interface SettingsImportDS {
  settings: {
    [key: string]: SettingImportDSObjectType;
  };
}
export interface ThemeOptions {
  THEMES: {
    [key in ThemeType]: string;
  };
}
