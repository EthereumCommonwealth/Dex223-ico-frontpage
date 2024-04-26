import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./NewBanner.module.scss";
import Button from "../../../../components/atoms/Button";
import TextLink from "../../../../components/atoms/ExternalTextLink";
import clsx from "clsx";
import { useSnackbar } from "@/providers/SnackbarProvider";
import Preloader from "../../../../components/atoms/Preloader";
import Spacer from "../../../../components/atoms/Spacer";
import Svg from "../../../../components/atoms/Svg";
import BuyForm from "@/components/organisms/purchase-components/BuyForm";
import { mixpanelSetProfileProp, trackEvent } from "@/functions/mixpanel";
import Link from "next/link";

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

function Heading() {
  return <>
    <h1 className={styles.mainHeader}><span className={styles.green}>DEX223</span>: Decentralized exchange for <span
      className={styles.green}>ERC-223</span> & <span className={styles.purple}>ERC-20</span> tokens!</h1>
    <p className={styles.subheading}>Secure, gas-efficient, fully decentralized exchange built with Ethereum smart-contracts.</p>
  </>
}

function MobileHeading() {
  return <div className={styles.mobileHeading}>
    <Heading />
  </div>
}

function DesktopHeading() {
  return <div className={styles.desktopHeading}>
    <Heading />
    <Spacer height={40}/>
  </div>
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
      const res = await fetch("https://api.dex223.io/emails/notification/save-email", {
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

  return <div className="container_internal">
    <div className={styles.gridWrapper}>
      <MobileHeading />
      <div className={styles.bannerText}>
        <DesktopHeading />
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
              <TextLink text="Pre-sale round 1" href="https://www.reddit.com/r/CallistoCrypto/comments/16jgvfx/dex223_presale_round_announcement/" /> and <TextLink text="pre-sale round 2" href="https://dexaran820.medium.com/dex223-pre-sale-round-2-completion-report-14f09ab079cc" /> are completed.
            </p>
            <p className={styles.paragraph}>
              Currently the public ICO round is ongoing. You can also purchase D223 tokens with USDT or USDC (ERC-20) at 1 D223 = $0.0008 rate within <Link href="/private">private sale</Link>.
            </p>
            <p className={styles.paragraph}>
              D223 tokens can be purchased during the ICO with ETH, USDT, USDC or DAI on Ethereum mainnet.
              You can purchase tokens with ETH (Ethereum) by simply sending it to the address of the smart-contract: <span style={{whiteSpace: "nowrap"}}><TextLink text="0x66bbb...a68879"
                                                                                                                                                                    href="https://etherscan.io/address/0x66bbbc0698fd3ac3c1f8bf6e2a550d3775a68879"/> <span className={styles.buttonWrapper}>
              <button onClick={async () => {
                try {
                  await copyToClipboard("0x66bbbc0698fd3ac3c1f8bf6e2a550d3775a68879");
                  showMessage("Successfully copied!");
                } catch (e) {
                  console.log(e);
                  showMessage("Something went wrong", "error");
                }
              }} className={styles.openInfoBtn}>
                <Svg iconName="copy"/>
              </button></span>
              </span>
            </p>
            <p className={styles.paragraph}>
              You can also purchase tokens by connecting your Web3 wallet and filling out the purchase details in the token sale form. This method allows you to use stablecoins as payment.
            </p>


            <p className={styles.paragraph}>
              ICO tokens will be sold at the following rates:
              <ul>
                <li className={styles.active}>30% at $0.0009 (current price)</li>
                <li>20% at $0.001</li>
                <li>20% at $0.0011</li>
                <li>20% at $0.0012</li>
                <li>10% at $0.0013</li>
              </ul>
            </p>

            <p className={styles.paragraph}>
              Read <TextLink text="D223 Token FAQ & Wallet support (medium article)"
                             href="https://dexaran820.medium.com/d223-token-faq-bbc39b155aeb"/>.
            </p>

            <p className={styles.paragraph}>
              Have a question? Write a comment on <TextLink text="our reddit thread"
                                                            href="https://www.reddit.com/r/CallistoCrypto/comments/18ajzj1/dex223_presale_round_2_announcement/"/>.
            </p>
          </div>
        </div>

        <div className={styles.blockWithNeonWrapper}>
          <div className={styles.neonContainer}>
            <div className={styles.neonImage}>
              <Svg layout="cover" iconName="email"/>
            </div>
            <div className={styles.neonLine}/>
          </div>
          <div className={clsx(styles.content)}>
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
        <div style={{ position: "relative" }}>
          <div className={styles.buyAnchor} id="buy"/>
        </div>
        <BuyForm/>
      </div>
    </div>
    <div className={styles.blockWithNeonWrapper}>
      <div className={styles.neonContainer}>
        <div className={styles.neonImage}>
          <Svg layout="cover" iconName="thumb-up"/>
        </div>
        <div className={styles.neonLine2}/>
      </div>
      <div className={clsx(styles.content, styles.subscribeContent)}>
        <div className={styles.keyPointsWrapper}>
          <h2>Key Points</h2>
          <div className={styles.cardsWrapper}>
            <div className={styles.keyPointCard}>
              <Svg size={48} iconName="security"/>
              <div>
                <h3>Addressing a <u>real problem</u></h3>
                <p><span className={styles.importantPhrase}>Millions of dollars are lost</span> due to errors with
                  ERC-20 tokens every year. By supporting ERC-223 standard we are making the first step towards
                  solving the problem. We believe that in the long run the standard that prevents funds losses will
                  thrive.</p>
              </div>
            </div>
            <div className={styles.keyPointCard}>
              <Svg size={48} iconName="multichain-rollout"/>
              <div>
                <h3>Maximizing chains support</h3>
                <p>DEX223 will be deployed on <span
                  className={styles.importantPhrase}>every EVM-compatible chain</span> including Ethereum, EOS EVM,
                  Arbitrum, Optimism, BASE and many more. It will become the exchange that supports the largest
                  number of networks in the industry.</p>
              </div>
            </div>
            <div className={styles.keyPointCard}>
              <Svg size={48} iconName="token"/>
              <div>
                <h3>Non-discrimination philosophy</h3>
                <p>We let <span className={styles.importantPhrase}>any token</span> to be listed on the platform.
                  Meme coins are a sizeable market now. Listing them on an exchange is a challenge but we <span
                    className={styles.importantPhrase}>provide a solution for it out of the box.</span></p>
              </div>
            </div>
            <div className={clsx(styles.keyPointCard, styles.transparencyCard)}>
              <div className={styles.transparencyCardIcon}>
                <div className={styles.transparencySvgGradient} />
                <Svg iconName="double-usd" />
              </div>

              <div>
                <h3>Financial transparency</h3>
                <p>We adhere to the policy of financial transparency. The usage of ICO funds is publicly commented and
                  accessible for everyone <TextLink href="https://github.com/EthereumCommonwealth/Roadmap/issues/70" text="here on github"/>.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>;
}
