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
import { mixpanelSetProfileProp, trackEvent } from "@/functions/mixpanel";
import Link from "next/link";

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

function Heading() {
  return <>
    <h1 className={styles.mainHeader}><span className={styles.green}>DEX223</span>: Decentralized exchange for <span
      className={styles.green}>ERC-223</span> & <span className={styles.purple}>ERC-20</span> tokens!</h1>
    <p className={styles.subheading}>Secure, gas-efficient, KYC-free and fully decentralized exchange
      built with Ethereum smart-contracts. No account suspensions.</p>
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
              <ExternalTextLink text="Pre-sale round 1" href="https://www.reddit.com/r/CallistoCrypto/comments/16jgvfx/dex223_presale_round_announcement/" /> and <ExternalTextLink text="pre-sale round 2" href="https://dexaran820.medium.com/dex223-pre-sale-round-2-completion-report-14f09ab079cc" /> are completed.
            </p>
            <p className={styles.paragraph}>
              Currently the public ICO round is ongoing. You can also purchase D223 tokens with USDT or USDC (ERC-20) at 1 D223 = $0.0008 rate within <Link href="/private">private sale</Link>.
            </p>
            <p className={styles.paragraph}>
              D223 tokens can be purchased during the ICO with ETH, USDT, USDC or DAI on Ethereum mainnet.
              You can purchase tokens with ETH (Ethereum) by simply sending it to the address of the smart-contract: <span style={{whiteSpace: "nowrap"}}><ExternalTextLink text="0x66bbb...a68879"
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
              Read <ExternalTextLink text="D223 Token FAQ & Wallet support (medium article)"
                                     href="https://dexaran820.medium.com/d223-token-faq-bbc39b155aeb"/>.
            </p>

            <p className={styles.paragraph}>
              Have a question? Write a comment on <ExternalTextLink text="our reddit thread"
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
              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3133_99205)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.90073 47.3881L12.5007 42.7881H40.5007C41.6007 42.7881 42.5424 42.3964 43.3257 41.6131C44.1091 40.8297 44.5007 39.8881 44.5007 38.7881V14.7881C44.5007 13.6881 44.1091 12.7464 43.3257 11.9631C42.5424 11.1798 41.6007 10.7881 40.5007 10.7881H8.50073C7.40073 10.7881 6.45907 11.1798 5.67573 11.9631C4.8924 12.7464 4.50073 13.6881 4.50073 14.7881V45.9381C4.50073 46.8381 4.90907 47.4631 5.72573 47.8131C6.5424 48.1631 7.2674 48.0214 7.90073 47.3881ZM23.5028 37.2026C23.7369 37.4367 24.0269 37.5537 24.3729 37.5537C24.7189 37.5537 25.009 37.4367 25.243 37.2026C25.4771 36.9686 25.5941 36.6785 25.5941 36.3325V34.9892C26.856 34.806 27.9144 34.3379 28.7692 33.5848C29.6241 32.8318 30.0515 31.7327 30.0515 30.2876C30.0515 29.1275 29.6902 28.1047 28.9677 27.2194C28.2451 26.334 27.1817 25.6878 25.7773 25.2807C24.2712 24.8533 23.2128 24.4463 22.6022 24.0595C21.9916 23.6728 21.6863 23.1437 21.6863 22.472C21.6863 21.8818 21.9204 21.3882 22.3885 20.9913C22.8566 20.5944 23.5385 20.396 24.434 20.396C24.9632 20.396 25.4059 20.4723 25.7621 20.6249C26.1182 20.7776 26.4286 20.9964 26.6932 21.2813C26.9578 21.5663 27.2427 21.7647 27.548 21.8767C27.8533 21.9886 28.1485 21.9835 28.4334 21.8614C28.7794 21.7189 29.0084 21.4849 29.1203 21.1592C29.2323 20.8336 29.1967 20.5384 29.0135 20.2739C28.6471 19.7243 28.179 19.2613 27.6091 18.8847C27.0392 18.5082 26.3676 18.2589 25.5941 18.1368V16.7935C25.5941 16.4475 25.4771 16.1574 25.243 15.9234C25.009 15.6893 24.7189 15.5723 24.3729 15.5723C24.0269 15.5723 23.7369 15.6893 23.5028 15.9234C23.2688 16.1574 23.1518 16.4475 23.1518 16.7935V18.1368C22.2562 18.2385 21.381 18.6558 20.5262 19.3885C19.6714 20.1212 19.2439 21.149 19.2439 22.472C19.2439 23.5711 19.5696 24.5022 20.2209 25.2655C20.8722 26.0287 22.073 26.6851 23.8234 27.2346C25.4517 27.7638 26.4897 28.237 26.9374 28.6543C27.3852 29.0715 27.6091 29.6363 27.6091 30.3487C27.6091 31.1425 27.3191 31.7276 26.739 32.1041C26.1589 32.4807 25.4517 32.6689 24.6172 32.6689C23.8438 32.6689 23.1925 32.5112 22.6633 32.1957C22.1341 31.8803 21.6965 31.4172 21.3505 30.8066C21.1877 30.5013 20.9536 30.2825 20.6483 30.1502C20.343 30.0179 20.0479 30.0129 19.7629 30.135C19.4169 30.2774 19.1778 30.5064 19.0455 30.8219C18.9132 31.1374 18.9183 31.4376 19.0608 31.7225C19.4882 32.6384 20.0479 33.3508 20.7399 33.8596C21.4319 34.3684 22.2359 34.7246 23.1518 34.9281V36.3325C23.1518 36.6785 23.2688 36.9686 23.5028 37.2026Z" fill="url(#paint0_linear_3133_99205)"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_3133_99205" x1="44.0827" y1="25.2742" x2="-14.4809" y2="3.84012" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9576EC"/>
                    <stop offset="1" stop-color="#22AEFC"/>
                  </linearGradient>
                  <clipPath id="clip0_3133_99205">
                    <rect width="48" height="48" fill="white" transform="translate(0.5)"/>
                  </clipPath>
                </defs>
              </svg>
              <div>
                <h3>Financial transparency</h3>
                <p>We adhere to the policy of financial transparency. The usage of ICO founds is publicly commented and
                  accessible for everyone <ExternalTextLink href="https://github.com/EthereumCommonwealth/Roadmap/issues/70" text="here on github"/>.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>;
}
