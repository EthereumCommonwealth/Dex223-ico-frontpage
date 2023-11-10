import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./NewBanner.module.scss";
import Button from "../../../../components/atoms/Button";
import ExternalTextLink from "../../../../components/atoms/ExternalTextLink";
import clsx from "clsx";
import BannerRightBlock from "../../../../components/organisms/BannerRightBlock";
import { useSnackbar } from "@/providers/SnackbarProvider";
import Preloader from "../../../../components/atoms/Preloader";
import Spacer from "../../../../components/atoms/Spacer";
import Svg from "../../../../components/atoms/Svg";

export default function NewBanner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const { showMessage } = useSnackbar();

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
      if (data.created) {
        showMessage("You have successfully subscribed to our newsletter");
      }

      if (res.status === 400) {
        if (data.detail) {
          showMessage(data.detail, "error");
        }
      }

      if (res.status === 422) {
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
        <h1 className={styles.mainHeader}><span className={styles.green}>Dex223</span>: Decentralized exchange for <span
          className={styles.green}>ERC-223</span> & <span className={styles.purple}>ERC-20</span> tokens!</h1>
        <p className={styles.subheading}>Safe, gas-efficient, next generation fully decentralized exchange built with
          Ethereum smart-contracts.</p>
        <Spacer height={40}/>
        <div className={styles.blockWithNeonWrapper}>
          <div className={styles.neonContainer}>
            <div className={styles.neonImage}>
              <Svg layout="cover" iconName="upcoming"/>
            </div>
            <div className={styles.neonLine}/>
          </div>
          <div className={styles.content}>
            <h2 className={styles.additionalInfoHeader}>Status</h2>
            <p className={styles.paragraph}>
              DEX223 token sale: We have not yet announced the date nor the terms of our
              upcoming <span className="primary-color bold">public token sale</span>. We will do so via our social
              channels and this page. Stay tuned.
            </p>
            <p className={styles.paragraph}>
              Currently a <span className="primary-color bold">private pre-sale</span> of tokens is ongoing,
              contact <ExternalTextLink text="dexaran@ethereumclassic.org"
                                        href="mailto: dexaran@ethereumclassic.org"/> for more details regarding the
              participation.
            </p>
            <p className={styles.paragraph}>
              The first presale round was completed at 15 Sep 2023 within 24 hours.
            </p>
          </div>
        </div>

        <div className={styles.blockWithNeonWrapper}>
          <div className={styles.neonContainer}>
            <div className={styles.neonImage}>
              <Svg layout="cover" iconName="email"/>
            </div>
            <div className={styles.neonLine2}/>
          </div>
          <div className={clsx(styles.content, styles.subscribeContent)}>
            <h2 className={styles.additionalInfoHeader}>Subscribe to our newsletter</h2>
            <div className={styles.subscribe}>
              <input value={emailInput} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmailInput(e.target.value);
              }} placeholder="Your email" type="email"/>
              <Button disabled={isSubmitting || !emailInput} onClick={handleEmailSubmit}>{isSubmitting ?
                <Preloader size={20}/> : "Subscribe"}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bannerForm}>
        <div className={styles.video}>
          <video autoPlay muted loop src="/banner_398d494b.webm"></video>
        </div>
        <BannerRightBlock/>
      </div>
    </div>
  </div>;
}
