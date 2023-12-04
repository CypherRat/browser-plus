import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { DisplayNameProvider } from "./_context/DisplayName";
import UILayout from "./(ui)/layout";
import { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as faConfig } from "@fortawesome/fontawesome-svg-core";

faConfig.autoAddCss = false;
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Browser Plus",
  description: "Making the browser window more like you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className} id="my-browser-window">
        <DisplayNameProvider>
          <Toaster />
          <UILayout>{children}</UILayout>
        </DisplayNameProvider>
      </body>
    </html>
  );
}
