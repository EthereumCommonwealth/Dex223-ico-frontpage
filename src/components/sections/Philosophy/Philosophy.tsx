import React, {useEffect, useRef, useState} from "react";
import styles from "./Philosophy.module.scss";
import NeonBlock from "../../organisms/NeonBlock";
import ArticleHeading from "../../atoms/ArticleHeading";
import PhilosophyImage from "../../../assets/images/ph.svg";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";
import clsx from "clsx";
import ShieldImage from "../../../assets/images/Shield.svg";

export default function Philosophy() {
  const ref = useRef();
  const entry = useIntersectionObserver(ref, {freezeOnceVisible: true, threshold: 0.85});

  const [addAnimation, setAddAnimation] = useState(false);

  useEffect(() => {
    if(entry?.isIntersecting) {
      setAddAnimation(true);
      setTimeout(() => {
        setAddAnimation(false);
      }, 1000);
    }
  }, [entry?.isIntersecting])

  console.log(entry);

  return <>
    <div className="container" style={{position: "relative"}}>
      <div className={styles.soyBg}>
        <ShieldImage />
      </div>
    </div>
    <NeonBlock
      icon="target"
      color="green"
      overlineText="Our Goals"
      anchor="philosophy"
      leftContent={
        <>
          <ArticleHeading text="Philosophy"/>
          <div className={styles.paragraphs}>
            <p className={styles.text}>Our goal is to build a fully decentralized exchange with an emphasis on security.
              We value the safety of users funds above anything else and we will do anything to prevent any losses that
              may occur either due to a user mistake, hackers attack or any other means.</p>
            <p className={styles.text}>The exchange must be built in a way that will allow all its components and
              processes to operate smoothly independently from the development team which includes (1) smart-contracts,
              (2) listings of new tokens, (3) interface.</p>
            <p className={styles.text}>We are constructing a truly decentralized, unstoppable application that will
              operate forever once launched.</p>
          </div>
        </>
      }
      rightContent={
        <div ref={ref} className={clsx(styles.rightBlock, entry?.isIntersecting && "animated", addAnimation && "removeAfterAnimated")}>
          <PhilosophyImage />
        </div>
      }
    />
  </>;
}
