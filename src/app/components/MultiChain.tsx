import React from "react";

import ArticleHeading from "@/components/ArticleHeading";
import NeonBlock from "@/components/organisms/NeonBlock";

export default function MultiChain() {
  return (
    <NeonBlock
      icon="multichain-rollout"
      anchor="crosschain-deployment"
      color="blue"
      overlineText="MULTICHAIN ROLLOUT"
      leftContent={
        <>
          <ArticleHeading text="Crosschain deployment policy" />

          <div className="flex flex-col gap-5">
            <p className="text-secondary-text text-20">
              D223 tokens will be sold on Ethereum mainnet. DEX223 exchange will be deployed on
              multiple chains. Token holders who had their D223 tokens on Ethereum will get an equal
              amount of D223 tokens on every chain at the moment of the DEX deployment on that
              chain.
            </p>
            <p className="text-secondary-text text-20">
              Part of the Core Team tokens will be transferred to influencers and media owners who
              can help us spread the word about the exchange inside of their community.
            </p>
            <p className="text-secondary-text text-20">
              The following chains are confirmed: Ethereum, Avalanche, BSC, EOS EVM, CELO, Base,
              Optimism, Arbitrum.
            </p>
          </div>
        </>
      }
      rightContent={
        <div className="flex items-center justify-center mb-[53px] h-full">
          <div className="w-full pt-[85px] flex items-center justify-center relative shrink-0">
            <div className="absolute top-1/2 left-1/2 w-[72%] h-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 bg-blue blur-[400px] animate-breathing"></div>
            <img className="relative w-[85%] z-10" src="/images/crosschain.svg" alt="" />
          </div>
        </div>
      }
    />
  );
}
