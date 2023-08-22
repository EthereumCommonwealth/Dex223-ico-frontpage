import React from "react";
import styles from "./TokenInformation.module.scss";
import ArticleTitle from "../ArticleTitle";
import clsx from "clsx";
import Image from "next/image";
import ArticleHeading from "../ArticleHeading";
import Text from "../Text";
import Spacer from "../Spacer";

export default function TokenInformation() {
  return <div className={clsx(styles.aboutTheProject, "container")}>
    <div className={styles.leftPart}>
      <div className={styles.imageWrapper}>
        <img className={styles.tokenInfoImage1} src="/images/token-info/token-info-1.svg" alt=""/>
        <img className={styles.tokenInfoImage2} src="/images/token-info/token-info-2.svg" alt=""/>
      </div>
    </div>
    <div className={styles.textBlock}>
      <ArticleTitle text="info" />
      <ArticleHeading text="Token information" />
      <Text variant={20} color="secondary">
        Delve into the key aspects of token information,
        from supply and distribution to utility and governance.
      </Text>
      <Spacer height={24}/>
      <div className={styles.info}>
        <div className={styles.infoRow}>
          <Text color="secondary" variant={20}>Token name</Text>
          <Text variant={20}>DEX223</Text>
        </div>
        <div className={styles.infoRow}>
          <Text color="secondary" variant={20}>Network</Text>
          <Text variant={20}>Ethereum</Text>
        </div>
        <div className={styles.infoRow}>
          <Text color="secondary" variant={20}>Token Ticker</Text>
          <Text variant={20}>DEX223</Text>
        </div>
        <div className={styles.infoRow}>
          <Text color="secondary" variant={20}>Max supply</Text>
          <Text variant={20}>100,000,000 DEX223</Text>
        </div>
        <div className={styles.infoRow}>
          <Text color="secondary" variant={20}>Decimals</Text>
          <Text variant={20}>18</Text>
        </div>
      </div>
    </div>
  </div>;
}
