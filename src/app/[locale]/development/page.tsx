"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

import Ecosystem from "@/app/[locale]/development/components/Ecosystem";
import ScrollToTopButton from "@/components/organisms/ScrollToTopButton";
import { clsxMerge } from "@/functions/clsxMerge";

import DevelopmentReports from "./components/DevelopmentReports";
import References from "./components/References";
import Structure from "./components/Structure";

// Just below the site header plus the sticky tab bar (sections scroll to about 160px).
const SECTION_OFFSET = 180;

const tabClassName =
  "flex items-center justify-center rounded-2 bg-secondary-bg border border-transparent w-full h-12 px-2 text-center leading-tight text-secondary-text text-16 lg:text-18 duration-200 hocus:bg-tertiary-bg hocus:border-primary-border hocus:text-primary-text";
const activeTabClassName = "bg-quaternary-bg border-primary-border text-primary-text";

export default function DevelopmentPage() {
  const t = useTranslations("Development");
  const [activeTab, setActiveTab] = useState(-1);

  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();

  useEffect(() => {
    function logPositions() {
      if (firstRef.current && secondRef.current && thirdRef.current) {
        // A section counts as active once it reaches the bottom of the sticky tab bar.
        // @ts-ignore
        const firstTop = firstRef.current.getBoundingClientRect().top - SECTION_OFFSET;
        // @ts-ignore
        const secondTop = secondRef.current.getBoundingClientRect().top - SECTION_OFFSET;
        // @ts-ignore
        const thirdTop = thirdRef.current.getBoundingClientRect().top - SECTION_OFFSET;

        if (firstTop > 0) {
          setActiveTab(-1);
        }

        if (firstTop < 0 && secondTop > 0) {
          setActiveTab(0);
        }

        if (secondTop < 0 && thirdTop > 0) {
          setActiveTab(1);
        }

        if (thirdTop < 0) {
          setActiveTab(2);
        }
      }
    }

    const throttledPositions = throttle(250, logPositions);

    window.addEventListener("scroll", throttledPositions);

    return () => {
      window.removeEventListener("scroll", throttledPositions);
    };
  }, [setActiveTab]);

  return (
    <div className="mb-[200px] [&_[id]]:scroll-mt-[72px]">
      <h1 className="text-center text-30 lg:text-58 font-bold mb-3 mt-10 xl:mt-[60px] text-primary-text">
        {t("title")}
      </h1>

      <p className="text-18 text-secondary-text text-center max-w-[822px] mx-auto mb-5 px-4">
        {t("description")}
      </p>

      <nav
        aria-label={t("title")}
        className="sticky top-[66px] lg:top-[60px] py-3 z-[70] mb-5 px-4"
      >
        <div className="grid grid-cols-3 mx-auto max-w-[822px] p-1 gap-1 rounded-3 bg-primary-bg/90 backdrop-blur-xl border border-white/[0.06] shadow-[0_16px_32px_-16px_rgba(0,0,0,0.9)]">
          {(
            [
              ["structure", t("tabs.structure")],
              ["references", t("tabs.references")],
              [
                "reports",
                <>
                  <span className="max-lg:hidden">{t("tabs.developmentReports")}</span>
                  <span className="lg:hidden">{t("tabs.reports")}</span>
                </>,
              ],
            ] as const
          ).map(([id, label], index) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeTab === index ? "location" : undefined}
              className={clsxMerge(tabClassName, activeTab === index && activeTabClassName)}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="flex flex-col gap-10">
        <Structure refEl={firstRef} />
        <Ecosystem />
        <References refEl={secondRef} />
        <DevelopmentReports refEl={thirdRef} />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
