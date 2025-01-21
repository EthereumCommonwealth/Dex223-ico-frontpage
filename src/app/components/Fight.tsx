"use client";

import clsx from "clsx";
import Image from "next/image";
import React, { useRef } from "react";

import FightImage from "@/assets/images/fight.svg";
import ArticleHeading from "@/components/ArticleHeading";
import BulletListItem from "@/components/atoms/BulletListItem";
import Svg from "@/components/atoms/Svg";
import TextLink from "@/components/atoms/TextLink";
import NeonBlock from "@/components/organisms/NeonBlock";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import FightImageSvg from "@/inlined-svgs/FightImageSvg";

const problems = [
  {
    text: "The problem was first reported in 2017 and there were about $10,000 lost at that moment",
    href: "https://www.reddit.com/r/ethereum/comments/60ql37/attention_be_careful_using_ethereum_tokens/",
  },
  {
    text: "There was a discussion regarding this problem with Ethereum Foundation members, there were $13,000 lost at that moment",
    href: "https://www.reddit.com/r/ethereum/comments/66gr2a/metropolis_and_erc23_request_for/",
  },
  {
    text: "The problem was reported during ERC-20 standard finalization, there were $16,000 lost ethereum/EIPs#610 (comment)",
    href: "https://github.com/ethereum/EIPs/pull/610#issuecomment-296711733",
  },
  {
    text: "By 2018 the amount of lost tokens has grown to $1,000,000",
    href: "https://www.reddit.com/r/ethereum/comments/7mea1c/erc20_anniversary_new_ath_reached_1_000_000_lost/",
  },
  {
    text: "Fabian Vogelsteller, the creator of ERC-20 decided not to use this standard in his new project LUKSO",
    href: "https://twitter.com/feindura/status/1676623784726470658",
  },
  {
    text: "In 2023 the amount of lost tokens has grown to $201,000,000",
    href: "https://gist.github.com/Dexaran/40213a04ce46b394279ac7daa581ce87",
  },
];

export default function Fight() {
  const ref = useRef<HTMLDivElement | null>(null);

  const entry = useIntersectionObserver(ref, { threshold: 0.4, freezeOnceVisible: true });

  return (
    <NeonBlock
      icon="fight"
      color="purple"
      overlineText="Fight"
      differentColumns
      leftContent={
        <>
          <ArticleHeading
            text={
              <>
                ERC-20 vs ERC-223: <br /> a clash of token standards
              </>
            }
          />
          <div className="text-secondary-text text-18 flex flex-col gap-5">
            <p>
              Since 2017, a heated debate has raged over which standard—ERC-20 or ERC-223—offers a
              safer, more seamless experience. The core issue revolves around how tokens and Ether
              are deposited into externally owned addresses (controlled by individuals) versus smart
              contracts.
            </p>
            <ul>
              <BulletListItem>
                Ether and ERC-223 automatically detect whether the recipient is an externally owned
                address or a contract, choosing the right deposit method accordingly.
              </BulletListItem>
              <BulletListItem>
                ERC-20, however, places the burden on the user to pick the correct transfer method.
                If the wrong path is chosen, the tokens are lost because the ERC-20 standard lacks a
                proper transaction handling model.
              </BulletListItem>
            </ul>
            <p>
              To learn more about this ongoing rivalry and its impact on the broader ecosystem,
              visit the{" "}
              <TextLink
                href="https://dexaran.github.io/erc223/"
                isExternal
                text="ERC-223 front page"
              />{" "}
              to uncover the full history since 2017.
            </p>
          </div>
        </>
      }
      rightContent={
        <div ref={ref} className={clsx("group", entry?.isIntersecting && "animated")}>
          <div className="relative">
            <FightImageSvg />
            <Image src="/images/fight-bg.png" alt="ERC-20 vs ERC223 Fight" layout="fill" />
          </div>
        </div>
      }
    />
  );
}
