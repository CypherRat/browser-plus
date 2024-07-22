import {
  AppVersion,
  CardProps,
  ClockType,
  DateTimeFormatType,
  FocusModeType,
  InitialSettings,
  SearchEngineType,
  Settings,
  URLProps,
} from "./types";

export function getValueFromObject(obj: any, key: string) {
  if (
    typeof obj === "object" &&
    obj !== null &&
    !Array.isArray(obj) &&
    typeof key === "string"
  ) {
    return obj.hasOwnProperty(key) ? obj[key] : undefined;
  } else {
    return undefined;
  }
}

export function convertToOption(option: string) {
  return option ? { label: option, disabled: false } : {};
}

export function updateNestedObject(
  obj: any,
  keyPath: string,
  value: string | boolean | null
) {
  let keys = keyPath.split(".");
  let lastKeyIndex = keys.length - 1;

  keys.reduce((nestedObj, key, index) => {
    if (index === lastKeyIndex) {
      nestedObj[key] = value;
    } else {
      if (!(key in nestedObj)) {
        nestedObj[key] = {};
      }
      return nestedObj[key];
    }
  }, obj);

  return obj;
}

export const isValidImportStructure = (obj: any): obj is InitialSettings => {
  const clockTypes: ClockType[] = ["Digital", "Analog"];
  const dateTimeFormatTypes: DateTimeFormatType[] = ["12hr", "24hr"];
  const focusModeTypes: FocusModeType[] = ["Yes", "No"];
  const searchEngineTypes: SearchEngineType[] = [
    "Google",
    "Bing",
    "DuckDuckGo",
    "Yahoo",
    "Perplexity",
  ];

  const isValidURL = (url: string): boolean => {
    const urlRegex =
      /^https?:\/\/([a-zA-Z0-9-\.]+\.[a-z]{2,4})(:[0-9]+)?(\/.*)?$/;
    return urlRegex.test(url);
  };

  const isValidURLProps = (urlProps: any): urlProps is URLProps => {
    const expectedKeys = ["id", "title", "url"];
    return (
      Object.keys(urlProps).length === expectedKeys.length &&
      expectedKeys.every((key) => key in urlProps) &&
      typeof urlProps.id === "number" &&
      (typeof urlProps.title === "string" || urlProps.title === null) &&
      ((typeof urlProps.url === "string" && isValidURL(urlProps.url)) ||
        urlProps.url === null)
    );
  };

  const isValidCardProps = (cardProps: any): cardProps is CardProps => {
    const expectedKeys = ["id", "title", "description", "urls"];
    return (
      Object.keys(cardProps).length === expectedKeys.length &&
      expectedKeys.every((key) => key in cardProps) &&
      typeof cardProps.id === "number" &&
      (typeof cardProps.title === "string" || cardProps.title === null) &&
      (typeof cardProps.description === "string" ||
        cardProps.description === null) &&
      Array.isArray(cardProps.urls) &&
      cardProps.urls.every(isValidURLProps)
    );
  };

  const isValidSettings = (settings: any): settings is Settings => {
    const expectedKeys = [
      "darkMode",
      "clock",
      "dateTimeFormat",
      "focusMode",
      "defaultSearchEngine",
      "cards",
      "links",
    ];
    return (
      Object.keys(settings).length === expectedKeys.length &&
      expectedKeys.every((key) => key in settings) &&
      typeof settings.darkMode === "boolean" &&
      clockTypes.includes(settings.clock) &&
      dateTimeFormatTypes.includes(settings.dateTimeFormat) &&
      focusModeTypes.includes(settings.focusMode) &&
      searchEngineTypes.includes(settings.defaultSearchEngine) &&
      Array.isArray(settings.cards) &&
      settings.cards.every(isValidCardProps) &&
      Array.isArray(settings.links) &&
      settings.links.every(isValidURLProps)
    );
  };

  return obj && obj.settings && isValidSettings(obj.settings);
};

export function title(...props: string[]): string {
  if (props && props?.length === 0) return "Untitled";
  const capitalizedProps = props
    .filter((prop) => typeof prop === "string" && prop.trim() !== "")
    .map((phrase) =>
      phrase
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    );

  return capitalizedProps.join(" ");
}

export const delay = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function isValidAppVersion(version: AppVersion): boolean {
  if (!version) return false;
  const versionPattern = /^\d+\.\d+\.\d+$/;
  return versionPattern.test(version);
}
