import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DisplayNameProvider } from "./_context/DisplayName";
import UILayout from "./(ui)/layout";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className} id="my-browser-window">
        <DisplayNameProvider>
          <UILayout>{children}</UILayout>
        </DisplayNameProvider>
      </body>
    </html>
  );
}
