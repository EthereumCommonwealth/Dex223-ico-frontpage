import React from "react";
import styles from "./InfoSection.module.scss";
import NeonBlock from "../../organisms/NeonBlock";
import ArticleHeading from "../../atoms/ArticleHeading";
import ExternalTextLink from "../../atoms/ExternalTextLink";

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
    value: <>ERC-223 / Convertable to ERC-20 via <ExternalTextLink text="EIP-7417" href="https://github.com/Dexaran/EIPs/blob/patch-7/EIPS/eip-7417.md" /></>
  },
  {
    label: "Public sale price",
    value: "$0.001"
  }
]

export default function InfoSection() {
  return <NeonBlock
    icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M23.0762 41.2383C20.627 41.2383 18.3184 40.7695 16.1504 39.832C13.9941 38.8945 12.0898 37.5996 10.4375 35.9473C8.78516 34.2949 7.49023 32.3906 6.55273 30.2344C5.61523 28.0664 5.14648 25.7578 5.14648 23.3086C5.14648 20.8594 5.61523 18.5566 6.55273 16.4004C7.49023 14.2324 8.7793 12.3223 10.4199 10.6699C12.0723 9.01758 13.9766 7.72266 16.1328 6.78516C18.3008 5.84766 20.6094 5.37891 23.0586 5.37891C25.5078 5.37891 27.8164 5.84766 29.9844 6.78516C32.1523 7.72266 34.0625 9.01758 35.7148 10.6699C37.3672 12.3223 38.6621 14.2324 39.5996 16.4004C40.5371 18.5566 41.0059 20.8594 41.0059 23.3086C41.0059 25.7578 40.5371 28.0664 39.5996 30.2344C38.6621 32.3906 37.3672 34.2949 35.7148 35.9473C34.0625 37.5996 32.1523 38.8945 29.9844 39.832C27.8281 40.7695 25.5254 41.2383 23.0762 41.2383ZM23.0762 38.25C25.1504 38.25 27.0898 37.8633 28.8945 37.0898C30.6992 36.3164 32.2871 35.25 33.6582 33.8906C35.0293 32.5195 36.0957 30.9316 36.8574 29.127C37.6309 27.3223 38.0176 25.3828 38.0176 23.3086C38.0176 21.2344 37.6309 19.2949 36.8574 17.4902C36.084 15.6855 35.0117 14.0977 33.6406 12.7266C32.2812 11.3555 30.6934 10.2891 28.877 9.52734C27.0723 8.75391 25.1328 8.36719 23.0586 8.36719C20.9844 8.36719 19.0449 8.75391 17.2402 9.52734C15.4355 10.2891 13.8535 11.3555 12.4941 12.7266C11.1348 14.0977 10.0684 15.6855 9.29492 17.4902C8.5332 19.2949 8.15234 21.2344 8.15234 23.3086C8.15234 25.3828 8.5332 27.3223 9.29492 29.127C10.0684 30.9316 11.1348 32.5195 12.4941 33.8906C13.8652 35.25 15.4531 36.3164 17.2578 37.0898C19.0625 37.8633 21.002 38.25 23.0762 38.25ZM20 33.1348C19.6367 33.1348 19.332 33.0176 19.0859 32.7832C18.8398 32.5488 18.7168 32.2559 18.7168 31.9043C18.7168 31.5527 18.8398 31.2598 19.0859 31.0254C19.332 30.791 19.6367 30.6738 20 30.6738H22.1797V22.6055H20.2988C19.9355 22.6055 19.6309 22.4883 19.3848 22.2539C19.1387 22.0195 19.0156 21.7266 19.0156 21.375C19.0156 21.0234 19.1387 20.7305 19.3848 20.4961C19.6309 20.2617 19.9355 20.1445 20.2988 20.1445H23.6035C24.0488 20.1445 24.3887 20.291 24.623 20.584C24.8574 20.8652 24.9746 21.2461 24.9746 21.7266V30.6738H27.1543C27.5176 30.6738 27.8223 30.791 28.0684 31.0254C28.3145 31.2598 28.4375 31.5527 28.4375 31.9043C28.4375 32.2559 28.3145 32.5488 28.0684 32.7832C27.8223 33.0176 27.5176 33.1348 27.1543 33.1348H20ZM22.918 17.209C22.2852 17.209 21.7461 16.9863 21.3008 16.541C20.8555 16.0957 20.6328 15.5566 20.6328 14.9238C20.6328 14.2793 20.8555 13.7344 21.3008 13.2891C21.7461 12.8438 22.2852 12.6211 22.918 12.6211C23.5625 12.6211 24.1016 12.8438 24.5352 13.2891C24.9805 13.7344 25.2031 14.2793 25.2031 14.9238C25.2031 15.5566 24.9805 16.0957 24.5352 16.541C24.1016 16.9863 23.5625 17.209 22.918 17.209Z" fill="#F5FFF9"/>
    </svg>}
    color="green"
    overlineText="Info"
    leftContent={
      <>
        <ArticleHeading text="Token information" />
        <div className={styles.paragraphs}>
          <p className={styles.text}>Uniswap V3 daily trading volume is $883M at 29/08/2023. Assuming that all D223 tokens would be sold, if DEX223 will reach 5% of the Uniswap&apos;s trading volume with 0.2% taker fee the revenue of D223 holders will be $2,649,000 per month.</p>
          <p className={styles.text}>With this numbers the ROI for the D223 tokens purchased at a public sales price will be 397% with just claiming trading fees revenues for 1 year.</p>

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
        <img className={styles.tokenInfoImage2} src="/images/token-info/token-info-2.svg" alt=""/>
      </div>
    </div>}
  />;
}
