"use client";
import { DisplayNameProvider } from "./_context/DisplayName";
import { SettingsProvider } from "./_context/Settings";
import { SetupProvider } from "./_context/Setup";
import { ThemeProviders } from "./theme-provider";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviders>
      <SetupProvider>
        <SettingsProvider>
          <DisplayNameProvider>{children}</DisplayNameProvider>
        </SettingsProvider>
      </SetupProvider>
    </ThemeProviders>
  );
}
