import React, {useEffect, useRef, useState} from "react";
import styles from "./Tokenomics.module.scss";
import ArticleTitle from "../../ArticleTitle";
import clsx from "clsx";
import Text from "../../atoms/Text";
import Spacer from "../../atoms/Spacer";
import ArticleHeading from "../../ArticleHeading";
import NeonBlock from "../../organisms/NeonBlock";


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
      icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path
          d="M5.5 42C5.075 42 4.71875 41.8563 4.43125 41.5688C4.14375 41.2812 4 40.925 4 40.5V19.5C4 19.075 4.14375 18.7188 4.43125 18.4313C4.71875 18.1438 5.075 18 5.5 18H12.5C12.925 18 13.2812 18.1438 13.5688 18.4313C13.8562 18.7188 14 19.075 14 19.5V40.5C14 40.925 13.8562 41.2812 13.5688 41.5688C13.2812 41.8563 12.925 42 12.5 42H5.5ZM20.5 42C20.075 42 19.7188 41.8563 19.4313 41.5688C19.1438 41.2812 19 40.925 19 40.5V7.5C19 7.075 19.1438 6.71875 19.4313 6.43125C19.7188 6.14375 20.075 6 20.5 6H27.5C27.925 6 28.2812 6.14375 28.5688 6.43125C28.8563 6.71875 29 7.075 29 7.5V40.5C29 40.925 28.8563 41.2812 28.5688 41.5688C28.2812 41.8563 27.925 42 27.5 42H20.5ZM35.5 42C35.075 42 34.7188 41.8563 34.4312 41.5688C34.1438 41.2812 34 40.925 34 40.5V23.5C34 23.075 34.1438 22.7188 34.4312 22.4312C34.7188 22.1438 35.075 22 35.5 22H42.5C42.925 22 43.2812 22.1438 43.5688 22.4312C43.8563 22.7188 44 23.075 44 23.5V40.5C44 40.925 43.8563 41.2812 43.5688 41.5688C43.2812 41.8563 42.925 42 42.5 42H35.5Z"
          fill="#F5FFF9"/>
      </svg>}
      color="purple"
      overlineText="Allocation"
      differentColumns
      leftContent={
        <>
          <ArticleHeading text="Tokenomics"/>
          <p className={styles.text}>The original D223 tokens will be issued in November 2023 on Ethereum mainnet. Once
            DEX223 is deployed a fee will be charged for any on-platform trade. This fees will be redistributed among
            D223 token holders in proportion to their share. Unsold tokens will be subtracted from the total supply i.e.
            if the platform will accumulate revenue before public ICO round then 32% of the existing tokens will get the
            rights to claim the revenue as if 68% of tokens allocated for public sales didn&apos;t exist.</p>
          <Spacer height={20}/>
          <p className={styles.text}>Unsold tokens from pre-ICO sales and public sales will be re-allocated for the next
            public round until all tokens are sold. The development team adheres to the policy of financial
            transparency. A full financial report regarding the distribution of any funds collected from ICO or private
            sales will be published quarterly.</p>
          <Spacer height={24}/>
          <div className={styles.total}>
            <div className={styles.totalText}>
              <Text>Total</Text>
              <Text>100%</Text>
            </div>
            <Text variant={40}>$8,000,000</Text>
          </div>
        </>
      }
    />
    <div ref={ref}/>
    <div className="container">
      <div className={styles.chartWrapper}>
        <div className={styles.chart}>
          <div>
            <div className={clsx(styles.chartColumn1, isIntersected && styles.withAnimation)} style={{width: "100%"}}>
              <span className={styles.percentage}><Text variant={40}>3%</Text></span>
            </div>
          </div>
          <div>
            <div className={clsx(styles.chartColumn2, isIntersected && styles.withAnimation)} style={{width: "100%"}}>
              <span className={styles.percentage}><Text variant={40}>9.5%</Text></span>
            </div>
          </div>
          <div>
            <div className={clsx(styles.chartColumn3, isIntersected && styles.withAnimation)} style={{width: "100%"}}>
              <span className={styles.percentage}><Text variant={40}>9.5%</Text></span>
            </div>
          </div>
          <div>
            <div className={clsx(styles.chartColumn4, isIntersected && styles.withAnimation)} style={{width: "100%"}}>
              <span className={styles.percentage}><Text variant={40}>10%</Text></span>
            </div>
          </div>
          <div>
            <div className={clsx(styles.chartColumn5, isIntersected && styles.withAnimation)} style={{width: "100%"}}>
              <span className={styles.percentage}><Text variant={40}>68%</Text></span>
            </div>
          </div>
        </div>
        <Spacer height={20}/>
        {/*<div className={styles.labels}>*/}
        {/*  <div className={styles.columnLabel}>*/}
        {/*    <Text variant={20}>Marketing</Text>*/}
        {/*    <Text weight={500} variant={16}>$160,000</Text>*/}
        {/*  </div>*/}
        {/*  <div className={styles.columnLabel}>*/}
        {/*    <Text variant={20}>Development</Text>*/}
        {/*    <Text weight={500} variant={16}>$480,000</Text>*/}
        {/*  </div>*/}
        {/*  <div className={styles.columnLabel}>*/}
        {/*    <Text variant={20}>Liquidity</Text>*/}
        {/*    <Text weight={500} variant={16}>$640,000</Text>*/}
        {/*  </div>*/}
        {/*  <div className={styles.columnLabel}>*/}
        {/*    <Text variant={20}>Team</Text>*/}
        {/*    <Text weight={500} variant={16}>$640,000</Text>*/}
        {/*  </div>*/}
        {/*  <div className={styles.columnLabel}>*/}
        {/*    <Text variant={20}>Partnership</Text>*/}
        {/*    <Text weight={500} variant={16}>$960,000</Text>*/}
        {/*  </div>*/}
        {/*  <div className={styles.columnLabel}>*/}
        {/*    <Text variant={20}>Sale</Text>*/}
        {/*    <Text weight={500} variant={16}>$1,920,000</Text>*/}
        {/*  </div>*/}
        {/*  <div className={styles.columnLabel}>*/}
        {/*    <Text variant={20}>Ecosystem</Text>*/}
        {/*    <Text weight={500} variant={16}>$3,200,000</Text>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  </>;
}
