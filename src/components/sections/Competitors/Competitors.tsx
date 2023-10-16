import React, {useRef} from "react";
import styles from "./Competitors.module.scss";
import ArticleHeading from "../../atoms/ArticleHeading";
import Spacer from "../../atoms/Spacer";
import {
  comparativeTableData
} from "./parameters";
import clsx from "clsx";
import NeonBlock from "../../organisms/NeonBlock";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";
import Image from "next/image";

const imagesRow: (string | React.JSX.Element)[] = [
  "Parameters",
  <Image key={1} width={97} height={24} src="/images/comp-dex-logo.svg" alt=""/>,
  <Image key={2} width={124} height={32} src="/images/comp-uniswap-logo.svg" alt=""/>,
  <Image key={3} width={63} height={20} src="/images/comp-dxdy-logo.svg" alt=""/>,
  <Image key={4} width={109} height={32} src="/images/comp-kine-logo.svg" alt=""/>,
  <Image key={5} width={83} height={24} src="/images/curve-logo-full.png" alt=""/>
];

export default function Competitors() {
  const ref = useRef();
  const entry = useIntersectionObserver(ref, {threshold: 1, freezeOnceVisible: true})

  return <>
  <NeonBlock
    icon="flag"
    color="blue"
    overlineText="Competitors"
    leftContent={
      <>
        <ArticleHeading text="Comparative analysis" />
        <Spacer height={36} />
      </>
    }
  />
    <div className={clsx("container", styles.competitorsTableWrapper)}>
      <div className={styles.pattern}>
        <Image alt="" src="/images/patterns/blue.svg" width={1000} height={1000} />
      </div>
      <div className={styles.competitorsTable}>
        {imagesRow.map((image, index) => {
          return <div key={index} className={clsx(styles.cell, index !== 0 && styles.centered)}>
            {image}
          </div>
        })}

        {comparativeTableData.map((row, rowIndex) => {
            return row.map((value, index) => (
              <div key={index} className={clsx(styles.cell, rowIndex % 2 === 0 && styles.light)}>{value}</div>
            ))
        })}

        <div className={clsx(styles.dexBorder, entry?.isIntersecting && styles.animate)} ref={ref} />
      </div>
    </div>
  </>;
}
