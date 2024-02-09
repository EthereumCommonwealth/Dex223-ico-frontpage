import React, { useRef } from "react";
import styles from "./DevelopmentReports.module.scss";
import NeonBlock from "../../../../components/organisms/others/NeonBlock";
import clsx from "clsx";
import DevSourcesBlueImage from "../../../../assets/images/dev-sources-blue.svg";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Svg from "@/components/atoms/Svg";

const reports = [
  {
    text: "February 2024",
    href: "https://dexaran820.medium.com/dex223-development-report-2-8-2024-639c9900b3b2"
  },
  {
    text: "Round 2 Completion Report",
    href: "https://dexaran820.medium.com/dex223-pre-sale-round-2-completion-report-14f09ab079cc"
  },
  {
    text: "Pre-sale round 2 (04.12.2023 - 10.01.2024)",
    href: "https://www.reddit.com/r/CallistoCrypto/comments/18ajzj1/dex223_presale_round_2_announcement/"
  },
  {
    text: "December 2023",
    href: "https://dexaran820.medium.com/dex223-development-report-12-2-2023-4c16487fb7ed"
  },
  {
    text: "November 2023",
    href: "https://dexaran820.medium.com/dex223-development-report-11-2-2023-e0d51552ba5f"
  },
  {
    text: "Pre-sale round 1 (15.09.2023 - 16.09.2023)",
    href: "https://www.reddit.com/r/CallistoCrypto/comments/16jgvfx/dex223_presale_round_announcement/"
  }
]

export default function DevelopmentReports({ refEl }) {
  const reportsEntryRef = useRef();
  const reportsEntry = useIntersectionObserver(reportsEntryRef, { threshold: 0.6, freezeOnceVisible: true });

  return <div>
    <div ref={refEl}/>
    <NeonBlock
      icon="reports"
      color="blue"
      overlineText="Development reports"
      anchor="reports"
      leftContent={
        <>
          <div className={styles.paragraphs}>
            <p className={styles.biggerText}>Summaries will be published here monthly.
            </p>
          </div>
          <ul className={styles.problemsList}>
            {reports.map((report) => {
              return <li key={report.text} className={styles.problemItem}>
                <a target="_blank" href={report.href} className={styles.problemItemLink}>
                  <span>{report.text}</span>
                  <div className={styles.linkRightContent}>
                    <Svg iconName="forward"/>
                  </div>
                </a>
              </li>
            })}
          </ul>
        </>
      }
      rightContent={
        <div ref={reportsEntryRef} className={clsx(styles.rightContent, reportsEntry?.isIntersecting && "animated")}>
          <DevSourcesBlueImage/>
        </div>
      }
    />
  </div>;
}
