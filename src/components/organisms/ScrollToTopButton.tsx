"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

import Svg from "../atoms/Svg";

export default function ScrollToTopButton() {
  const t = useTranslations("Common");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function logPositions() {
      if (scrollY > window.innerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    const throttledPositions = throttle(250, logPositions);

    window.addEventListener("scroll", throttledPositions);

    return () => {
      window.removeEventListener("scroll", throttledPositions);
    };
  }, []);

  return (
    <button
      aria-label={t("scrollToTop")}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      ref={ref}
      className={clsx(
        "w-12 h-12 fixed right-4 bottom-4 md:right-[50px] md:bottom-[50px] hocus:bg-green-bg text-secondary-text hocus:text-primary-text duration-300 bg-quaternary-bg/80 backdrop-blur-md border border-white/[0.06] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.9)] p-0 rounded-3 flex items-center justify-center cursor-pointer z-[999]",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
      )}
    >
      <Svg iconName="to-top" />
    </button>
  );
}
