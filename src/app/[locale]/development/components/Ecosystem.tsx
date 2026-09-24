import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

import DevSourcesImage from "@/assets/images/dev-src-2.svg";
import EcosystemImage from "@/assets/images/ecosystem.svg";
import ArticleHeading from "@/components/ArticleHeading";
import BulletListItem from "@/components/atoms/BulletListItem";
import TextLink from "@/components/atoms/TextLink";
import NeonBlock from "@/components/organisms/NeonBlock";

export default function Ecosystem() {
  const t = useTranslations("Development");

  return (
    <NeonBlock
      color="green"
      overlineText={t("ecosystem.overline")}
      differentColumns
      icon="ecosystem"
      leftContent={
        <>
          <ArticleHeading text={t("ecosystem.heading")} />
          <div className="flex flex-col gap-4 text-secondary-text text-16 lg:text-18">
            <p className="text-16 lg:text-18">{t("ecosystem.intro")}</p>

            <ul className="text-16 lg:text-18 flex flex-col gap-2">
              <BulletListItem>
                <TextLink
                  href="https://dexaran.github.io/token-converter"
                  text={t("ecosystem.items.converter.title")}
                />
                <p>{t("ecosystem.items.converter.description")}</p>
              </BulletListItem>
              <BulletListItem>
                <TextLink
                  href="https://dexaran.github.io/erc20-losses"
                  text={t("ecosystem.items.lossesCalculator.title")}
                />
                <p>{t("ecosystem.items.lossesCalculator.description")}</p>
              </BulletListItem>
              <BulletListItem>
                <TextLink
                  href="https://dexaran.github.io/erc223/"
                  text={t("ecosystem.items.aggregationPage.title")}
                />
                <p>{t("ecosystem.items.aggregationPage.description")}</p>
              </BulletListItem>
            </ul>
          </div>
        </>
      }
      rightContent={
        <div className={clsx("pt-0 lg:pt-[152px] animated")}>
          <Image src={EcosystemImage} className="w-full max-lg:max-w-[310px]" alt="" />
        </div>
      }
    />
  );
}
