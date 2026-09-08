import Link from "next/link";
import type { ComponentProps } from "react";
import { getLocale } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/routing";

export default async function LocalizedLink(
  props: ComponentProps<typeof Link>,
) {
  const locale = await getLocale();
  return (
    <Link
      {...props}
      href={
        typeof props.href === "string"
          ? localizedPath(props.href, locale)
          : props.href
      }
    />
  );
}
