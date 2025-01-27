"use client";
import clsx from "clsx";
import Image from "next/image";
import React, { useRef } from "react";

import BulletListItem from "@/components/atoms/BulletListItem";

import CubeImage from "../../../assets/images/cube.svg";
import NeonBlock from "../../../components/organisms/NeonBlock";
export default function Structure({ refEl }) {
  const structureEntryRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div ref={refEl} />
      <NeonBlock
        differentColumns
        anchor="structure"
        noAnimation
        onlyBottom
        icon="architecture"
        color="purple"
        overlineText="Structure"
        leftContent={
          <div className="flex flex-col gap-5">
            <p className="text-18 lg:text-24 text-primary-text mb-4 font-semibold">
              DEX223 consists of multiple components that work together to create a secure, truly
              decentralized trading environment:
            </p>
            <ul className="text-secondary-text text-16 lg:text-18 flex flex-col gap-2">
              <BulletListItem>
                <b className="text-primary-text">DEX223 smart-contract</b>
                <br />
                This smart contract drives all core logic of the exchange. Once deployed, it
                operates autonomously, ensuring trades, fees, and governance procedures run smoothly
                without reliance on a centralized team.
              </BulletListItem>
              <BulletListItem>
                <b className="text-primary-text">DEX223 web interface</b>
                <br />
                An &quot;official&quot; user interface is developed by the exchange team, but anyone
                can build an alternative UI that interacts with the DEX223 smart contract. This
                openness encourages innovation and user choice, empowering the community to shape
                their own trading experiences.
              </BulletListItem>
              <BulletListItem>
                <b className="text-primary-text">Auto-listing smart-contracts</b>
                <br />
                DEX223 maintains at least three &quot;default&quot; auto-listing contracts with
                different fee structures. These contracts make token listings permissionless: as
                soon as a user pays the specified fee, the token appears for trading. A user may
                enable or disable specific auto-listing contracts at any time, which affects which
                tokens are visible in the interface. However, once a token is listed via one of
                these contracts, it cannot be delisted from that contract.
              </BulletListItem>
              <BulletListItem>
                <b className="text-primary-text">Arbitrary auto-listing contracts</b>
                <br />
                Anyone is free to deploy a custom auto-listing contract with unique rules and fee
                settings. The DEX223 UI recognizes these third-party contracts when a user provides
                the contract address. This model fosters complete decentralization and mitigates the
                need for gatekeepers.
              </BulletListItem>
              <BulletListItem>
                <b className="text-primary-text">Auto-liquidation bots</b>
                <br />
                Lenders on DEX223 manually trigger liquidations, yet they can set a fee to reward
                anyone who calls the liquidation function. This incentive allows third-party bots to
                monitor positions across the exchange and execute liquidations reliably. The
                exchange team develops a reference script for this task, but the system remains open
                to custom solutions.
              </BulletListItem>
            </ul>
          </div>
        }
        rightContent={
          <div ref={structureEntryRef} className={clsx("animated")}>
            <Image src={CubeImage} alt={""} className="w-full max-lg:max-w-[310px]" />
          </div>
        }
      />
    </div>
  );
}
