"use client";
import clsx from "clsx";
import React, { useRef } from "react";

import CubeImage from "../../../../assets/images/cube.svg";
import NeonBlock from "../../../../components/organisms/NeonBlock";
import Image from "next/image";
import BulletListItem from "@/components/atoms/BulletListItem";
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
          <>
            <div className="flex flex-col gap-5">
              <p className="text-24 text-primary-text mb-2.5 font-semibold">DEX223 will consists of multiple components:</p>
              <ul className="text-secondary-text text-18">
                <BulletListItem>
                  <b className="text-primary-text">DEX223 smart-contract</b>, the main logic of the exchange.
                </BulletListItem>
                <BulletListItem>
                  <b className="text-primary-text">DEX223 web interface.</b> There will be an &quot;official&quot; version of the
                  UI developed by the exchange team. There can be any number of competing UIs as
                  anyone can develop an interface that will interact with the contract.
                </BulletListItem>
                <BulletListItem>
                  <b className="text-primary-text">Auto-listing smart-contracts.</b> There will be at least three
                  &quot;default&quot; auto-listing smart-contracts with different fee settings.
                  DEX223 UI can automatically pull tokens from the auto-listing contracts when a
                  user decides to enable it. This means that after paying a specified fee any token
                  can be listed and will become available for trading instantly. A user can turn off
                  &quot;auto-listing contracts&quot; at any moment which will remove the auto-listed
                  tokens from the UI. It is not possible to delist a token from the auto-listing
                  contract however.
                </BulletListItem>
                <BulletListItem>
                  <b className="text-primary-text">Arbitrary auto-listing contracts.</b> Not only the development team but anyone
                  will be allowed to deploy a copy of an auto-listing contract with customizable
                  rules. These third party contracts can feed tokens into the DEX223 UI in a similar
                  way as default auto-listing contracts. A user would need to copy&paste the address
                  of the third party auto-listing contract in order to pull the tokens from it.
                  Auto-listing contract source codes will be publicly available to anyone.
                </BulletListItem>
                <BulletListItem>
                  <b className="text-primary-text">Auto-liquidation bots.</b> Liquidation must be manually triggered by lenders in
                  DEX223. However, the lender can specify a % fee to be paid to anyone who calls the
                  liquidation function, which allows third-party liquidation bots to run and monitor
                  positions susceptible to liquidation. An example of such script will be developed
                  and provided by the exchange team.
                </BulletListItem>
              </ul>
              <p className="text-24 font-semibold text-primary-text mb-2.5">
                ERC-223 ecosystem. This services are not a part of DEX223 exchange but their purpose
                is to boost the adoption of ERC-223 standard:
              </p>
              <ul className="text-secondary-text text-18">
                <BulletListItem>
                  <b className="text-primary-text">Token Standard Converter.</b> A smart-contract service that will make ERC-20
                  and ERC-223 tokens interoperable. Any ERC-20 token can be converted to ERC-223
                  version. Any ERC-223 token can be converted to ERC-20 version.
                </BulletListItem>
                <BulletListItem>
                  <b className="text-primary-text">ERC-20 losses calculator.</b> We are building a script that will calculate the
                  amount of &quot;lost&quot; tokens realtime. A live demonstration of the scale of
                  the problems with the old standard.
                </BulletListItem>
                <BulletListItem>
                  <b className="text-primary-text">ERC-223 aggregation page.</b> A hub for all the upcoming ERC-223 development
                  guidelines, articles, reference source codes and a record of its development
                  history.
                </BulletListItem>
              </ul>
            </div>
          </>
        }
        rightContent={
          <div ref={structureEntryRef} className={clsx("pt-[200px] flex justify-end", "animated")}>
            <Image src={CubeImage} alt={""} />
          </div>
        }
      />
    </div>
  );
}
