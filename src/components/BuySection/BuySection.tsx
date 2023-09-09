import React from "react";
import styles from "./BuySection.module.scss";
import clsx from "clsx";
import BannerLeftBlock from "../BannerLeftBlock";
import BannerRightBlock from "../BannerRightBlock";
import Header from "../sections/Header";

export default function BuySection() {

  return <div className={styles.buySection}>
    <div className={clsx("container", styles.outerVideoContainer)}>
      <div className={styles.videoWrapper}>
        <video playsInline autoPlay muted loop>
          <source src="/banner.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
    <Header />
    <main className={clsx(styles.main, "container")}>
      <div className={styles.buyERC223}>
        <BannerLeftBlock />
        <BannerRightBlock />
      </div>
    </main>
  </div>;
}
