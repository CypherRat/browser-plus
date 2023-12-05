export type ClockType = "Digital" | "Analog";
export type DateTimeFormatType = "12hr" | "24hr";
export type FocusModeType = "Yes" | "No";
export type SearchEngineType = "Google" | "Bing" | "DuckDuckGo" | "Yahoo";

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
