import React from "react";
import styles from "./PastAchievement.module.scss";
import ArticleTitle from "../ArticleTitle";
import ArticleHeading from "../ArticleHeading";
import clsx from "clsx";
import Text from "../Text";
import Spacer from "../Spacer";
import Image from "next/image";

export default function PastAchievement() {
  return <div className={clsx(styles.aboutTheProject, "container")}>
    <div className={styles.leftPart}>
      <div className={styles.imageWrapper}>
        <Image quality={100} src="/images/achievements/soy.png" width={534} height={800} alt="" />
      </div>
    </div>
    <div className={styles.textBlock}>
      <ArticleTitle text="Building Trust" />
      <ArticleHeading text={<span>Introducing our Past <br /> Achievement - <a className={styles.soyLink} href="#">Soy.Finance</a></span>} />
      <ul className={styles.list}>
        <li className={styles.option}>
          <Text tag="h4" variant={24} weight={600}>Proven Enterprise Experience</Text>
          <Text color="secondary" variant={20}>Our team&apos;s credibility shines through our collaboration with <a className={styles.soyLink} href="#">Callisto Enterprise</a>,
            where we developed a cutting-edge exchange that met their specific needs and standards.</Text>
        </li>
        <li className={styles.option}>
          <Text tag="h4" variant={24} weight={600}>Unblemished Security Record</Text>
          <Text color="secondary" variant={20}>Trust is paramount in the crypto world, and we&apos;re proud to share that our exchange has
            remained unhacked for three years, underlining our relentless commitment to security.</Text>
        </li>
        <li className={styles.option}>
          <Text tag="h4" variant={24} weight={600}>Next-Level Efficiency with ERC-223</Text>
          <Text color="secondary" variant={20}>Not only does ERC-223  offer the same reliability as ERC-20, but they also burn 40K
            less gas, translating to cost savings and a greener footprint. Here are ERC-20 transactions and here are ERC-223.</Text>
        </li>
      </ul>
    </div>
  </div>
}
