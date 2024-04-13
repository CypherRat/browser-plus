import {
  ClockOptions,
  DateTimeFormatOptions,
  SearchEngineOptions,
  StatusOptions,
} from "./_types";

export const PAGE_DETAILS = { title: "Settings" };

export const clockVals: ClockOptions[] = [
  { label: "Digital", disabled: false },
  { label: "Analog", disabled: false },
];

export const yesNoVals: StatusOptions[] = [
  { label: "No", disabled: false },
  { label: "Yes", disabled: false },
];

export const dateTimeFormatVals: DateTimeFormatOptions[] = [
  { label: "12hr", disabled: false },
  { label: "24hr", disabled: false },
];

export const searchEngineVals: SearchEngineOptions[] = [
  { label: "Google", disabled: false },
  { label: "Bing", disabled: false },
  { label: "DuckDuckGo", disabled: false },
  { label: "Yahoo", disabled: false },
  { label: "Perplexity", disabled: false },
];
