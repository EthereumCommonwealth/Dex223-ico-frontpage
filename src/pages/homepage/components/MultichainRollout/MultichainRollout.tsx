import React from "react";
import styles from "./MultichainRollout.module.scss";
import ArticleHeading from "@/components/atoms/ArticleHeading";
import NeonBlock from "@/components/organisms/others/NeonBlock";

export default function MultichainRollout() {
  return <NeonBlock
    icon="multichain-rollout"
    anchor="crosschain-deployment"
    color="blue"
    overlineText="MULTICHAIN ROLLOUT"
    leftContent={<>
      <ArticleHeading text="Crosschain deployment policy"/>

      <div className={styles.paragraphs}>
        <p className={styles.text}>
          D223 tokens will be sold on Ethereum mainnet. DEX223 exchange will be deployed
          on multiple chains. Token holders who had their D223 tokens on Ethereum will get an equal
          amount of D223 tokens on every chain at the moment of the DEX deployment on that chain.
        </p>
        <p className={styles.text}>
          Part of the Core Team tokens will be transferred to influencers and media owners
          who can help us spread the word about the exchange inside of their community.
        </p>
        <p className={styles.text}>
          The following chains are confirmed: Ethereum, Avalanche, BSC, EOS EVM, CELO, Base, Optimism, Arbitrum.
        </p>
      </div>
    </>}

    rightContent={<div className={styles.rightContent}>
      <div className={styles.imageWrapper}>
        <img src="/images/crosschain.svg" alt=""/>
      </div>
    </div>}
  />
}
