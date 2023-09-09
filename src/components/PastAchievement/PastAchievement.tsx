import React from "react";
import styles from "./PastAchievement.module.scss";
import ArticleTitle from "../ArticleTitle";
import ArticleHeading from "../ArticleHeading";
import clsx from "clsx";
import Text from "../atoms/Text";
import Spacer from "../atoms/Spacer";
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

    </div>
  </div>
}
