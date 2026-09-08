"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LanguagePicker } from "@/components/language-picker";
import { localizedPath, stripLocale, type Locale } from "@/lib/i18n/routing";

const links = [
  ["/mac-editor", "Mac Editor"],
  ["/guide", "User Guide"],
  ["/support", "Support"],
];
export function Header({
  locale,
  labels,
}: {
  locale: Locale;
  labels: Record<string, string>;
}) {
  const pathname = stripLocale(usePathname());
  const t = (key: string) => labels[key] ?? key;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href={localizedPath("/", locale)}
          className="brand"
          onClick={() => setOpen(false)}
          aria-label={t("WatchMotion Editor home")}
        >
          <Image src="/images/app-icon.png" alt="" width={38} height={38} />
          <span>
            WatchMotion <span className="brand-light">Editor</span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={t(open ? "Close navigation" : "Open navigation")}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label={t("Main navigation")}
          className={open ? "main-nav open" : "main-nav"}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={localizedPath(href, locale)}
              aria-current={
                pathname === href || pathname.startsWith(href + "/")
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {t(label)}
            </Link>
          ))}
          <Link
            className="nav-cta"
            href={localizedPath("/#download", locale)}
            onClick={() => setOpen(false)}
          >
            {t("Get the apps")} <ArrowUpRight size={15} />
          </Link>
          <LanguagePicker locale={locale} label={t("Language")} />
        </nav>
      </div>
    </header>
  );
}
