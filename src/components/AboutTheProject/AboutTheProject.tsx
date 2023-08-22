import React from "react";
import styles from "./AboutTheProject.module.scss";
import Image from "next/image";
import clsx from "clsx";
import ArticleTitle from "../ArticleTitle";

export default function AboutTheProject() {
  return <div className={clsx(styles.aboutTheProject, "container")}>
    <div className={styles.imageWrapper}>
      <Image width={534} height={608} src="/shield.svg" alt="" />
    </div>
    <div className={styles.textBlock}>
      <ArticleTitle text="About the project" />

      <h3 className={styles.heading}>The Revolutionary ERC-223 Based Exchange</h3>
      <p className={styles.paragraph}>
        Introducing DEX223, a game-changing decentralized exchange (DEX) built on the cutting-edge ERC-223 standard.
        Unlike traditional ERC-20-based exchanges, DEX223 leverages ERC-223&apos;s innovative token transfer mechanism,
        eliminating accidental fund losses and ensuring smooth interactions with smart contracts. Users
        can trade with confidence, knowing that their transactions are safeguarded by the improved security
        features of ERC-223.
      </p>
    </div>
  </div>;
}
