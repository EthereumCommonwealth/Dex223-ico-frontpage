import React from "react";
import styles from "./InfoSection.module.scss";
import NeonBlock from "../../../../components/organisms/others/NeonBlock";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import TextLink from "../../../../components/atoms/ExternalTextLink";
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
    label: "Address",
    value: <a target="_blank" href="https://etherscan.io/address/0xcce968120e6ded56f32fbfe5a2ec06cbf1e7c8ed">0xc&shy;Ce968120e&shy;6Ded56F32f&shy;bfe5A2Ec0&shy;6CBF1e7&shy;c8ED</a>
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
    value: <>ERC-223 / Convertable to ERC-20 via <TextLink text="EIP-7417"
                                                           href="https://eips.ethereum.org/EIPS/eip-7417"/></>
  },
  {
    label: "Public sale price",
    value: "$0.001"
  }
]


export default function InfoSection() {
  return <div className={"relative"}>
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
            <p className={styles.text}>With these numbers the ROI for the D223 tokens purchased at a public sales price
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
