import { Metadata } from "next";
import { title } from "@/app/_shared/utils";
import { APP_DETAILS } from "@/app/_shared/constants";
import { PAGE_DETAILS } from "./_constants";
import SecondaryHeader from "@/app/_component/SecondaryHeader";

export const metadata: Metadata = {
  title: title(APP_DETAILS.name, "|", PAGE_DETAILS.title),
};

export default function ReleasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="release_box bg-primary-bg flex flex-col h-[100dvh] h-screen">
      <SecondaryHeader />
      <div className="grow">{children}</div>
    </section>
  );
}
