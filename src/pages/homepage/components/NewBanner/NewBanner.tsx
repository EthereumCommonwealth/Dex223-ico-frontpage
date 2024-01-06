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
import { mixpanelSetProfileProp, trackEvent } from "@/functions/mixpanel";

export default function NewBanner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const { showMessage } = useSnackbar();

  const [infoOpened, setInfoOpened] = useState(false);

  const handleEmailSubmit = useCallback(async () => {
    setIsSubmitting(true);
    trackEvent("subscribe", { email: emailInput });
    mixpanelSetProfileProp("$email", emailInput);

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
              The second presale round was completed at 06 Jan 2024. 160,000,000 D223 tokens (2%) have been
              sold with 45% discount compared to the main ICO phase. <span className={styles.buttonWrapper}>
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
            <div className={styles.keyPointsWrapper}>
              <h2>Key Points</h2>
              <div className={styles.cardsWrapper}>
                <div className={styles.keyPointCard}>
                  <Svg iconName="security" />
                  <div>
                    <h3>Addressing a <u>real problem</u></h3>
                    <p>Millions of dollars are lost due to errors with ERC-20 tokens every year. By supporting ERC-223 standard we are making the first step towards solving the problem. We believe that in the long run the standard that prevents funds losses will thrive.</p>
                  </div>
                </div>
                <div className={styles.keyPointCard}>
                  <Svg iconName="multichain-rollout" />
                  <div>
                    <h3>Maximizing chains support</h3>
                    <p>DEX223 will be deployed on <span className={styles.importantPhrase}>every EVM-compatible chain</span> including Ethereum, EOS EVM, Arbitrum, Optimism, BASE and many more. It will become the exchange that supports the largest number of networks in the industry.</p>
                  </div>
                </div>
                <div className={styles.keyPointCard}>
                  <Svg iconName="token" />
                  <div>
                    <h3>Non-discrimination philosophy</h3>
                    <p>We let <span className={styles.importantPhrase}>any token</span> to be listed on the platform. Meme coins are a sizeable market now. Listing them on an exchange is a challenge but we <span className={styles.importantPhrase}>provide a solution for it out of the box.</span></p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className={styles.bannerForm}>
        <div className={styles.video}>
          <video autoPlay muted loop src="/banner_398d494b.webm"></video>
        </div>
        <div style={{position: "relative"}}>
          <div className={styles.buyAnchor} id="buy" />
        </div>
        <BuyForm />
      </div>
    </div>
  </div>;
}
