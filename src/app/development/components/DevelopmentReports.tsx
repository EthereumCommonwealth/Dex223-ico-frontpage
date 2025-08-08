"use client";
import clsx from "clsx";
import Image from "next/image";
import React, { useRef } from "react";

import Svg from "@/components/atoms/Svg";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import DevSourcesBlueImage from "../../../assets/images/dev-sources-blue.svg";
import NeonBlock from "../../../components/organisms/NeonBlock";

const reports = [
  {
    text: "July 2025",
    href: "https://gist.github.com/Dexaran/108b78e597fccb4ec9947dcd4df7ac95",
  },
  {
    text: "June 2025",
    href: "https://gist.github.com/Dexaran/108b78e597fccb4ec9947dcd4df7ac95",
  },
  {
    text: "May 2025",
    href: "https://gist.github.com/Dexaran/d5716b2c9dbd3edfc579b1486153f481",
  },
  {
    text: "April 2025",
    href: "https://gist.github.com/Dexaran/d5716b2c9dbd3edfc579b1486153f481",
  },
  {
    text: "March 2025",
    href: "https://gist.github.com/Dexaran/077c6c2a2a024cb90020d1b008f6b445",
  },
  {
    text: "February 2025",
    href: "https://gist.github.com/Dexaran/077c6c2a2a024cb90020d1b008f6b445",
  },
  {
    text: "January 2025",
    href: "https://gist.github.com/Dexaran/cb9d6c04402c09c7959546f4f7a8d392",
  },
  {
    text: "December 2024",
    href: "https://gist.github.com/Dexaran/cb9d6c04402c09c7959546f4f7a8d392",
  },
  {
    text: "November 2024",
    href: "https://gist.github.com/Dexaran/d53d29b3dd88279bbc3cf5c51dd6638b",
  },
  {
    text: "October 2024",
    href: "https://gist.github.com/Dexaran/8f222be80bc01ee8db0fae8b729459be",
  },
  {
    text: "September 2024",
    href: "https://gist.github.com/Dexaran/5722f3e7002b7010bdd4d8c10af9f4fe",
  },
  {
    text: "August 2024",
    href: "https://gist.github.com/Dexaran/c479c626a1af52853f5e396d2b7fcf9f",
  },
  {
    text: "July 2024",
    href: "https://gist.github.com/Dexaran/8abaa6fd3a38faca4b9792cceda450e8",
  },
  {
    text: "June 2024",
    href: "https://gist.github.com/Dexaran/c671c41dde06856ca20493126f3bb56f",
  },
  {
    text: "May 2024",
    href: "https://gist.github.com/Dexaran/a4d14551f3ddc58a96c5664c2f76b5b2",
  },
  {
    text: "April 2024",
    href: "https://gist.github.com/Dexaran/8556c6f63d9968e7e293980d7ddd1b23",
  },
  {
    text: "March 2024",
    href: "https://gist.github.com/Dexaran/2f805faf302366f42817d85aec14d1bc",
  },
  {
    text: "February 2024",
    href: "https://gist.github.com/Dexaran/1aacf32eae073f2e930fdf22b7cecd0b",
  },
  {
    text: "Round 2 Completion Report",
    href: "https://gist.github.com/Dexaran/d1e93da8f25dfbc9bd35575af085f2b3",
  },
  {
    text: "Pre-sale round 2 (04.12.2023 - 10.01.2024)",
    href: "https://www.reddit.com/r/CallistoCrypto/comments/18ajzj1/dex223_presale_round_2_announcement/",
  },
  {
    text: "December 2023",
    href: "https://gist.github.com/Dexaran/f0a62796ca4153c1ffc75ba9ca34ab70",
  },
  {
    text: "November 2023",
    href: "https://gist.github.com/Dexaran/62cece71a667695edad1967d701e9958",
  },
  {
    text: "Pre-sale round 1 (15.09.2023 - 16.09.2023)",
    href: "https://www.reddit.com/r/CallistoCrypto/comments/16jgvfx/dex223_presale_round_announcement/",
  },
];

export default function DevelopmentReports({ refEl }) {
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
        overlineText="Development reports"
        anchor="reports"
        leftContent={
          <>
            <div className="flex flex-col gap-5">
              <p className="text-18 lg:text-24 font-semibold text-primary-text">
                Summaries will be published here monthly.
              </p>
            </div>
            <ul className="mt-6">
              {reports.map((report) => {
                return (
                  <li className="border-b border-primary-border" key={report.text}>
                    <a
                      target="_blank"
                      href={report.href}
                      className="hover:text-green py-3.5 text-secondary-text flex gap-6 justify-between text-16 lg:text-18 duration-200"
                    >
                      <span>{report.text}</span>
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
