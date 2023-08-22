import React, {useEffect, useRef, useState} from "react";
import styles from "./Tokenomics.module.scss";
import ArticleTitle from "../ArticleTitle";
import clsx from "clsx";
import Text from "../Text";
import Spacer from "../Spacer";
import ArticleHeading from "../ArticleHeading";



export default function Tokenomics() {
  const [isIntersected, setIsIntersected] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        setIsIntersected(true);
        observer.disconnect()
      }
    });

    if(ref.current && !isIntersected) {
      observer.observe(ref.current!);
    }

    return () => observer.disconnect();
  }, [isIntersected]);



  return <div className="container">

    <div ref={ref} />
    <div className={styles.chartWrapper}>
      <div className={styles.articleInfo}>
        <ArticleTitle text="Allocation" />
        <ArticleHeading text="Tokenomics" />
        <Text variant={20} color="secondary">
          Tokenomics refers to the economic system and mechanics surrounding
          a cryptocurrency or blockchain project.
        </Text>
        <Spacer height={24} />
        <div className={styles.total}>
          <div className={styles.totalText}>
            <Text>Total</Text>
            <Text>100%</Text>
          </div>
          <Text variant={40}>$8,000,000</Text>
        </div>
      </div>
      <div className={styles.chart}>
        <div>
          <span className={styles.percentage}><Text variant={40}>2%</Text></span>
          <div className={clsx(styles.chartColumn1, isIntersected && styles.withAnimation)} style={{ width: "100%"}} />
        </div>
        <div>
          <span className={styles.percentage}><Text variant={40}>6%</Text></span>
          <div className={clsx(styles.chartColumn2, isIntersected && styles.withAnimation)} style={{ width: "100%"}} />
        </div>
        <div>
          <span className={styles.percentage}><Text variant={40}>8%</Text></span>
          <div className={clsx(styles.chartColumn3, isIntersected && styles.withAnimation)} style={{ width: "100%"}} />
        </div>
        <div>
          <span className={styles.percentage}><Text variant={40}>8%</Text></span>
          <div className={clsx(styles.chartColumn4, isIntersected && styles.withAnimation)} style={{ width: "100%"}} />
        </div>
        <div>
          <span className={styles.percentage}><Text variant={40}>12%</Text></span>
          <div className={clsx(styles.chartColumn5, isIntersected && styles.withAnimation)} style={{ width: "100%"}} />
        </div>
        <div>
          <span className={styles.percentage}><Text variant={40}>24%</Text></span>
          <div className={clsx(styles.chartColumn6, isIntersected && styles.withAnimation)} style={{ width: "100%"}} />
        </div>
        <div>
          <span className={styles.percentage}><Text variant={40}>40%</Text></span>
          <div className={clsx(styles.chartColumn7, isIntersected && styles.withAnimation)} style={{ width: "100%"}} />
        </div>
      </div>
      <Spacer height={20} />
      <div className={styles.labels}>
        <div className={styles.columnLabel}>
          <Text variant={20}>Marketing</Text>
          <Text weight={500} variant={16}>$160,000</Text>
        </div>
        <div className={styles.columnLabel}>
          <Text variant={20}>Development</Text>
          <Text weight={500} variant={16}>$480,000</Text>
        </div>
        <div className={styles.columnLabel}>
          <Text variant={20}>Liquidity</Text>
          <Text weight={500} variant={16}>$640,000</Text>
        </div>
        <div className={styles.columnLabel}>
          <Text variant={20}>Team</Text>
          <Text weight={500} variant={16}>$640,000</Text>
        </div>
        <div className={styles.columnLabel}>
          <Text variant={20}>Partnership</Text>
          <Text weight={500} variant={16}>$960,000</Text>
        </div>
        <div className={styles.columnLabel}>
          <Text variant={20}>Sale</Text>
          <Text weight={500} variant={16}>$1,920,000</Text>
        </div>
        <div className={styles.columnLabel}>
          <Text variant={20}>Ecosystem</Text>
          <Text weight={500} variant={16}>$3,200,000</Text>
        </div>
      </div>
    </div>
  </div>;
}
