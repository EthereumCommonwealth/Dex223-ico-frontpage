import React from "react";
import styles from "./InfoSection.module.scss";
import NeonBlock from "../../../../components/organisms/NeonBlock";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import ExternalTextLink from "../../../../components/atoms/ExternalTextLink";
import Image from "next/image";

const infoFields = [
  {
    label: "Token name",
    value: "DEX223"
  },
  {
    label: "Network",
    value: "Ethereum"
  },
  {
    label: "Ticker",
    value: "D223"
  },
  {
    label: "Max supply",
    value: "8,000,000,000 D223"
  },
  {
    label: "Decimals",
    value: "18"
  },
  {
    label: "Standard",
    value: <>ERC-223 / Convertable to ERC-20 via <ExternalTextLink text="EIP-7417"
                                                                   href="https://github.com/Dexaran/EIPs/blob/patch-7/EIPS/eip-7417.md"/></>
  },
  {
    label: "Public sale price",
    value: "$0.001"
  }
]


export default function InfoSection() {
  return <div className={"container relative"}>
    <div className={styles.pattern}>
      <Image alt="" src="/images/patterns/green.svg" width={1000} height={1000}/>
    </div>
    <NeonBlock
      icon="info"
      color="green"
      overlineText="Info"
      leftContent={
        <>
          <ArticleHeading text="Token information"/>
          <div className={styles.paragraphs}>
            <p className={styles.text}>Uniswap V3 daily trading volume is $883M at 29/08/2023. Assuming that all D223
              tokens would be sold, if DEX223 will reach 5% of the Uniswap&apos;s trading volume with 0.2% taker fee the
              revenue of D223 holders will be $2,649,000 per month.</p>
            <p className={styles.text}>With this numbers the ROI for the D223 tokens purchased at a public sales price
              will be 397% with just claiming trading fees revenues for 1 year.</p>

          </div>

          {infoFields.map((infoField) => {
            return <div key={infoField.label} className={styles.infoRow}>
              <span className={styles.infoRowLabel}>{infoField.label}</span>
              <span className={styles.infoRowValue}>{infoField.value}</span>
            </div>
          })}
        </>
      }
      rightContent={<div className={styles.rightContent}>
        <div className={styles.imageWrapper}>
          <img className={styles.tokenInfoImage1} src="/images/token-info/token-info-1.svg" alt=""/>
          {/*<FirstImage />*/}
          <img className={styles.tokenInfoImage2} src="/images/token-info/token-info-2.svg" alt=""/>
        </div>
      </div>}
    />
  </div>
}
