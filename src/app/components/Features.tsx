import clsx from "clsx";
import React from "react";

import Svg from "@/components/atoms/Svg";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import NeonBlock from "@/components/organisms/NeonBlock";

const styles: any = {};

export default function Features() {
  return (
    <>
      <NeonBlock color="green" icon="thumb-up" leftContent="Key pioints" overlineText="Features" />
      <Container>
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
      </Container>
    </>
  );
}
