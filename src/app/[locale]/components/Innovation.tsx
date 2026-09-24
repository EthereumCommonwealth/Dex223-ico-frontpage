import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { HTMLProps, ReactNode } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import Container from "@/components/Container";
import KeyFeatureCard from "@/components/KeyFeatureCard";
import NeonBlock from "@/components/organisms/NeonBlock";

export default function Innovation() {
  const t = useTranslations("Innovation");

  return (
    <div>
      <NeonBlock
        color="green"
        icon="lamp"
        overlineText={t("overline")}
        differentColumns
        leftContent={
          <>
            <ArticleHeading text={t("heading")} />
            <p className="text-secondary-text text-18 mb-[60px]">{t("description")}</p>
          </>
        }
      />

      <Container>
        <Pattern
          patternColor={PatternColor.GREEN}
          className="w-450 h-450 -left-[871px] -top-[276px] -scale-y-100"
        />

        <div
          data-reveal-stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          <div className="flex flex-col gap-4 lg:gap-5">
            <KeyFeatureCard
              text={t("cards.security.text")}
              iconName="security"
              heading={t("cards.security.heading")}
              className="flex-grow md:max-2xl:bg-[url('/images/innovation_bg_1_mobile.png')] bg-[url('/images/innovation_bg_1.png')] bg-bottom bg-contain bg-no-repeat pb-[224px] sm:pb-[300px] md:pb-[370px] lg:pb-0"
            />
            <KeyFeatureCard
              text={t("cards.economicSustainability.text")}
              iconName="economic-sustainability"
              heading={t("cards.economicSustainability.heading")}
            />
          </div>
          <div className="flex flex-col gap-4 lg:gap-5">
            <KeyFeatureCard
              text={t("cards.decentralization.text")}
              iconName="references"
              heading={t("cards.decentralization.heading")}
            />
            <KeyFeatureCard
              text={t("cards.educating.text")}
              iconName="educating"
              heading={t("cards.educating.heading")}
              className="flex-grow md:max-2xl:bg-[url('/images/innovation_bg_2_mobile.png')] bg-[url('/images/innovation_bg_2.png')] bg-bottom bg-contain bg-no-repeat pb-[276px] md:pb-[312px] lg:pb-0"
            />
          </div>
          <div className="contents lg:flex flex-col gap-4 lg:gap-5">
            <KeyFeatureCard
              text={t("cards.permissionless.text")}
              iconName="permissionless"
              heading={t("cards.permissionless.heading")}
              className="bg-[url('/images/innovation_bg_3.svg')] bg-right bg-cover bg-no-repeat"
            />
            <div className="flex flex-col gap-4 lg:gap-5">
              <KeyFeatureCard
                text={t("cards.governance.text")}
                iconName="team"
                heading={t("cards.governance.heading")}
              />
              <KeyFeatureCard
                text={t("cards.longTermVision.text")}
                iconName="long-term-vision"
                heading={t("cards.longTermVision.heading")}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
