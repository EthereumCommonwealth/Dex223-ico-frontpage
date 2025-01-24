import React from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Button, { ButtonColor, ButtonSize } from "@/components/atoms/Button";
import Svg from "@/components/atoms/Svg";
import TextLink from "@/components/atoms/TextLink";
import NeonBlock from "@/components/organisms/NeonBlock";

const infoFields = [
  {
    label: "Token name",
    value: "DEX223",
  },
  {
    label: "Network",
    value: "Ethereum",
  },
  {
    label: "Ticker",
    value: "D223",
  },
  {
    label: "Address",
    value: (
      <a
        className="text-green underline"
        target="_blank"
        href="https://etherscan.io/address/0x0908078da2935a14bc7a17770292818c85b580dd"
      >
        0x09&shy;08078d&shy;a2935a&shy;14bc7a1&shy;7770292&shy;818c85&shy;b580dd
      </a>
    ),
  },
  {
    label: "Max supply",
    value: "8,000,000,000 D223",
  },
  {
    label: "Decimals",
    value: "18",
  },
  {
    label: "Standard",
    value: (
      <>
        ERC-223 / Convertable to ERC-20 via{" "}
        <TextLink text="EIP-7417" href="https://eips.ethereum.org/EIPS/eip-7417" />
      </>
    ),
  },
  {
    label: "Public sale price",
    value: "$0.001",
  },
];

export default function Info() {
  return (
    <div className={"relative"}>
      <NeonBlock
        differentColumns
        icon="info"
        color="green"
        overlineText="Info"
        leftContent={
          <>
            <ArticleHeading text="Projection and token information" />

            <div className="flex flex-col gap-5 mb-6 text-secondary-text text-16 lg:text-18">
              <p>
                On August 29, 2023, Uniswap V3 recorded a daily trading volume of $883 million. If
                DEX223 manages to capture just 5% of that volume with a 0.2% taker fee, the
                projected monthly revenue shared among D223 holders could reach $2,649,000. Under
                these conditions, anyone purchasing D223 tokens at the public sale price might see
                an estimated 397% ROI over a 12-month period, derived solely from trading fee
                revenues.
              </p>
              <p className="">
                For more information about the D223 upgrade and how to transfer tokens directly to
                the contract, refer to the{" "}
                <TextLink
                  href="https://medium.com/dex223/token-d223-upgrade-guide-direct-token-transfer-to-the-contract-90405987f629"
                  text="Token D223 upgrade guide"
                />
                .
              </p>
            </div>

            <div className="mb-6">
              {infoFields.map((infoField) => {
                return (
                  <div
                    key={infoField.label}
                    className="py-2.5 flex justify-between gap-4 items-start border-b border-b-secondary-border last-of-type:border-b-0"
                  >
                    <span className="text-16 lg:text-18 text-secondary-text">
                      {infoField.label}
                    </span>
                    <span className="text-16 lg:text-18 text-right text-primary-text">
                      {infoField.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <Button
              className="text-16"
              colorScheme={ButtonColor.LIGHT_GREEN}
              size={ButtonSize.EXTRA_LARGE}
            >
              <span className="flex items-center gap-3">
                Download pitch deck
                <Svg iconName="download" />
              </span>
            </Button>
          </>
        }
        rightContent={
          <div className="flex items-center mb-[75px] lg:mb-[56px] h-full">
            <div className="max-w-[296px] lg:max-w-[unset] w-full aspect-square relative shrink-0">
              <div className="absolute top-1/2 left-1/2 w-[72%] h-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 bg-green blur-[160px] animate-breathing"></div>
              <img
                className="absolute z-10 top-[8%] right-[8%] w-[31%] animate-info-image-1"
                src="/images/token-info/token-info-1.svg"
                alt=""
              />
              <img
                className="absolute z-10 left-[8.2%] bottom-[6%] w-[59%] animate-info-image-2"
                src="/images/token-info/token-info-2.svg"
                alt=""
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
