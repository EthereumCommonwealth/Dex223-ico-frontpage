import React, {useEffect, useRef} from "react";
import styles from "./References.module.scss";
import ArticleHeading from "../../atoms/ArticleHeading";
import Svg from "../../atoms/Svg";
import clsx from "clsx";
import DevSourcesImage from "../../../assets/images/dev-src-2.svg";
import NeonBlock from "../../organisms/NeonBlock";
import {useIntersectionObserver} from "../../../hooks/useIntersectionObserver";

const references = [
  {
    text: "DEX223 github repository",
    href: "#"
  },
  {
    text: "DEX223 smart contracts",
    href: "#"
  },
  {
    text: "Announcement repository",
    href: "#"
  },
  {
    text: "Research and development",
    href: "#"
  },
  {
    text: "Community Resources",
    href: "#"
  },
  {
    text: "Whitepaper",
    href: "#"
  }
];

export default function References({refEl}) {
  const referencesEntryRef = useRef();
  const referencesEntry = useIntersectionObserver(referencesEntryRef, {threshold: 0.6, freezeOnceVisible: true});
  // const referencesScrollEntry = useIntersectionObserver(referencesEntryRef, {threshold: 0.6});

  // useEffect(() => {
  //   if(referencesScrollEntry?.isIntersecting) {
  //     setActiveTab();
  //   }
  // }, [referencesScrollEntry?.isIntersecting, setActiveTab]);

  return <div>
    <div ref={refEl} />
    <NeonBlock
      icon="references"
      color="green"
      overlineText="References"
      anchor="references"
      leftContent={
        <>
          <ArticleHeading text="Lorem ipsum dolor sit amet"/>

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
            {references.map((reference) => {
              return <li key={reference.text} className={styles.problemItem}>
                <a target="_blank" href={reference.href} className={styles.problemItemLink}>
                  <span>{reference.text}</span>
                  <Svg iconName="forward"/>
                </a>
              </li>
            })}
          </ul>
        </>
      }
      rightContent={
        <div ref={referencesEntryRef} className={clsx(styles.rightContent, referencesEntry?.isIntersecting && "animated")}>
          <DevSourcesImage />
        </div>
      }
    />
  </div>
}
