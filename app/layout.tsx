import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { DisplayNameProvider } from "./_context/DisplayName";
import { SettingsProvider } from "./_context/Settings";
import UILayout from "./(ui)/layout";
import { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";
import { APP_DETAILS } from "./_shared/constants";
import { ThemeProviders } from "./theme-provider";

faConfig.autoAddCss = false;
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_DETAILS.name,
  description: APP_DETAILS.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className} id="my-browser-window">
        <ThemeProviders>
          <SettingsProvider>
            <DisplayNameProvider>
              <Toaster />
              <UILayout>{children}</UILayout>
            </DisplayNameProvider>
          </SettingsProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
