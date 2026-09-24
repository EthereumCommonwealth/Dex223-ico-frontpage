"use client";
import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

import DevSourcesBlueImage from "@/assets/images/dev-sources-blue.svg";
import Svg from "@/components/atoms/Svg";
import NeonBlock from "@/components/organisms/NeonBlock";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

type Report =
  | { month: string; year: number; labelKey?: never; href: string }
  | { labelKey: string; month?: never; year?: never; href: string };

const reports: Report[] = [
  {
    month: "march",
    year: 2026,
    href: "https://gist.github.com/Dexaran/73edea9e538782ef06ea120d036627eb",
  },
  {
    month: "february",
    year: 2026,
    href: "https://gist.github.com/Dexaran/73edea9e538782ef06ea120d036627eb",
  },
  {
    month: "january",
    year: 2026,
    href: "https://gist.github.com/Dexaran/394df2ed452570f73d6ce52be72a62e4",
  },
  {
    month: "december",
    year: 2025,
    href: "https://gist.github.com/Dexaran/394df2ed452570f73d6ce52be72a62e4",
  },
  {
    month: "november",
    year: 2025,
    href: "https://gist.github.com/Dexaran/73e95e9dc36134879345ff7e2837bae2",
  },
  {
    month: "october",
    year: 2025,
    href: "https://gist.github.com/Dexaran/73e95e9dc36134879345ff7e2837bae2",
  },
  {
    month: "september",
    year: 2025,
    href: "https://gist.github.com/Dexaran/5f403cd65775dc45b123cd5816837cf0",
  },
  {
    month: "august",
    year: 2025,
    href: "https://gist.github.com/Dexaran/5f403cd65775dc45b123cd5816837cf0",
  },
  {
    month: "july",
    year: 2025,
    href: "https://gist.github.com/Dexaran/108b78e597fccb4ec9947dcd4df7ac95",
  },
  {
    month: "june",
    year: 2025,
    href: "https://gist.github.com/Dexaran/108b78e597fccb4ec9947dcd4df7ac95",
  },
  {
    month: "may",
    year: 2025,
    href: "https://gist.github.com/Dexaran/d5716b2c9dbd3edfc579b1486153f481",
  },
  {
    month: "april",
    year: 2025,
    href: "https://gist.github.com/Dexaran/d5716b2c9dbd3edfc579b1486153f481",
  },
  {
    month: "march",
    year: 2025,
    href: "https://gist.github.com/Dexaran/077c6c2a2a024cb90020d1b008f6b445",
  },
  {
    month: "february",
    year: 2025,
    href: "https://gist.github.com/Dexaran/077c6c2a2a024cb90020d1b008f6b445",
  },
  {
    month: "january",
    year: 2025,
    href: "https://gist.github.com/Dexaran/cb9d6c04402c09c7959546f4f7a8d392",
  },
  {
    month: "december",
    year: 2024,
    href: "https://gist.github.com/Dexaran/cb9d6c04402c09c7959546f4f7a8d392",
  },
  {
    month: "november",
    year: 2024,
    href: "https://gist.github.com/Dexaran/d53d29b3dd88279bbc3cf5c51dd6638b",
  },
  {
    month: "october",
    year: 2024,
    href: "https://gist.github.com/Dexaran/8f222be80bc01ee8db0fae8b729459be",
  },
  {
    month: "september",
    year: 2024,
    href: "https://gist.github.com/Dexaran/5722f3e7002b7010bdd4d8c10af9f4fe",
  },
  {
    month: "august",
    year: 2024,
    href: "https://gist.github.com/Dexaran/c479c626a1af52853f5e396d2b7fcf9f",
  },
  {
    month: "july",
    year: 2024,
    href: "https://gist.github.com/Dexaran/8abaa6fd3a38faca4b9792cceda450e8",
  },
  {
    month: "june",
    year: 2024,
    href: "https://gist.github.com/Dexaran/c671c41dde06856ca20493126f3bb56f",
  },
  {
    month: "may",
    year: 2024,
    href: "https://gist.github.com/Dexaran/a4d14551f3ddc58a96c5664c2f76b5b2",
  },
  {
    month: "april",
    year: 2024,
    href: "https://gist.github.com/Dexaran/8556c6f63d9968e7e293980d7ddd1b23",
  },
  {
    month: "march",
    year: 2024,
    href: "https://gist.github.com/Dexaran/2f805faf302366f42817d85aec14d1bc",
  },
  {
    month: "february",
    year: 2024,
    href: "https://gist.github.com/Dexaran/1aacf32eae073f2e930fdf22b7cecd0b",
  },
  {
    labelKey: "round2CompletionReport",
    href: "https://gist.github.com/Dexaran/d1e93da8f25dfbc9bd35575af085f2b3",
  },
  {
    labelKey: "presaleRound2",
    href: "https://www.reddit.com/r/CallistoCrypto/comments/18ajzj1/dex223_presale_round_2_announcement/",
  },
  {
    month: "december",
    year: 2023,
    href: "https://gist.github.com/Dexaran/f0a62796ca4153c1ffc75ba9ca34ab70",
  },
  {
    month: "november",
    year: 2023,
    href: "https://gist.github.com/Dexaran/62cece71a667695edad1967d701e9958",
  },
  {
    labelKey: "presaleRound1",
    href: "https://www.reddit.com/r/CallistoCrypto/comments/16jgvfx/dex223_presale_round_announcement/",
  },
];

export default function DevelopmentReports({ refEl }) {
  const t = useTranslations("Development");
  const reportsEntryRef = useRef<HTMLDivElement | null>(null);
  const reportsEntry = useIntersectionObserver(reportsEntryRef, {
    threshold: 0.6,
    freezeOnceVisible: true,
  });

  return (
    <div>
      <div ref={refEl} />
      <NeonBlock
        icon="reports"
        color="blue"
        differentColumns
        overlineText={t("reports.overline")}
        anchor="reports"
        leftContent={
          <>
            <div className="flex flex-col gap-5">
              <p className="text-18 lg:text-24 font-semibold text-primary-text">
                {t("reports.heading")}
              </p>
            </div>
            <ul className="mt-6">
              {reports.map((report) => {
                const label = report.labelKey
                  ? t(`reports.entries.${report.labelKey}`)
                  : t("reports.monthYear", {
                      month: t(`months.${report.month}`),
                      year: String(report.year),
                    });
                return (
                  <li className="border-b border-primary-border" key={label}>
                    <a
                      target="_blank"
                      href={report.href}
                      className="hover:text-green py-3.5 text-secondary-text flex gap-6 justify-between text-16 lg:text-18 duration-200"
                    >
                      <span>{label}</span>
                      <Svg className="flex-shrink-0 mt-0.5" iconName="forward" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </>
        }
        rightContent={
          <div
            ref={reportsEntryRef}
            className={clsx("pt-0 lg:pt-[152px]", reportsEntry?.isIntersecting && "animated")}
          >
            <Image src={DevSourcesBlueImage} className="w-full max-lg:max-w-[310px]" alt={""} />
          </div>
        }
      />
    </div>
  );
}
