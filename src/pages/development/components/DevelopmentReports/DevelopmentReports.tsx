import React, { useRef } from "react";
import styles from "./DevelopmentReports.module.scss";
import NeonBlock from "../../../../components/organisms/others/NeonBlock";
import clsx from "clsx";
import DevSourcesBlueImage from "../../../../assets/images/dev-sources-blue.svg";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Svg from "@/components/atoms/Svg";

const reports = [
  {
    text: "May 2024",
    href: "https://gist.github.com/Dexaran/a4d14551f3ddc58a96c5664c2f76b5b2"
  },
  {
    text: "April 2024",
    href: "https://gist.github.com/Dexaran/8556c6f63d9968e7e293980d7ddd1b23"
  },
  {
    text: "March 2024",
    href: "https://gist.github.com/Dexaran/2f805faf302366f42817d85aec14d1bc"
  },
  {
    text: "February 2024",
    href: "https://gist.github.com/Dexaran/1aacf32eae073f2e930fdf22b7cecd0b"
  },
  {
    text: "Round 2 Completion Report",
    href: "https://gist.github.com/Dexaran/d1e93da8f25dfbc9bd35575af085f2b3"
  },
  {
    text: "Pre-sale round 2 (04.12.2023 - 10.01.2024)",
    href: "https://www.reddit.com/r/CallistoCrypto/comments/18ajzj1/dex223_presale_round_2_announcement/"
  },
  {
    text: "December 2023",
    href: "https://gist.github.com/Dexaran/f0a62796ca4153c1ffc75ba9ca34ab70"
  },
  {
    text: "November 2023",
    href: "https://gist.github.com/Dexaran/62cece71a667695edad1967d701e9958"
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
