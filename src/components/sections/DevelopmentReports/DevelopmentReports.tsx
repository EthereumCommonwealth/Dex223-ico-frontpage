import React, {useEffect, useRef} from "react";
import styles from "./DevelopmentReports.module.scss";
import NeonBlock from "../../organisms/NeonBlock";
import ArticleHeading from "../../atoms/ArticleHeading";
import Svg from "../../atoms/Svg";
import clsx from "clsx";
import DevSourcesBlueImage from "../../../assets/images/dev-sources-blue.svg";
import {useIntersectionObserver} from "../../../hooks/useIntersectionObserver";

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
  const reportsScrollEntry = useIntersectionObserver(reportsEntryRef, {threshold: 0.5});

  // useEffect(() => {
  //   if(reportsScrollEntry?.isIntersecting) {
  //     setActiveTab();
  //   }
  // }, [reportsScrollEntry?.isIntersecting, setActiveTab]);

  return <div>
    <div ref={refEl} />
    <NeonBlock
      icon="reports"
      color="blue"
      overlineText="Development reports"
      anchor="reports"
      leftContent={
        <>
          <ArticleHeading text="Lorem ipsum dolor sit amet" />
          <div className={styles.paragraphs}>
            <p className={styles.text}>Lorem ipsum dolor sit amet
              Lorem ipsum dolor sit amet consectetur. Dolor pretium maecenas congue urna ultrices. Consectetur
              vivamus arcu enim quis integer consequat ultricies. Ipsum quam nulla quam vitae
              accumsan vulputate arcu urna vulputate. Egestas molestie posuere gravida aliquam
              nunc arcu non adipiscing. Fermentum faucibus enim nibh malesuada a. Lacus neque
              cursus sit auctor blandit velit ullamcorper integer malesuada.
            </p>
          </div>
          <ul className={styles.problemsList}>
            {reports.map((report) => {
              return <li key={report.text} className={styles.problemItem}>
                <a target="_blank" href={report.href} className={styles.problemItemLink}>
                  <span>{report.text}</span>
                  <Svg iconName="forward"/>
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
