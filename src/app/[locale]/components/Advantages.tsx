"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import BulletListItem from "@/components/atoms/BulletListItem";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import NeonBlock from "@/components/organisms/NeonBlock";
import ERC223SupportImage from "@/inlined-svgs/ERC-223SupportImage";
import MTImage from "@/inlined-svgs/MTImage";
import TransparentALImage from "@/inlined-svgs/TransparentALImage";

function FeatureBlock({
  heading,
  content,
  image,
  anchor,
}: {
  heading: string;
  content: ReactNode;
  image: ReactNode;
  anchor?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const currentNode = ref.current;

      const recalculatePositions = (e: MouseEvent) => {
        const positions1 = currentNode.getBoundingClientRect();

        setPositions({
          left: e.clientX - positions1.left,
          top: e.clientY - positions1.top,
          width: positions1.width,
          height: positions1.height,
        });
      };

      currentNode.addEventListener("mouseenter", () => {
        currentNode.addEventListener("mousemove", recalculatePositions);
      });
      currentNode.addEventListener("mouseleave", () => {
        currentNode.removeEventListener("mousemove", recalculatePositions);
      });

      return () => {
        // currentNode.removeEventListener('mousemove', recalculatePositions);
      };
    }
  }, []);

  const [rotations, setRotations] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const xRotation = (positions.top / positions.height - 0.5) * -2;
    const yRotation = (positions.left / positions.width - 0.5) * -2;

    setRotations({ x: xRotation, y: yRotation });
  }, [positions.height, positions.left, positions.top, positions.width]);

  return (
    <div
      ref={ref}
      onMouseLeave={() => {
        setRotations({ x: 0, y: 0 });
      }}
      style={{
        transform: `perspective(700px) rotateX(${rotations.x}deg) rotateY(${rotations.y}deg)`,
      }}
      className="relative surface surface-hover no-spotlight rounded-5 p-4 lg:p-10 group overflow-hidden duration-300 hover:duration-100"
    >
      <div className="absolute -top-10" id={anchor} />
      <div
        style={{ left: positions.left, top: positions.top }}
        className="absolute pointer-events-none w-0 h-0 -translate-x-1/2 -translate-y-1/2 opacity-[.22] z-[1] blur-[20px] group-hover:w-[700px] group-hover:h-[700px] bg-[radial-gradient(circle_closest-side,#7D97A4,transparent)]"
      />

      <div className="flex items-center gap-5 mb-5">
        {image}
        <h4 className="text-18 lg:text-24 font-bold">{heading}</h4>
      </div>
      {content}
    </div>
  );
}

export default function Advantages() {
  const t = useTranslations("Advantages");
  const locale = useLocale();
  const bold = (chunks: ReactNode) => <b className="text-18 lg:text-20">{chunks}</b>;

  return (
    <>
      <NeonBlock
        icon="star"
        color="blue"
        overlineText={t("overline")}
        differentColumns
        leftContent={
          <>
            <ArticleHeading text={t("heading")} />
            <p className="mb-6 lg:mb-[60px] text-16 lg:text-18 text-secondary-text">{t("intro")}</p>
          </>
        }
      />
      <Container>
        <Pattern
          patternColor={PatternColor.BLUE}
          className="w-300 h-300 -left-[401px] top-[148px]"
        />
        <Pattern
          patternColor={PatternColor.BLUE}
          className="w-250 h-250 -right-[681px] -top-[276px] -scale-100"
        />

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5 grid-cols-1">
          <FeatureBlock
            image={<MTImage />}
            content={
              <>
                <div className="flex flex-col gap-5 text-secondary-text text-16 lg:text-18">
                  <p>{t("marginTrading.intro")}</p>

                  <div>
                    <h5 className="text-18 lg:text-20 font-bold mb-3">
                      {t("marginTrading.lendingOrders.heading")}
                    </h5>
                    <ul className="flex flex-col gap-2">
                      <BulletListItem>
                        {t.rich("marginTrading.lendingOrders.funds", { b: bold })}
                      </BulletListItem>
                      <BulletListItem>
                        {t.rich("marginTrading.lendingOrders.interestRate", { b: bold })}
                      </BulletListItem>
                      <BulletListItem>
                        {t.rich("marginTrading.lendingOrders.permittedMarkets", { b: bold })}
                      </BulletListItem>
                      <li>{t.rich("marginTrading.lendingOrders.collateral", { b: bold })}</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-18 lg:text-20 font-bold mb-3">
                      {t("marginTrading.borrowerAccess.heading")}
                    </h5>
                    <ul className="flex flex-col gap-2">
                      <BulletListItem>{t("marginTrading.borrowerAccess.deposit")}</BulletListItem>
                      <BulletListItem>{t("marginTrading.borrowerAccess.trade")}</BulletListItem>
                      <BulletListItem>{t("marginTrading.borrowerAccess.security")}</BulletListItem>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-18 lg:text-20 font-bold mb-3">
                      {t("marginTrading.liquidation.heading")}
                    </h5>
                    <ul className="flex flex-col gap-2">
                      <BulletListItem>
                        {t("marginTrading.liquidation.expectedBalance")}
                      </BulletListItem>
                      <BulletListItem>
                        {t("marginTrading.liquidation.actualBalance")}
                      </BulletListItem>
                      <BulletListItem>{t("marginTrading.liquidation.trigger")}</BulletListItem>
                      <BulletListItem>{t("marginTrading.liquidation.autoClose")}</BulletListItem>
                      <BulletListItem>{t("marginTrading.liquidation.noOracles")}</BulletListItem>
                    </ul>
                  </div>

                  <p>{t("marginTrading.summary")}</p>

                  <p>
                    {t.rich("marginTrading.deepDive", {
                      link: (chunks) => (
                        <TextLink
                          text={chunks}
                          isExternal
                          href="https://youtu.be/hZW6AIrAznQ?si=XK3twzPiFyuHjlPF"
                        />
                      ),
                    })}
                  </p>
                </div>
              </>
            }
            heading={t("marginTrading.heading")}
          />
          <div className="flex flex-col gap-5">
            <FeatureBlock
              anchor="margin"
              image={<ERC223SupportImage />}
              content={
                <div className="flex flex-col gap-5 text-16 lg:text-18 text-secondary-text">
                  <p>{t("erc223Support.losses")}</p>
                  <p>{t("erc223Support.marginTrading")}</p>
                  <p>{t("erc223Support.erc20Fallback")}</p>
                </div>
              }
              heading={t("erc223Support.heading")}
            />
            <FeatureBlock
              image={<TransparentALImage />}
              content={
                <div className="flex flex-col gap-5 text-16 lg:text-18 text-secondary-text">
                  <p>
                    {t.rich("autoListings.description", {
                      tokenlists: (chunks) => (
                        <TextLink href="https://tokenlists.org" isExternal text={chunks} />
                      ),
                      autolisting: (chunks) => (
                        <TextLink
                          text={chunks}
                          href={`https://test-app.dex223.io/${locale}/token-listing`}
                          isExternal
                        />
                      ),
                    })}
                  </p>
                </div>
              }
              heading={t("autoListings.heading")}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
