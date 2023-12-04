import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./NewBanner.module.scss";
import Button from "../../../../components/atoms/Button";
import ExternalTextLink from "../../../../components/atoms/ExternalTextLink";
import clsx from "clsx";
import { useSnackbar } from "@/providers/SnackbarProvider";
import Preloader from "../../../../components/atoms/Preloader";
import Spacer from "../../../../components/atoms/Spacer";
import Svg from "../../../../components/atoms/Svg";
import BuyForm from "@/components/organisms/purchase-components/BuyForm";
import { dexEmail, dexEmailLink } from "@/constants/email";
import Dialog from "@/components/atoms/Dialog";
import DialogHeader from "@/components/atoms/DialogHeader";
import DrawerDialog from "@/components/atoms/DrawerDialog";

export default function NewBanner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const { showMessage } = useSnackbar();

  const [infoOpened, setInfoOpened] = useState(false);

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
      showMessage("Unknown error", "error");
      setIsSubmitting(false);
    }
  }, [emailInput, showMessage]);

  return <div className="container">
    <div className={styles.gridWrapper}>
      <div className={styles.bannerText}>
        <h1 className={styles.mainHeader}><span className={styles.green}>DEX223</span>: Decentralized exchange for <span
          className={styles.green}>ERC-223</span> & <span className={styles.purple}>ERC-20</span> tokens!</h1>
        <p className={styles.subheading}>Secure, gas-efficient, KYC-free and fully decentralized exchange
          built with Ethereum smart-contracts.</p>
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
              The first presale round was completed at 15 Sep 2023 within 24 hours.
            </p>
            <p className={styles.paragraph}>
              The second presale round will start on 4 December 2023. 160,000,000 D223 tokens (2%) would be
              sold at 45% discount compared to the main ICO round. <span className={styles.buttonWrapper}>
            <button onClick={() => {
                setInfoOpened(true)
            }} className={styles.openInfoBtn}>
              <Svg iconName="open-new-window" />
            </button></span>
            </p>
            <DrawerDialog isOpen={infoOpened} onClose={() => setInfoOpened(false)}>
              <DialogHeader onClose={() => setInfoOpened(false)} title="Anticipating price trends" />
              <div className={styles.infoDialog}>
                <img src="/images/stonks.png" alt="" />
                <p>Main phase of the ICO consists of Public round 1, Public round 2 and Auction.</p>
                <p>It is difficult to predict the auction price precisely but based on our estimations of EOS, SOY.Finance IDO that followed the same auction model the average price at an auction is approximately 140% of the price at the moment of the auction opening.</p>
                <p>Assuming the price of the last public ICO round 2 ($0.001 per token) to be the opening auction price we expect D223 tokens to have an average price of $0.001164</p>
                <p>The most accurate token information is available <ExternalTextLink text="here" href="https://github.com/EthereumCommonwealth/Roadmap/issues/71" />.</p>
              </div>
            </DrawerDialog>
            <p className={styles.paragraph}>
              Currently a private pre-sale of tokens is ongoing,
              contact <ExternalTextLink text={dexEmail}
                                        href={dexEmailLink}/> for more details regarding participation.
            </p>
            <p className={styles.paragraph}>
              Read <ExternalTextLink text="D223 Token FAQ & Wallets support." href="https://dexaran820.medium.com/d223-token-faq-bbc39b155aeb" />
            </p>
            <p className={styles.paragraph}>
              Have a question? Write a comment <ExternalTextLink text="here" href="https://www.reddit.com/r/CallistoCrypto/comments/18ajzj1/dex223_presale_round_2_announcement/" />
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
        <BuyForm />
      </div>
    </div>
  </div>;
}
