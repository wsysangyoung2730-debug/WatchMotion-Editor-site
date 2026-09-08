"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { languageFocusIndex } from "@/lib/language-navigation";
import {
  locales,
  languageNames,
  languageTags,
  localizedPath,
  preferenceCookie,
  type Locale,
} from "@/lib/i18n/routing";

/** A disclosure of ordinary navigation links, not an OS-native select or a modal. */
export function LanguagePicker({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const keyboardEntry = useRef<"first" | "last" | null>(null);
  const items = () =>
    Array.from(
      root.current?.querySelectorAll<HTMLAnchorElement>(".language-option") ??
        [],
    );

  useEffect(() => {
    if (!open) return;
    if (keyboardEntry.current) {
      const links = items();
      links[keyboardEntry.current === "last" ? links.length - 1 : 0]?.focus();
      keyboardEntry.current = null;
    }
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    // Home/End retain their normal page behavior when the disclosure is closed.
    if (!open && ["Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (!open) {
      keyboardEntry.current = event.key === "ArrowUp" ? "last" : "first";
      setOpen(true);
      return;
    }
    const links = items();
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    const index = languageFocusIndex(event.key, current, links.length);
    links[index]?.focus();
  }

  return (
    <div
      className="language-picker"
      ref={root}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language-trigger"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${label}: ${languageNames[locale]}`}
        onClick={() => setOpen((value) => !value)}
      >
        <Globe size={18} aria-hidden="true" />
        <span lang={languageTags[locale]}>{languageNames[locale]}</span>
        <ChevronDown
          size={16}
          className="language-chevron"
          aria-hidden="true"
        />
      </button>
      <div id={id} className="language-popover" hidden={!open}>
        <p className="language-heading">{label}</p>
        <ul aria-label={label}>
          {locales.map((language) => (
            <li key={language}>
              <a
                className="language-option"
                href={localizedPath(pathname, language)}
                hrefLang={languageTags[language]}
                lang={languageTags[language]}
                aria-current={language === locale ? "true" : undefined}
                onClick={(event) => {
                  if (
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  event.preventDefault();
                  try {
                    document.cookie = `${preferenceCookie}=${language}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
                  } catch {
                    /* Navigation still works if preference storage is unavailable. */
                  }
                  setOpen(false);
                  if (language === locale) {
                    trigger.current?.focus();
                    return;
                  }
                  window.location.assign(
                    localizedPath(window.location.pathname, language) +
                      window.location.search +
                      window.location.hash,
                  );
                }}
              >
                <span>{languageNames[language]}</span>
                {language === locale && <Check size={17} aria-hidden="true" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
