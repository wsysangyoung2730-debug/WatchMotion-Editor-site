import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "../globals.css";
import "../editorial.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { publicOrigin } from "@/lib/site";
import { getLocale, getTranslator } from "@/lib/i18n/server";
import { locales, languageTags } from "@/lib/i18n/routing";

const origin = publicOrigin();
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return {
    ...(origin ? { metadataBase: new URL(origin) } : {}),
    title: {
      default: t("WatchMotion Editor — From motion to meaning"),
      template: "%s | WatchMotion Editor",
    },
    description: t(
      "Record motion on Apple Watch, review it on iPhone, and turn selected moments into labeled datasets on Mac.",
    ),
    robots: {
      index: !!origin && process.env.VERCEL_ENV !== "preview",
      follow: !!origin && process.env.VERCEL_ENV !== "preview",
    },
  };
}
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const t = await getTranslator();
  const headerKeys = [
    "Mac Editor",
    "User Guide",
    "Support",
    "WatchMotion Editor home",
    "Main navigation",
    "Open navigation",
    "Close navigation",
    "Get the apps",
    "Language",
  ];
  const labels = Object.fromEntries(headerKeys.map((key) => [key, t(key)]));
  return (
    <html lang={languageTags[locale]}>
      <body>
        <a className="skip-link" href="#main-content">
          {t("Skip to content")}
        </a>
        <Header locale={locale} labels={labels} />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
