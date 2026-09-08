import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import "./editorial.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { publicOrigin } from "@/lib/site";

const origin = publicOrigin();
export const metadata: Metadata = {
  ...(origin ? { metadataBase: new URL(origin) } : {}),
  title: { default: "WatchMotion Editor — From motion to meaning", template: "%s | WatchMotion Editor" },
  description: "Record motion on Apple Watch, review it on iPhone, and turn selected moments into labeled datasets on Mac.",
  robots: { index: process.env.VERCEL_ENV !== "preview", follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></body></html>;
}
