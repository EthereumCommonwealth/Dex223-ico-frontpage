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
import Svg from "../../atoms/Svg";

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
              <Svg layout="cover" iconName="upcoming" />
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
              <Svg layout="cover" iconName="email" />
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
