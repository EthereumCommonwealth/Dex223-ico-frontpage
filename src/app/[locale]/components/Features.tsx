import { useTranslations } from "next-intl";
import React from "react";

import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import KeyFeatureCard from "@/components/KeyFeatureCard";
import NeonBlock from "@/components/organisms/NeonBlock";
import SectionIntro from "@/components/SectionIntro";

export default function Features() {
  const t = useTranslations("Features");

  return (
    <div>
      <NeonBlock
        color="green"
        icon="key"
        differentColumns
        leftContent={
          <SectionIntro
            className="lg:mb-[60px] mb-6"
            heading={t("heading")}
            lede={t("lede")}
            details={<p>{t("description")}</p>}
          />
        }
        overlineText={t("overline")}
      />

      <Container>
        <div
          data-reveal-stagger
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 lg:gap-5"
        >
          <KeyFeatureCard
            heading={t("cards.solvingProblem.heading")}
            shortText={t("cards.solvingProblem.summary")}
            text={t("cards.solvingProblem.text")}
            iconName="solving-problem"
          />
          <KeyFeatureCard
            heading={t("cards.chainSupport.heading")}
            shortText={t("cards.chainSupport.summary")}
            text={t("cards.chainSupport.text")}
            iconName="references"
          />

          <KeyFeatureCard
            heading={t("cards.nonDiscrimination.heading")}
            shortText={t("cards.nonDiscrimination.summary")}
            text={t("cards.nonDiscrimination.text")}
            iconName="non-discrimination"
          />
          <KeyFeatureCard
            heading={t("cards.financialTransparency.heading")}
            shortText={t("cards.financialTransparency.summary")}
            text={
              <span>
                {t.rich("cards.financialTransparency.text", {
                  link: (chunks) => (
                    <TextLink
                      text={chunks}
                      href="http://github.com/EthereumCommonwealth/Roadmap/issues/70"
                      isExternal
                    />
                  ),
                })}
              </span>
            }
            iconName="financial-transparency"
          />
        </div>
      </Container>
    </div>
  );
}
