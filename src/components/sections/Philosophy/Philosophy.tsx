import React from "react";
import styles from "./Philosophy.module.scss";
import NeonBlock from "../../organisms/NeonBlock";
import ArticleHeading from "../../atoms/ArticleHeading";
import Svg from "../../atoms/Svg";

export default function Philosophy() {
  return <>
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
        <div className={styles.rightBlock}>
          <img src="/images/philosophy.svg" alt=""/>
        </div>
      }
    />
  </>;
}
