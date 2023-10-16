import React, {useRef} from "react";
import styles from "./DevelopmentReports.module.scss";
import NeonBlock from "../../organisms/NeonBlock";
import clsx from "clsx";
import DevSourcesBlueImage from "../../../assets/images/dev-sources-blue.svg";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";

const reports = [
  {
    text: "November 2023",
    href: "#"
  },
  {
    text: "October 2023",
    href: "#"
  },
  {
    text: "September 2023",
    href: "#"
  },
  {
    text: "August 2023",
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
            <p className={styles.text}>Summaries will be published here monthly. We will publish our first
              development report in early November. Stay tuned.
            </p>
          </div>
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
