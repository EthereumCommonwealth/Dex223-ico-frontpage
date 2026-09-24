import { useTranslations } from "next-intl";
import React from "react";

import { buttonClassName, ButtonColor, ButtonSize } from "@/components/atoms/Button";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import Svg from "@/components/atoms/Svg";
import TextLink from "@/components/atoms/TextLink";
import NeonBlock from "@/components/organisms/NeonBlock";
import SectionIntro from "@/components/SectionIntro";
import { Link } from "@/i18n/routing";

const infoFields = [
  {
    labelKey: "tokenName",
    value: "DEX223",
  },
  {
    labelKey: "network",
    value: "Ethereum",
  },
  {
    labelKey: "ticker",
    value: "D223",
  },
  {
    labelKey: "address",
    value: (
      <a
        className="text-green underline"
        target="_blank"
        rel="noopener noreferrer"
        href="https://etherscan.io/address/0x0908078da2935a14bc7a17770292818c85b580dd"
      >
        0x09&shy;08078d&shy;a2935a&shy;14bc7a1&shy;7770292&shy;818c85&shy;b580dd
      </a>
    ),
  },
  {
    labelKey: "maxSupply",
    value: "8,000,000,000 D223",
  },
  {
    labelKey: "decimals",
    value: "18",
  },
  {
    labelKey: "standard",
    value: null,
  },
  {
    labelKey: "publicSalePrice",
    value: "$0.001",
  },
];

export default function Info() {
  const t = useTranslations("Info");

  return (
    <div className={"relative"}>
      <NeonBlock
        differentColumns
        icon="info"
        color="green"
        overlineText={t("overline")}
        patterns={
          <>
            <Pattern
              patternColor={PatternColor.GREEN}
              className="w-250 h-250 -right-[411px] top-[152px]"
            />
            <Pattern
              patternColor={PatternColor.GREEN}
              className="w-250 h-250 -left-[611px] top-[152px]"
            />
          </>
        }
        leftContent={
          <>
            <SectionIntro
              className="mb-8"
              heading={t("heading")}
              lede={t("lede")}
              details={<p>{t("projection")}</p>}
            />

            <div className="flex flex-col gap-5 mb-6 text-secondary-text text-16 lg:text-18">
              <p className="">
                {t.rich("upgradeGuide", {
                  link: (chunks) => (
                    <TextLink
                      href="https://medium.com/dex223/token-d223-upgrade-guide-direct-token-transfer-to-the-contract-90405987f629"
                      text={chunks}
                    />
                  ),
                })}
              </p>
            </div>

            <div className="mb-6">
              {infoFields.map((infoField) => {
                return (
                  <div
                    key={infoField.labelKey}
                    className="py-2.5 flex justify-between gap-4 items-start border-b border-b-secondary-border last-of-type:border-b-0"
                  >
                    <span className="text-16 lg:text-18 text-secondary-text">
                      {t(`fields.${infoField.labelKey}`)}
                    </span>
                    <span className="text-16 lg:text-18 text-right text-primary-text">
                      {infoField.labelKey === "standard"
                        ? t.rich("standardValue", {
                            link: (chunks) => (
                              <TextLink
                                text={chunks}
                                href="https://eips.ethereum.org/EIPS/eip-7417"
                              />
                            ),
                          })
                        : infoField.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 max-md:flex-col">
              <Link
                href="/upgrade"
                className={buttonClassName({
                  className: "max-md:w-full gap-3 text-16",
                  colorScheme: ButtonColor.GREEN,
                  size: ButtonSize.EXTRA_LARGE,
                  mobileSize: ButtonSize.LARGE,
                })}
              >
                {t("upgradeTokens")}
                <Svg iconName="forward" aria-hidden />
              </Link>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docsend.com/view/zdcya97tgiiiqvwy"
                className={buttonClassName({
                  className: "max-md:w-full gap-3 text-16",
                  colorScheme: ButtonColor.LIGHT_GREEN,
                  size: ButtonSize.EXTRA_LARGE,
                  mobileSize: ButtonSize.LARGE,
                })}
              >
                {t("viewPitchDeck")}
                <Svg iconName="forward" aria-hidden />
              </a>
            </div>
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
