"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { PropsWithChildren, useEffect, useId, useRef, useState } from "react";

import Svg from "@/components/atoms/Svg";

/**
 * Progressive disclosure: the short version stays on screen and the full explanation
 * opens in place. Closed content is inert, so its links are not tabbable or read out.
 */
export default function ReadMore({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const t = useTranslations("Common");
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // React 18 has no `inert` prop, so set the attribute directly.
  useEffect(() => {
    panelRef.current?.toggleAttribute("inert", !isOpen);
  }, [isOpen]);

  return (
    <div className={className}>
      <div
        id={id}
        className={clsx(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        ref={panelRef}
      >
        <div className="overflow-hidden">
          <div
            className={clsx(
              "pt-3 transition-opacity duration-500",
              isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen(!isOpen)}
        className="relative mt-3 inline-flex items-center gap-1 text-14 lg:text-16 font-medium text-green duration-200 hocus:text-green-hover after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']"
      >
        {isOpen ? t("showLess") : t("readMore")}
        <Svg
          iconName="arrow-right-small"
          size={20}
          className={clsx("duration-300", isOpen ? "-rotate-90" : "rotate-90")}
        />
      </button>
    </div>
  );
}
