import React from "react";
import styles from "./BannerLeftBlock.module.scss";
import Button from "../atoms/Button";
import Spacer from "../atoms/Spacer";

export default function BannerLeftBlock() {
  return <div className={styles.mainInfo}>
    <h1 className={styles.mainHeader}><span className={styles.green}>Dex223</span>: Decentralized exchange for <span className={styles.green}>ERC-223</span> & <span className={styles.purple}>ERC-20</span> tokens!</h1>
    <p className={styles.subheading}>Safe, gas-efficient, next generation fully decentralized exchange built with Ethereum smart-contracts.</p>
    <div className={styles.whitePaperButtonWrapper}>
      <Button variant="outlined">
                  <span className={styles.externalButton}>
                    Whitepaper
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <path d="M18.2227 15.3799C18.2227 15.6201 18.1406 15.8193 17.9766 15.9775C17.8184 16.1357 17.6338 16.2148 17.4229 16.2148C17.2061 16.2148 17.0186 16.1328 16.8604 15.9688C16.708 15.8047 16.6318 15.6201 16.6318 15.415V12.1631L16.79 8.05859L15.3398 9.70215L6.6123 18.4209C6.4541 18.5791 6.26953 18.6582 6.05859 18.6582C5.91211 18.6582 5.77734 18.6201 5.6543 18.5439C5.53125 18.4678 5.43164 18.3682 5.35547 18.2451C5.2793 18.1162 5.24121 17.9814 5.24121 17.8408C5.24121 17.6357 5.32324 17.4512 5.4873 17.2871L14.1973 8.55957L15.832 7.12695L11.543 7.26758H8.48438C8.2793 7.26758 8.09473 7.19141 7.93066 7.03906C7.77246 6.88086 7.69336 6.69629 7.69336 6.48535C7.69336 6.27441 7.76953 6.08984 7.92188 5.93164C8.07422 5.76758 8.27344 5.68555 8.51953 5.68555H17.3613C17.625 5.68555 17.833 5.76465 17.9854 5.92285C18.1377 6.08105 18.2139 6.28613 18.2139 6.53809L18.2227 15.3799Z" fill="currentColor"/>
                    </svg>
                  </span>
      </Button>
    </div>
    <div className={styles.howToBuy}>
      <div className={styles.diagonal3}>
        <div className={styles.inside} />
      </div>
      <h2 className={styles.additionalInfoHeader}>Status</h2>
      <p className={styles.paragraph}>
        DEX223 token sale: We have not yet announced the date nor the terms of our
        upcoming public token sale. We will do so via our social channels and this page. Stay tuned.
      </p>
      <p className={styles.paragraph}>
        Currently a private pre-sale of tokens is ongoing, contact dexaran@ethereumclassic.org for more details regarding the participation.
      </p>
    </div>
    <Spacer height={28} />

    <div className={styles.erc223Address}>
      <div className={styles.diagonal}>
        <div className={styles.inside3} />
      </div>
      <div className={styles.diagonal2}>
        <div className={styles.inside2} />
      </div>
      <h2 className={styles.additionalInfoHeader}>Subscribe to our newsletter</h2>
      <div className={styles.subscribe}>
        <input placeholder="Your email" type="text"/>
        <Button>Subscribe</Button>
      </div>
    </div>

  </div>

}
