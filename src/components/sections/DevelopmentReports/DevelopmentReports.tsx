import React, {useRef} from "react";
import styles from "./DevelopmentReports.module.scss";
import NeonBlock from "../../organisms/NeonBlock";
import clsx from "clsx";
import DevSourcesBlueImage from "../../../assets/images/dev-sources-blue.svg";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";
import Svg from "@/components/atoms/Svg";

const reports = [
  {
    text: "November 2023",
    href: "#"
  }
]

export default function DevelopmentReports({refEl}) {
  const reportsEntryRef = useRef();
  const reportsEntry = useIntersectionObserver(reportsEntryRef, {threshold: 0.6, freezeOnceVisible: true});

  return <div>
    <div ref={refEl} />
    <NeonBlock
      icon="reports"
      color="blue"
      overlineText="Development reports"
      anchor="reports"
      leftContent={
        <>
          <div className={styles.paragraphs}>
            <p className={styles.biggerText}>Summaries will be published here monthly. We will publish our first
              development report in early November. Stay tuned.
            </p>
          </div>
          <ul className={styles.problemsList}>
            {reports.map((report) => {
              return <li key={report.text} className={styles.problemItem}>
                <a target="_blank" href={report.href} className={styles.problemItemLink}>
                  <span>{report.text}</span>
                  <div className={styles.linkRightContent}>
                    <span>Coming soon</span>
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
          <DevSourcesBlueImage />
        </div>
      }
    />
  </div>;
}
