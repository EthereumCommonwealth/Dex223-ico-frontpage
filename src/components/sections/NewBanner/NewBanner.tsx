import React, {ChangeEvent, useCallback, useState} from "react";
import styles from "./NewBanner.module.scss";
import Button from "../../atoms/Button";
import ExternalTextLink from "../../atoms/ExternalTextLink";
import clsx from "clsx";
import BannerRightBlock from "../../organisms/BannerRightBlock";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../lottie/banner.json";
import {useSnackbar} from "../../../providers/SnackbarProvider";
import Preloader from "../../atoms/Preloader";
import Spacer from "../../atoms/Spacer";

export default function NewBanner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const {showMessage} = useSnackbar();

  const handleEmailSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("https://mail.dex223.io/email-notification/notification/save-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput
        })
      });
      const data = await res.json();

      console.log(data);
      if(data.created) {
        showMessage("You have successfully subscribed to our newsletter");
      }

      if(res.status === 400) {
        if(data.detail) {
          showMessage(data.detail, "error");
        }
      }

      if(res.status === 422) {
        showMessage("Error: invalid email", "error");
      }

      setIsSubmitting(false);
    } catch (e) {
      console.log(e);
      showMessage("Unknown error", "error");
      setIsSubmitting(false);
    }
  }, [emailInput, showMessage]);

  return <div className="container">
    <div className={styles.gridWrapper}>
      <div className={styles.bannerText}>
        <h1 className={styles.mainHeader}><span className={styles.green}>Dex223</span>: Decentralized exchange for <span className={styles.green}>ERC-223</span> & <span className={styles.purple}>ERC-20</span> tokens!</h1>
        <p className={styles.subheading}>Safe, gas-efficient, next generation fully decentralized exchange built with Ethereum smart-contracts.</p>
        <Spacer height={40} />
        {/*<div className={styles.whitePaperButtonWrapper}>*/}
        {/*  <Button variant="outlined">*/}
        {/*          <span className={styles.externalButton}>*/}
        {/*            Whitepaper*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">*/}
        {/*              <path d="M18.2227 15.3799C18.2227 15.6201 18.1406 15.8193 17.9766 15.9775C17.8184 16.1357 17.6338 16.2148 17.4229 16.2148C17.2061 16.2148 17.0186 16.1328 16.8604 15.9688C16.708 15.8047 16.6318 15.6201 16.6318 15.415V12.1631L16.79 8.05859L15.3398 9.70215L6.6123 18.4209C6.4541 18.5791 6.26953 18.6582 6.05859 18.6582C5.91211 18.6582 5.77734 18.6201 5.6543 18.5439C5.53125 18.4678 5.43164 18.3682 5.35547 18.2451C5.2793 18.1162 5.24121 17.9814 5.24121 17.8408C5.24121 17.6357 5.32324 17.4512 5.4873 17.2871L14.1973 8.55957L15.832 7.12695L11.543 7.26758H8.48438C8.2793 7.26758 8.09473 7.19141 7.93066 7.03906C7.77246 6.88086 7.69336 6.69629 7.69336 6.48535C7.69336 6.27441 7.76953 6.08984 7.92188 5.93164C8.07422 5.76758 8.27344 5.68555 8.51953 5.68555H17.3613C17.625 5.68555 17.833 5.76465 17.9854 5.92285C18.1377 6.08105 18.2139 6.28613 18.2139 6.53809L18.2227 15.3799Z" fill="currentColor"/>*/}
        {/*            </svg>*/}
        {/*          </span>*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <div className={styles.blockWithNeonWrapper}>
          <div className={styles.neonContainer}>
            <div className={styles.neonImage}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38 44H32C31.4333 44 30.9583 43.8083 30.575 43.425C30.1917 43.0417 30 42.5667 30 42C30 41.4333 30.1917 40.9583 30.575 40.575C30.9583 40.1917 31.4333 40 32 40H38V20H10V26C10 26.5667 9.80833 27.0417 9.425 27.425C9.04167 27.8083 8.56667 28 8 28C7.43333 28 6.95833 27.8083 6.575 27.425C6.19167 27.0417 6 26.5667 6 26V12C6 10.9 6.39167 9.95833 7.175 9.175C7.95833 8.39167 8.9 8 10 8H12V6C12 5.43333 12.1917 4.95833 12.575 4.575C12.9583 4.19167 13.4333 4 14 4C14.5667 4 15.0417 4.19167 15.425 4.575C15.8083 4.95833 16 5.43333 16 6V8H32V6C32 5.43333 32.1917 4.95833 32.575 4.575C32.9583 4.19167 33.4333 4 34 4C34.5667 4 35.0417 4.19167 35.425 4.575C35.8083 4.95833 36 5.43333 36 6V8H38C39.1 8 40.0417 8.39167 40.825 9.175C41.6083 9.95833 42 10.9 42 12V40C42 41.1 41.6083 42.0417 40.825 42.825C40.0417 43.6083 39.1 44 38 44ZM18.35 40H4C3.43333 40 2.95833 39.8083 2.575 39.425C2.19167 39.0417 2 38.5667 2 38C2 37.4333 2.19167 36.9583 2.575 36.575C2.95833 36.1917 3.43333 36 4 36H18.35L14.6 32.2C14.2333 31.8333 14.0417 31.375 14.025 30.825C14.0083 30.275 14.2 29.8 14.6 29.4C14.9667 29.0333 15.4333 28.85 16 28.85C16.5667 28.85 17.0333 29.0333 17.4 29.4L24.6 36.6C25 37 25.2 37.4667 25.2 38C25.2 38.5333 25 39 24.6 39.4L17.4 46.6C17.0333 46.9667 16.575 47.1583 16.025 47.175C15.475 47.1917 15 47 14.6 46.6C14.2333 46.2333 14.05 45.7667 14.05 45.2C14.05 44.6333 14.2333 44.1667 14.6 43.8L18.35 40Z" fill="white"/>
              </svg>
            </div>
            <div className={styles.neonLine} />
          </div>
          <div className={styles.content}>
            <h2 className={styles.additionalInfoHeader}>Status</h2>
            <p className={styles.paragraph}>
              DEX223 token sale: We have not yet announced the date nor the terms of our
              upcoming <span className="primary-color bold">public token sale</span>. We will do so via our social channels and this page. Stay tuned.
            </p>
            <p className={styles.paragraph}>
              Currently a <span className="primary-color bold">private pre-sale</span> of tokens is ongoing, contact <ExternalTextLink text="dexaran@ethereumclassic.org" href="mailto: dexaran@ethereumclassic.org" /> for more details regarding the participation. In this round 1% of the total D223 tokens will be sold. Unsold tokens will move to public sale rounds. Read <ExternalTextLink text="the announcement" href="https://www.reddit.com/r/CallistoCrypto/comments/16jgvfx/dex223_presale_round_announcement/" />.
            </p>
          </div>
        </div>

        <div className={styles.blockWithNeonWrapper}>
          <div className={styles.neonContainer}>
            <div className={styles.neonImage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M8 40C6.9 40 5.95833 39.6083 5.175 38.825C4.39167 38.0417 4 37.1 4 36V12C4 10.9 4.39167 9.95833 5.175 9.175C5.95833 8.39167 6.9 8 8 8H40C41.1 8 42.0417 8.39167 42.825 9.175C43.6083 9.95833 44 10.9 44 12V36C44 37.1 43.6083 38.0417 42.825 38.825C42.0417 39.6083 41.1 40 40 40H8ZM24 25.65C24.1667 25.65 24.3417 25.625 24.525 25.575C24.7083 25.525 24.8833 25.45 25.05 25.35L39.2 16.5C39.4667 16.3333 39.6667 16.125 39.8 15.875C39.9333 15.625 40 15.35 40 15.05C40 14.3833 39.7167 13.8833 39.15 13.55C38.5833 13.2167 38 13.2333 37.4 13.6L24 22L10.6 13.6C10 13.2333 9.41667 13.225 8.85 13.575C8.28333 13.925 8 14.4167 8 15.05C8 15.3833 8.06667 15.675 8.2 15.925C8.33333 16.175 8.53333 16.3667 8.8 16.5L22.95 25.35C23.1167 25.45 23.2917 25.525 23.475 25.575C23.6583 25.625 23.8333 25.65 24 25.65Z" fill="#F5FFF9"/>
              </svg>
            </div>
            <div className={styles.neonLine2} />
          </div>
          <div className={clsx(styles.content, styles.subscribeContent)}>
            <h2 className={styles.additionalInfoHeader}>Subscribe to our newsletter</h2>
            <div className={styles.subscribe}>
              <input value={emailInput} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmailInput(e.target.value);
              }} placeholder="Your email" type="email"/>
              <Button disabled={isSubmitting || !emailInput} onClick={handleEmailSubmit}>{isSubmitting ? <Preloader size={20} /> : "Subscribe"}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bannerForm}>
        <div className={styles.video}>
          <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>
        <BannerRightBlock />
      </div>
    </div>
  </div>;
}
