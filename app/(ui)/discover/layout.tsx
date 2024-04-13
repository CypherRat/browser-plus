import { Metadata } from "next";
import { title } from "@/app/_shared/utils";
import { APP_DETAILS } from "@/app/_shared/constants";
import { PAGE_DETAILS } from "./_constants";

export const metadata: Metadata = {
  title: title(APP_DETAILS.name, "|", PAGE_DETAILS.title),
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
