"use client";

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import clsx from "clsx";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import Svg from "@/components/atoms/Svg";
import { Locale, locales, usePathname, useRouter } from "@/i18n/routing";

// Same labels as the app's switcher. English uses the US flag; Portuguese uses Brazil
// because the site's Portuguese copy is Brazilian.
export const localesMap: Record<Locale, { img?: string; label: string; symbol: string }> = {
  en: { img: "/images/locales/en.svg", label: "English", symbol: "En" },
  es: { img: "/images/locales/es.svg", label: "Español", symbol: "Es" },
  zh: { img: "/images/locales/zh.svg", label: "中文", symbol: "Zh" },
  ko: { img: "/images/locales/ko.svg", label: "한국어", symbol: "Ko" },
  fr: { img: "/images/locales/fr.svg", label: "Français", symbol: "Fr" },
  pt: { img: "/images/locales/pt.svg", label: "Português", symbol: "Pt" },
  ru: { img: "/images/locales/ru.svg", label: "Русский", symbol: "Ru" },
};

function LocaleMark({ locale }: { locale: Locale }) {
  const entry = localesMap[locale];
  if (entry.img) {
    return <Image src={entry.img} alt="" width={20} height={20} className="rounded-full" />;
  }
  return (
    <span
      aria-hidden
      className="w-5 h-5 flex items-center justify-center rounded-full bg-quaternary-bg text-[9px] font-semibold text-secondary-text"
    >
      {entry.symbol}
    </span>
  );
}

export default function LocaleSwitcher({ placement = "bottom-end" as const }) {
  const t = useTranslations("Navigation");
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: "listbox" }),
  ]);

  const select = (locale: Locale) => {
    setIsOpen(false);
    if (locale === current) return;
    startTransition(() => {
      // Keep the visitor on the same page and section in the new language.
      router.replace(`${pathname}${window.location.hash}`, { locale, scroll: false });
    });
  };

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        aria-label={t("language")}
        className={clsx(
          "inline-flex items-center gap-2 h-10 pl-2.5 pr-2 rounded-2 text-14 font-medium text-secondary-text border duration-200 hocus:text-primary-text hocus:bg-tertiary-bg",
          isOpen ? "bg-tertiary-bg border-white/[0.08]" : "border-transparent",
          isPending && "opacity-60",
        )}
        {...getReferenceProps()}
      >
        <LocaleMark locale={current} />
        {localesMap[current].symbol}
        <Svg
          iconName="arrow-right-small"
          size={20}
          className={clsx("duration-200", isOpen ? "-rotate-90" : "rotate-90")}
        />
      </button>

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <ul
              ref={refs.setFloating}
              style={floatingStyles}
              className="z-[120] min-w-[208px] py-1.5 rounded-3 bg-primary-bg/95 backdrop-blur-xl border border-white/[0.06] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)]"
              {...getFloatingProps()}
            >
              {locales.map((locale) => (
                <li key={locale}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={locale === current}
                    lang={locale}
                    onClick={() => select(locale)}
                    className={clsx(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-left text-14 duration-150",
                      locale === current
                        ? "text-green-hover"
                        : "text-secondary-text hocus:bg-tertiary-bg hocus:text-primary-text",
                    )}
                  >
                    <LocaleMark locale={locale} />
                    <span className="flex-grow">{localesMap[locale].label}</span>
                    {locale === current && <Svg iconName="check" size={18} />}
                  </button>
                </li>
              ))}
            </ul>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
