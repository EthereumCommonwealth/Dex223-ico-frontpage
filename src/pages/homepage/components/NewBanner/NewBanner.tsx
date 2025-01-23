import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useCallback, useState } from "react";

import BuyForm from "@/components/organisms/purchase-components/BuyForm";
import { mixpanelSetProfileProp, trackEvent } from "@/functions/mixpanel";
import { useSnackbar } from "@/providers/SnackbarProvider";

import Button from "../../../../components/atoms/Button";
import TextLink from "../../../../components/atoms/ExternalTextLink";
import Preloader from "../../../../components/atoms/Preloader";
import Spacer from "../../../../components/atoms/Spacer";
import Svg from "../../../../components/atoms/Svg";
import styles from "./NewBanner.module.scss";

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

function Heading() {
  return (
    <>
      <h1 className={styles.mainHeader}>
        <span className={styles.green}>DEX223</span>: Decentralized exchange for{" "}
        <span className={styles.green}>ERC-223</span> &{" "}
        <span className={styles.purple}>ERC-20</span> tokens!
      </h1>
      <p className={styles.subheading}>
        Secure, gas-efficient, fully decentralized exchange built with Ethereum smart-contracts.
      </p>
    </>
  );
}

function MobileHeading() {
  return (
    <div className={styles.mobileHeading}>
      <Heading />
    </div>
  );
}

function DesktopHeading() {
  return (
    <div className={styles.desktopHeading}>
      <Heading />
      <Spacer height={40} />
    </div>
  );
}
export default function NewBanner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const { showMessage } = useSnackbar();

  // const [infoOpened, setInfoOpened] = useState(false);

  const handleEmailSubmit = useCallback(async () => {
    setIsSubmitting(true);
    trackEvent("subscribe", { email: emailInput });
    mixpanelSetProfileProp("$email", emailInput);

    try {
      const res = await fetch("https://api.dex223.io/v1/core/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data.code === "EMAIL_ADD_SUCCESS") {
        showMessage("You have successfully subscribed to our newsletter");
      }

      if (res.status === 400) {
        if (data.errors[0].message) {
          showMessage(data.errors[0].message, "error");
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

  return (
    <div className="container_internal">
      <div className={styles.gridWrapper}>
        <MobileHeading />
        <div className={styles.bannerText}>
          <div className={styles.pattern1}>
            <Image alt="" src="/images/patterns/purple.svg" layout="fill" />
          </div>
          <DesktopHeading />

          <div className={styles.blockWithNeonWrapper}>
            <div className={styles.neonContainer}>
              <div className={styles.neonImage}>
                <Svg layout="cover" iconName="email" />
              </div>
              <div className={styles.neonLine} />
            </div>
            <div className={clsx(styles.content)}>
              <h2 className={styles.additionalInfoHeader}>Subscribe to our newsletter</h2>
              <div className={styles.subscribe}>
                <input
                  value={emailInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmailInput(e.target.value);
                  }}
                  placeholder="Your email"
                  type="email"
                />
                <Button disabled={isSubmitting || !emailInput} onClick={handleEmailSubmit}>
                  {isSubmitting ? <Preloader size={20} /> : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.pattern2}>
            <Image alt="" src="/images/patterns/green.svg" layout="fill" />
          </div>
        </div>

        {/*<div className={styles.bannerForm}>*/}
        {/*  <div className={styles.video}>*/}
        {/*    <video autoPlay muted loop src="/banner_398d494b.webm"></video>*/}
        {/*  </div>*/}
        {/*  <div style={{ position: "relative" }}>*/}
        {/*    <div className={styles.buyAnchor} id="buy" />*/}
        {/*  </div>*/}
        {/*  <BuyForm />*/}
        {/*</div>*/}
      </div>
      <div className={styles.blockWithNeonWrapper}>
        <div className={styles.neonContainer}>
          <div className={styles.neonImage}>
            <Svg layout="cover" iconName="thumb-up" />
          </div>
          <div className={styles.neonLine2} />
        </div>
        <div className={clsx(styles.content, styles.subscribeContent)}>
          <div className={styles.keyPointsWrapper}>
            <h2>Key Points</h2>
            <div className={styles.cardsWrapper}>
              <div className={styles.keyPointCard}>
                <Svg size={48} iconName="security" />
                <div>
                  <h3>
                    Addressing a <u>real problem</u>
                  </h3>
                  <p>
                    <span className={styles.importantPhrase}>Millions of dollars are lost</span> due
                    to errors with ERC-20 tokens every year. By supporting ERC-223 standard we are
                    making the first step towards solving the problem. We believe that in the long
                    run the standard that prevents funds losses will thrive.
                  </p>
                </div>
              </div>
              <div className={styles.keyPointCard}>
                <Svg size={48} iconName="multichain-rollout" />
                <div>
                  <h3>Maximizing chains support</h3>
                  <p>
                    DEX223 will be deployed on{" "}
                    <span className={styles.importantPhrase}>every EVM-compatible chain</span>{" "}
                    including Ethereum, EOS EVM, Arbitrum, Optimism, BASE and many more. It will
                    become the exchange that supports the largest number of networks in the
                    industry.
                  </p>
                </div>
              </div>
              <div className={styles.keyPointCard}>
                <Svg size={48} iconName="token" />
                <div>
                  <h3>Non-discrimination philosophy</h3>
                  <p>
                    We let <span className={styles.importantPhrase}>any token</span> to be listed on
                    the platform. Meme coins are a sizeable market now. Listing them on an exchange
                    is a challenge but we{" "}
                    <span className={styles.importantPhrase}>
                      provide a solution for it out of the box.
                    </span>
                  </p>
                </div>
              </div>
              <div className={clsx(styles.keyPointCard, styles.transparencyCard)}>
                <div className={styles.transparencyCardIcon}>
                  <div className={styles.transparencySvgGradient} />
                  <Svg iconName="double-usd" />
                </div>

                <div>
                  <h3>Financial transparency</h3>
                  <p>
                    We adhere to the policy of financial transparency. The usage of ICO funds is
                    publicly commented and accessible for everyone{" "}
                    <TextLink
                      href="https://github.com/EthereumCommonwealth/Roadmap/issues/70"
                      text="here on github"
                    />
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
