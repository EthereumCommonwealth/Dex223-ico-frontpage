import React, { useRef } from "react";
import styles from "./BuildingTrust.module.scss";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import NeonBlock from "../../../../components/organisms/others/NeonBlock";
import clsx from "clsx";
import { useIntersectionObserver } from "../../../../hooks/useIntersectionObserver";

export default function BuildingTrust() {
  const ref = useRef();
  const entry = useIntersectionObserver(ref, { threshold: 0.85, freezeOnceVisible: true })

  return <div>
    <div className="container" style={{ position: "relative" }}>
      <div className={styles.soyBg}>
        <img src="/images/soy-bg.svg" alt=""/>
      </div>
    </div>
    <NeonBlock
      icon="soy-logo"
      color="purple"
      overlineText="BUILDING TRUST"
      leftContent={
        <>
          <ArticleHeading text={<span>Introducing our Past <br/> Achievement - <a className={styles.soyLink}
                                                                                  href="https://soy.finance"
                                                                                  target="_blank">Soy.Finance</a></span>}/>
          <ul className={styles.list}>
            <li className={styles.option}>
              <h4 className={styles.listTitle}>Proven Enterprise Experience</h4>
              <p className={styles.listText}>Our team&apos;s credibility shines through our collaboration with <a
                target="_blank" className={styles.soyLink} href="https://www.callistoenterprise.com/">Callisto
                Enterprise</a>,
                where we developed a cutting-edge exchange that met their specific needs and standards.</p>
            </li>
            <li className={styles.option}>
              <h4 className={styles.listTitle}>Unblemished Security Record</h4>
              <p className={styles.listText}>Trust is paramount in the crypto world, and we&apos;re proud to share that
                our exchange has
                remained unhacked for three years, underlining our relentless commitment to security.</p>
            </li>
            <li className={styles.option}>
              <h4 className={styles.listTitle}>Next-Level Efficiency with ERC-223</h4>
              <p className={styles.listText}>Not only does ERC-223 offer the same reliability as ERC-20, but they also
                burn 40K
                less gas, translating to cost savings and a greener footprint. Here are ERC-20 transactions and here are
                ERC-223.</p>
            </li>
          </ul>
        </>
      }
      rightContent={<div ref={ref} className={clsx(styles.rightContent, entry?.isIntersecting && styles.animated)}>
        <img className={styles.img1} src="/images/soy-screen-1.png" alt=""/>
        <img className={styles.img2} src="/images/soy-screen-2.png" alt=""/>
        <img className={styles.img3} src="/images/soy-screen-3.png" alt=""/>
        <img className={styles.img4} src="/images/soy-screen-4.png" alt=""/>
      </div>}
    />;
  </div>
}
