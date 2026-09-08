import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import {
  isLocale,
  locales,
  languageTags,
  localizedPath,
  type Locale,
} from "./routing";
import { publicOrigin } from "../site";
import { cache } from "react";

export type Translator = (text: string) => string;
const loaders = {
  ko: () => import("./messages/ko.json"),
  ja: () => import("./messages/ja.json"),
  "zh-CN": () => import("./messages/zh-CN.json"),
  "zh-TW": () => import("./messages/zh-TW.json"),
};
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}
export const getTranslator = cache(async (): Promise<Translator> => {
  const locale = await getLocale();
  if (locale === "en") return (text) => text;
  const dictionary: Record<string, string> = (await loaders[locale]()).default;
  return (text) => dictionary[text] ?? text;
});

export async function getAlternates(path: string) {
  const origin = publicOrigin();
  if (!origin) return undefined;
  const locale = await getLocale();
  return {
    canonical: origin + localizedPath(path, locale),
    languages: {
      ...Object.fromEntries(
        locales.map((code) => [
          languageTags[code],
          origin + localizedPath(path, code),
        ]),
      ),
      "x-default": origin + localizedPath(path, "en"),
    },
  };
}
