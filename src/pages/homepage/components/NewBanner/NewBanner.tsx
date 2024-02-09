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
import Link from "next/link";

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

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
              Pre-sale round 1 and pre-sale round 2 are completed. Public ICO round will be announced shortly.
            </p>
            {/*<p className={styles.paragraph}>*/}
            {/*  The second presale round was completed at 06 Jan 2024. 160,000,000 D223 tokens (2%) have been*/}
            {/*  sold with 45% discount compared to the main ICO phase. <span className={styles.buttonWrapper}>*/}
            {/*<button onClick={() => {*/}
            {/*    setInfoOpened(true)*/}
            {/*}} className={styles.openInfoBtn}>*/}
            {/*  <Svg iconName="open-new-window" />*/}
            {/*</button></span>*/}
            {/*</p>*/}
            <p className={styles.paragraph}>
              Currently a private sale is ongoing, anyone can purchase D223 tokens with USDT or USDC (ERC-20) at 1 D223
              = $0.0008 rate following this <Link href="/private">link</Link>.
            </p>
            <p className={styles.paragraph}>
              It is possible to purchase D223 tokens during the ICO with ETH, USDT, USDC or DAI on Ethereum mainnet. You
              will need to connect your Web3 wallet, input the amount of tokens and press the buy button. You can also
              purchase tokens without connecting your wallet to the web page by sending ETH to the ICO smart-contract
              address: 0x66bbbc0698fd3ac3c1f8bf6e2a550d3775a68879 <span className={styles.buttonWrapper}>
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
            </p>
            <p className={styles.paragraph}>
              Do not send USDT, USDC or DAI to the smart-contract, if you want to purchase the tokens with a stablecoin
              then connecting wallet to this web page is the only option.
            </p>

            {/*<DrawerDialog isOpen={infoOpened} onClose={() => setInfoOpened(false)}>*/}
            {/*  <DialogHeader onClose={() => setInfoOpened(false)} title="Anticipating price trends" />*/}
            {/*  <div className={styles.infoDialog}>*/}
            {/*    <img src="/images/stonks.png" alt="" />*/}
            {/*    <p>Main phase of the ICO consists of Public round 1, Public round 2 and Auction.</p>*/}
            {/*    <p>It is difficult to predict the auction price precisely but based on our estimations of EOS, SOY.Finance IDO that followed the same auction model the average price at an auction is approximately 140% of the price at the moment of the auction opening.</p>*/}
            {/*    <p>Assuming the price of the last public ICO round 2 ($0.001 per token) to be the opening auction price we expect D223 tokens to have an average price of $0.001164</p>*/}
            {/*    <p>The most accurate token information is available <ExternalTextLink text="here" href="https://github.com/EthereumCommonwealth/Roadmap/issues/71" />.</p>*/}
            {/*  </div>*/}
            {/*</DrawerDialog>*/}

            {/*<p className={styles.paragraph}>*/}
            {/*  Currently a private pre-sale of tokens is ongoing,*/}
            {/*  contact <ExternalTextLink text={dexEmail}*/}
            {/*                            href={dexEmailLink}/> for more details regarding participation.*/}
            {/*</p>*/}

            <p className={styles.paragraph}>
              Read <ExternalTextLink text="D223 Token FAQ & Wallets support."
                                     href="https://dexaran820.medium.com/d223-token-faq-bbc39b155aeb"/>
            </p>

            <p className={styles.paragraph}>
              Have a question? Write a comment <ExternalTextLink text="here"
                                                                 href="https://www.reddit.com/r/CallistoCrypto/comments/18ajzj1/dex223_presale_round_2_announcement/"/>
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
                  <Svg iconName="security"/>
                  <div>
                    <h3>Addressing a <u>real problem</u></h3>
                    <p><span className={styles.importantPhrase}>Millions of dollars are lost</span> due to errors with
                      ERC-20 tokens every year. By supporting ERC-223 standard we are making the first step towards
                      solving the problem. We believe that in the long run the standard that prevents funds losses will
                      thrive.</p>
                  </div>
                </div>
                <div className={styles.keyPointCard}>
                  <Svg iconName="multichain-rollout"/>
                  <div>
                    <h3>Maximizing chains support</h3>
                    <p>DEX223 will be deployed on <span
                      className={styles.importantPhrase}>every EVM-compatible chain</span> including Ethereum, EOS EVM,
                      Arbitrum, Optimism, BASE and many more. It will become the exchange that supports the largest
                      number of networks in the industry.</p>
                  </div>
                </div>
                <div className={styles.keyPointCard}>
                  <Svg iconName="token"/>
                  <div>
                    <h3>Non-discrimination philosophy</h3>
                    <p>We let <span className={styles.importantPhrase}>any token</span> to be listed on the platform.
                      Meme coins are a sizeable market now. Listing them on an exchange is a challenge but we <span
                        className={styles.importantPhrase}>provide a solution for it out of the box.</span></p>
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
        <div style={{ position: "relative" }}>
          <div className={styles.buyAnchor} id="buy"/>
        </div>
        <BuyForm/>
        <div className={styles.transparency}>
          <div className={styles.transparencyHeader}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_3096_105290)">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M4.93335 31.5924L8.00002 28.5257H26.6667C27.4 28.5257 28.0278 28.2646 28.55 27.7424C29.0722 27.2202 29.3334 26.5924 29.3334 25.859V9.85905C29.3334 9.12572 29.0722 8.49794 28.55 7.97572C28.0278 7.45349 27.4 7.19238 26.6667 7.19238H5.33335C4.60002 7.19238 3.97224 7.45349 3.45002 7.97572C2.9278 8.49794 2.66669 9.12572 2.66669 9.85905V30.6257C2.66669 31.2257 2.93891 31.6424 3.48335 31.8757C4.0278 32.109 4.51113 32.0146 4.93335 31.5924ZM15.3348 24.8021C15.4908 24.9581 15.6842 25.0361 15.9148 25.0361C16.1455 25.0361 16.3389 24.9581 16.4949 24.8021C16.6509 24.646 16.729 24.4527 16.729 24.222V23.3265C17.5702 23.2043 18.2758 22.8923 18.8457 22.3902C19.4156 21.8882 19.7005 21.1555 19.7005 20.1921C19.7005 19.4187 19.4597 18.7368 18.978 18.1466C18.4963 17.5563 17.7873 17.1255 16.8511 16.8542C15.847 16.5692 15.1414 16.2978 14.7343 16.04C14.3273 15.7822 14.1237 15.4294 14.1237 14.9817C14.1237 14.5882 14.2798 14.2591 14.5919 13.9945C14.904 13.7299 15.3585 13.5976 15.9555 13.5976C16.3083 13.5976 16.6034 13.6485 16.8409 13.7503C17.0784 13.8521 17.2853 13.9979 17.4617 14.1879C17.6381 14.3778 17.828 14.5101 18.0316 14.5848C18.2351 14.6594 18.4318 14.656 18.6218 14.5746C18.8525 14.4796 19.0051 14.3236 19.0798 14.1065C19.1544 13.8894 19.1306 13.6926 19.0085 13.5162C18.7643 13.1499 18.4522 12.8412 18.0723 12.5902C17.6923 12.3391 17.2446 12.1729 16.729 12.0915V11.196C16.729 10.9653 16.6509 10.7719 16.4949 10.6159C16.3389 10.4599 16.1455 10.3818 15.9148 10.3818C15.6842 10.3818 15.4908 10.4599 15.3348 10.6159C15.1787 10.7719 15.1007 10.9653 15.1007 11.196V12.0915C14.5037 12.1593 13.9202 12.4375 13.3503 12.926C12.7804 13.4145 12.4955 14.0997 12.4955 14.9817C12.4955 15.7144 12.7126 16.3351 13.1468 16.844C13.581 17.3528 14.3816 17.7904 15.5485 18.1568C16.634 18.5095 17.326 18.825 17.6245 19.1032C17.923 19.3813 18.0723 19.7579 18.0723 20.2328C18.0723 20.762 17.8789 21.1521 17.4922 21.4031C17.1055 21.6541 16.634 21.7796 16.0777 21.7796C15.562 21.7796 15.1278 21.6745 14.7751 21.4641C14.4223 21.2538 14.1305 20.9451 13.8999 20.5381C13.7913 20.3345 13.6353 20.1887 13.4317 20.1005C13.2282 20.0123 13.0315 20.0089 12.8415 20.0903C12.6108 20.1853 12.4514 20.3379 12.3632 20.5483C12.275 20.7586 12.2784 20.9587 12.3734 21.1487C12.6583 21.7593 13.0315 22.2342 13.4928 22.5734C13.9541 22.9126 14.4901 23.1501 15.1007 23.2858V24.222C15.1007 24.4527 15.1787 24.646 15.3348 24.8021Z"
                      fill="#F5FFF9"/>
              </g>
              <defs>
                <clipPath id="clip0_3096_105290">
                  <rect width="32" height="32" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            Financial transparency
          </div>
          <p>We adhere to the policy of financial transparency. The usage of ICO founds is publicly commented and
            accessible for everyone <ExternalTextLink href="here on github" text="here on github"/>.</p>
        </div>
      </div>
    </div>
  </div>;
}
