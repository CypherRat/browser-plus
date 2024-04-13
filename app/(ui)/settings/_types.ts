import {
  ClockType,
  DateTimeFormatType,
  SearchEngineType,
  StatusType,
} from "@/app/_shared/types";

export interface ClockOptions {
  label: ClockType;
  disabled: boolean;
}
export interface StatusOptions {
  label: StatusType;
  disabled: boolean;
}
export interface DateTimeFormatOptions {
  label: DateTimeFormatType;
  disabled: boolean;
}
export interface SearchEngineOptions {
  label: SearchEngineType;
  disabled: boolean;
}
