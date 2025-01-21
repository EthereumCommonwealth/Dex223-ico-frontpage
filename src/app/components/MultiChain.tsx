import React from "react";

import ArticleHeading from "@/components/ArticleHeading";
import NeonBlock from "@/components/organisms/NeonBlock";

export default function MultiChain() {
  return (
    <NeonBlock
      icon="multichain-rollout"
      anchor="crosschain-deployment"
      color="blue"
      differentColumns
      overlineText="MULTICHAIN ROLLOUT"
      leftContent={
        <>
          <ArticleHeading text="Crosschain deployment policy" />

          <div className="flex flex-col gap-5 text-secondary-text text-18">
            <p>
              D223 tokens will initially be offered on the Ethereum Mainnet, while the DEX223
              exchange is scheduled to launch on multiple chains. Holders who keep their D223 tokens
              on Ethereum, and lock them in the smart contract, will receive an equivalent number of
              tokens on each new chain at the time of that chain’s DEX223 deployment.
            </p>
            <p>
              To extend our reach, a portion of the core team’s D223 tokens will be allocated to
              influencers and media partners, amplifying awareness of our platform within their
              respective communities.
            </p>
            <p>
              Confirmed chains for DEX223 deployment include: Ethereum, Avalanche, BSC, EOS EVM,
              CELO, Base, Optimism, and Arbitrum. While these chains are confirmed, the team will
              prioritize and possibly change deployment strategy as it sees fit. 
            </p>
          </div>
        </>
      }
      rightContent={
        <div className="flex items-center justify-center mb-[53px] h-full pt-[55px]">
          <div className="w-full flex items-center justify-center relative shrink-0">
            <div className="absolute top-1/2 left-1/2 w-[72%] h-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 bg-blue blur-[160px] animate-breathing"></div>
            <img className="relative z-10" src="/images/crosschain.svg" alt="" />
          </div>
        </div>
      }
    />
  );
}
