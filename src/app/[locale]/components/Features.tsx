import { useTranslations } from "next-intl";
import React from "react";

import ArticleHeading from "@/components/ArticleHeading";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import KeyFeatureCard from "@/components/KeyFeatureCard";
import NeonBlock from "@/components/organisms/NeonBlock";

export default function Features() {
  const t = useTranslations("Features");

  return (
    <div>
      <NeonBlock
        color="green"
        icon="key"
        differentColumns
        leftContent={
          <div className="lg:mb-[60px] mb-6">
            <ArticleHeading text={t("heading")} />
            <p className="text-secondary-text text-16 lg:text-18">{t("description")}</p>
          </div>
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
            text={t("cards.solvingProblem.text")}
            iconName="solving-problem"
          />
          <KeyFeatureCard
            heading={t("cards.chainSupport.heading")}
            text={t("cards.chainSupport.text")}
            iconName="references"
          />

          <KeyFeatureCard
            heading={t("cards.nonDiscrimination.heading")}
            text={t("cards.nonDiscrimination.text")}
            iconName="non-discrimination"
          />
          <KeyFeatureCard
            heading={t("cards.financialTransparency.heading")}
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
