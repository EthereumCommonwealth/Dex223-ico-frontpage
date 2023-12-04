import React, { useEffect, useRef, useState } from "react";
import styles from "./Tokenomics.module.scss";
import clsx from "clsx";
import Spacer from "../../../../components/atoms/Spacer";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import NeonBlock from "../../../../components/organisms/others/NeonBlock";
import Image from "next/image";
import ExternalTextLink from "@/components/atoms/ExternalTextLink";

export default function Tokenomics() {
  const [isIntersected, setIsIntersected] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersected(true);
        observer.disconnect()
      }
    });

    if (ref.current && !isIntersected) {
      observer.observe(ref.current!);
    }

    return () => observer.disconnect();
  }, [isIntersected]);


  return <>
    <NeonBlock
      icon="chart"
      color="purple"
      overlineText="Allocation"
      differentColumns
      anchor="tokenomics"
      leftContent={
        <>
          <ArticleHeading text="Tokenomics"/>
          <p className={styles.subheading}>DEX223 tokenomics is based on the <ExternalTextLink text="launch model of the Ethereum platform" href="https://web.archive.org/web/20140824160811/https://www.ethereum.org/" />, one of the most successful crypto projects out there.</p>
          <div className={styles.paragraphs}>
            <p className={styles.text}>The original D223 tokens will be issued in November 2023 on Ethereum mainnet.
              Once
              DEX223 is deployed a fee will be charged for any on-platform trade. This fees will be redistributed among
              D223 token holders in proportion to their share. Unsold tokens will be subtracted from the total supply
              i.e.
              if the platform will accumulate revenue before public ICO round then 32% of the existing tokens will get
              the
              rights to claim the revenue as if 68% of tokens allocated for public sales didn&apos;t exist.</p>
            <p className={styles.text}>Unsold tokens from pre-ICO sales and public sales will be re-allocated for the
              next
              public round until all tokens are sold. The development team adheres to the policy of financial
              transparency. A full financial report regarding the distribution of any funds collected from ICO or
              private
              sales will be published quarterly.</p>
          </div>
          <Spacer height={24}/>
          <div className={styles.total}>
            <div className={styles.totalText}>
              <span>Total</span>
              <span>100%</span>
            </div>
            <span className={styles.totalValue}>8,000,000,000 D223</span>
          </div>
        </>
      }
    />
    <div ref={ref}/>
    <div className="container relative">
      <div className={styles.pattern}>
        <Image alt="" src="/images/patterns/purple.svg" width={883} height={890}/>
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.chart}>
          <div>
            <div className={clsx(styles.chartColumn1, isIntersected && styles.withAnimation)} style={{ width: "100%" }}>
              <span className={styles.percentage}><span>3%</span></span>
            </div>
          </div>
          <div>
            <div className={clsx(styles.chartColumn2, isIntersected && styles.withAnimation)} style={{ width: "100%" }}>
              <span className={styles.percentage}><span>9.5%</span></span>
            </div>
          </div>
          <div>
            <div className={clsx(styles.chartColumn3, isIntersected && styles.withAnimation)} style={{ width: "100%" }}>
              <span className={styles.percentage}><span>9.5%</span></span>
            </div>
          </div>
          <div>
            <div className={clsx(styles.chartColumn4, isIntersected && styles.withAnimation)} style={{ width: "100%" }}>
              <span className={styles.percentage}><span>10%</span></span>
            </div>
          </div>
          <div>
            <div className={clsx(styles.chartColumn5, isIntersected && styles.withAnimation)} style={{ width: "100%" }}>
              <span className={styles.percentage}><span>68%</span></span>
            </div>
          </div>
        </div>
        <Spacer height={20}/>
      </div>
    </div>
    <div className="container">
      <div className={styles.labels}>
        <div className={styles.columnLabel}>
          <span className={styles.labelText}>Discounted pre-ICO sales</span>
          <span className={styles.labelValue}>240,000,000 D223 <span className={styles.labelPercentage}>3%</span></span>
        </div>
        <div className={styles.columnLabel}>
          <span className={styles.labelText}>Core team allocation</span>
          <span className={styles.labelValue}>760,000,000 D223 <span
            className={styles.labelPercentage}>9.5%</span></span>
        </div>
        <div className={styles.columnLabel}>
          <span className={styles.labelText}>Project development & team incentivization</span>
          <span className={styles.labelValue}>760,000,000 D223 <span
            className={styles.labelPercentage}>9.5%</span></span>
        </div>
        <div className={styles.columnLabel}>
          <span className={styles.labelText}>Private investment rounds</span>
          <span className={styles.labelValue}>800,000,000 D223 <span
            className={styles.labelPercentage}>10%</span></span>
        </div>
        <div className={styles.columnLabel}>
          <span className={styles.labelText}>Public sales</span>
          <span className={styles.labelValue}>5,440,000,000 D223 <span
            className={styles.labelPercentage}>68%</span></span>
        </div>
      </div>
    </div>
  </>;
}
