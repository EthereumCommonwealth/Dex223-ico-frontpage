import { useTranslations } from "next-intl";
import React from "react";

import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import ReadMore from "@/components/atoms/ReadMore";
import GlyphPoint from "@/components/GlyphPoint";
import NeonBlock from "@/components/organisms/NeonBlock";
import SectionIntro from "@/components/SectionIntro";

export default function MultiChain() {
  const t = useTranslations("MultiChain");

  return (
    <NeonBlock
      icon="multichain-rollout"
      anchor="crosschain-deployment"
      color="blue"
      differentColumns
      overlineText={t("overline")}
      patterns={
        <>
          <Pattern
            patternColor={PatternColor.BLUE}
            className="w-150 h-150 -right-[491px] top-[152px] -scale-x-100"
          />
          <Pattern
            patternColor={PatternColor.BLUE}
            className="w-250 h-250 -left-[421px] bottom-0 -scale-x-100"
          />
        </>
      }
      leftContent={
        <>
          <SectionIntro heading={t("heading")} lede={t("lede")} />
          <div className="mt-8 flex flex-col gap-5">
            <GlyphPoint
              icon="eth"
              tone="blue"
              title={t("points.lock.title")}
              text={t("points.lock.text")}
            />
            <GlyphPoint
              icon="multichain-rollout"
              tone="blue"
              title={t("points.chains.title")}
              text={t("points.chains.text")}
            />
            <GlyphPoint
              icon="partners"
              tone="blue"
              title={t("points.partners.title")}
              text={t("points.partners.text")}
            />
          </div>
          <ReadMore>
            <div className="flex flex-col gap-5 text-secondary-text text-16 lg:text-18">
              <p>{t("paragraphs.initialOffering")}</p>
              <p>{t("paragraphs.influencers")}</p>
              <p>{t("paragraphs.confirmedChains")}</p>
            </div>
          </ReadMore>
        </>
      }
      rightContent={
        <div className="flex items-center mb-[53px] h-full pt-[72px] lg:pt-[55px]">
          <div className="h-full max-w-[296px] lg:max-w-[unset] w-full flex items-center relative shrink-0">
            <div className="absolute top-1/2 left-1/2 w-[72%] h-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 bg-blue blur-[160px] animate-breathing"></div>
            <img
              className="xl:absolute w-full h-auto top-0 z-10"
              src="/images/crosschain.svg"
              alt=""
            />
          </div>
        </div>
      }
    />
  );
}
