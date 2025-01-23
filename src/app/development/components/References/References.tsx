"use client";

import clsx from "clsx";
import React, { useRef } from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import DevSourcesImage from "../../../../assets/images/dev-src-2.svg";
import Svg from "../../../../components/atoms/Svg";
import NeonBlock from "../../../../components/organisms/NeonBlock";
import Image from "next/image";
import BulletListItem from "@/components/atoms/BulletListItem";

const references = [
  {
    text: "ICO page source codes",
    href: "https://github.com/Dexaran/Dex223-ICO-page",
  },
  {
    text: "ICO smart-contracts",
    href: "https://github.com/Dexaran/D223ICO",
  },
  {
    text: "Auto-listings smart-contract source code (beta)",
    href: "https://github.com/Dexaran/Dex223-exchange/blob/main/auto-listing.sol",
  },
  {
    text: "ERC-223 hub page",
    href: "https://dexaran.github.io/erc223/",
  },
  {
    text: "ERC-223 page source codes",
    href: "https://github.com/Dexaran/dexaran.github.io/tree/master/erc223-page-sources",
  },
  {
    text: "Token Converter UI (work-in-progress / test version)",
    href: "https://dexaran.github.io/token-converter",
  },
  {
    text: "Token Converter UI source code",
    href: "https://github.com/Dexaran/dexaran.github.io/tree/master/token-converter-sources",
  },
  {
    text: "Token standard converter smart-contract source code (work-in-progress / test version)",
    href: "https://github.com/Dexaran/TokenStandardConverter",
  },
  {
    text: "ERC-20 losses calculator script",
    href: "https://github.com/Dexaran/lost_tokens_react/tree/master",
  },
  {
    text: "ERC-20 losses old version (deprecated)",
    href: "https://dexaran.github.io/erc20_losses/",
  },
];

export default function References({ refEl }) {
  const referencesEntryRef = useRef<HTMLDivElement | null>(null);
  const referencesEntry = useIntersectionObserver(referencesEntryRef, {
    threshold: 0.6,
    freezeOnceVisible: true,
  });

  return (
    <div>
      <div ref={refEl} />
      <NeonBlock
        icon="references"
        color="green"
        overlineText="References"
        anchor="references"
        leftContent={
          <>
            <div className="flex flex-col gap-5">
              <p className="text-24 font-semibold text-primary-text">Here you can track the progress:</p>
            </div>
            <ul className="mt-24">
              {references.map((reference) => {
                return (
                  <li className="border-b border-primary-border"  key={reference.text}>
                    <a target="_blank" href={reference.href} className="hover:text-green py-3.5 text-secondary-text flex items-center gap-6 justify-between text-18 duration-200">
                      <span>{reference.text}</span>
                      <Svg className="flex-shrink-0" iconName="forward" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </>
        }
        rightContent={
          <div
            ref={referencesEntryRef}
            className={clsx("pt-[200px] flex justify-end", referencesEntry?.isIntersecting && "animated")}
          >
            <Image src={DevSourcesImage} alt="" />
          </div>
        }
      />
    </div>
  );
}
