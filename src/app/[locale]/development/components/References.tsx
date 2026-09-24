"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

import DevSourcesImage from "@/assets/images/dev-src-2.svg";
import Svg from "@/components/atoms/Svg";
import NeonBlock from "@/components/organisms/NeonBlock";
import { linkTargetProps } from "@/functions/links";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const references = [
  {
    key: "icoPageSource",
    href: "https://github.com/Dexaran/Dex223-ICO-page",
  },
  {
    key: "icoSmartContracts",
    href: "https://github.com/Dexaran/D223ICO",
  },
  {
    key: "autoListingSource",
    href: "https://github.com/Dexaran/Dex223-exchange/blob/main/auto-listing.sol",
  },
  {
    key: "erc223Hub",
    href: "https://dexaran.github.io/erc223/",
  },
  {
    key: "erc223PageSource",
    href: "https://github.com/Dexaran/dexaran.github.io/tree/master/erc223-page-sources",
  },
  {
    key: "converterUi",
    href: "https://app.dex223.io/converter",
  },
  {
    key: "converterUiSource",
    href: "https://github.com/Dexaran/dexaran.github.io/tree/master/token-converter-sources",
  },
  {
    key: "converterContractSource",
    href: "https://github.com/Dexaran/TokenStandardConverter",
  },
  {
    key: "lossesCalculatorScript",
    href: "https://github.com/Dexaran/lost_tokens_react/tree/master",
  },
  {
    key: "lossesOldVersion",
    href: "https://dexaran.github.io/erc20_losses/",
  },
];

export default function References({ refEl }) {
  const t = useTranslations("Development");
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
        differentColumns
        color="green"
        overlineText={t("references.overline")}
        anchor="references"
        leftContent={
          <>
            <div className="flex flex-col gap-5">
              <p className="text-24 font-semibold text-primary-text">{t("references.heading")}</p>
            </div>
            <ul className="mt-24">
              {references.map((reference) => {
                return (
                  <li className="border-b border-primary-border" key={reference.key}>
                    <a
                      {...linkTargetProps(reference.href)}
                      href={reference.href}
                      className="hover:text-green py-3.5 text-secondary-text flex gap-6 justify-between text-16 lg:text-18 duration-200"
                    >
                      <span>{t(`references.items.${reference.key}`)}</span>
                      <Svg className="flex-shrink-0 mt-0.5" iconName="forward" />
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
            className={clsx("pt-0 lg:pt-[152px]", referencesEntry?.isIntersecting && "animated")}
          >
            <Image src={DevSourcesImage} className="w-full max-lg:max-w-[310px]" alt="" />
          </div>
        }
      />
    </div>
  );
}
