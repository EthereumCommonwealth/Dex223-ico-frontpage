"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import BulletListItem from "@/components/atoms/BulletListItem";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import ReadMore from "@/components/atoms/ReadMore";
import Svg from "@/components/atoms/Svg";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import GlyphPoint from "@/components/GlyphPoint";
import NeonBlock from "@/components/organisms/NeonBlock";
import SectionIntro from "@/components/SectionIntro";
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

/** A big number with a short label, so the figure is read before the words. */
function Stat({ value, label, tone }: { value: string; label: ReactNode; tone: "red" | "green" }) {
  return (
    <div className="rounded-3 bg-tertiary-bg/60 px-4 py-3 lg:px-5 lg:py-4">
      <p
        className={clsx(
          "text-32 lg:text-40 font-bold tabular-nums tracking-[-0.02em] leading-[1.2] lg:leading-[1.2]",
          tone === "red" ? "text-red-light" : "text-green",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-14 lg:text-16 text-secondary-text">{label}</p>
    </div>
  );
}

function GroupHeading({ children }: { children: ReactNode }) {
  return (
    <h5 className="mb-4 text-12 lg:text-14 font-semibold uppercase tracking-[0.08em] text-tertiary-text">
      {children}
    </h5>
  );
}

function Lede({ children }: { children: ReactNode }) {
  return <p className="text-18 lg:text-20 leading-[1.5] text-primary-text/90">{children}</p>;
}

function Details({ children }: { children: ReactNode }) {
  return (
    <ReadMore>
      <div className="flex flex-col gap-4 text-secondary-text text-16 lg:text-18">{children}</div>
    </ReadMore>
  );
}

export default function Advantages() {
  const t = useTranslations("Advantages");
  const locale = useLocale();
  const bold = (chunks: ReactNode) => <b className="text-primary-text">{chunks}</b>;
  const tokenlistsLink = (chunks: ReactNode) => (
    <TextLink href="https://tokenlists.org" isExternal text={chunks} />
  );
  const autolistingLink = (chunks: ReactNode) => (
    <TextLink
      text={chunks}
      href={`https://test-app.dex223.io/${locale}/token-listing`}
      isExternal
    />
  );

  return (
    <>
      <NeonBlock
        icon="star"
        color="blue"
        overlineText={t("overline")}
        differentColumns
        leftContent={
          <SectionIntro
            className="mb-6 lg:mb-[60px]"
            heading={t("heading")}
            lede={t("lede")}
            details={<p>{t("intro")}</p>}
          />
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
              <div className="flex flex-col gap-8">
                <Lede>{t("marginTrading.lede")}</Lede>

                <div>
                  <GroupHeading>{t("marginTrading.lendingOrders.heading")}</GroupHeading>
                  <div className="grid gap-5">
                    <GlyphPoint
                      icon="token"
                      tone="blue"
                      title={t("marginTrading.lendingOrders.glyphs.funds.title")}
                      text={t("marginTrading.lendingOrders.glyphs.funds.text")}
                    />
                    <GlyphPoint
                      icon="chart"
                      tone="blue"
                      title={t("marginTrading.lendingOrders.glyphs.terms.title")}
                      text={t("marginTrading.lendingOrders.glyphs.terms.text")}
                    />
                    <GlyphPoint
                      icon="market"
                      tone="blue"
                      title={t("marginTrading.lendingOrders.glyphs.markets.title")}
                      text={t("marginTrading.lendingOrders.glyphs.markets.text")}
                    />
                    <GlyphPoint
                      icon="settings"
                      tone="blue"
                      title={t("marginTrading.lendingOrders.glyphs.collateral.title")}
                      text={t("marginTrading.lendingOrders.glyphs.collateral.text")}
                    />
                  </div>
                </div>

                <div>
                  <GroupHeading>{t("marginTrading.borrowerAccess.heading")}</GroupHeading>
                  <div className="grid gap-5">
                    <GlyphPoint
                      icon="wallet"
                      tone="purple"
                      title={t("marginTrading.borrowerAccess.glyphs.deposit.title")}
                      text={t("marginTrading.borrowerAccess.glyphs.deposit.text")}
                    />
                    <GlyphPoint
                      icon="margin-trading"
                      tone="purple"
                      title={t("marginTrading.borrowerAccess.glyphs.trade.title")}
                      text={t("marginTrading.borrowerAccess.glyphs.trade.text")}
                    />
                  </div>
                </div>

                <div>
                  <GroupHeading>{t("marginTrading.liquidation.title")}</GroupHeading>
                  <div className="grid gap-5">
                    <GlyphPoint
                      icon="target"
                      title={t("marginTrading.liquidation.glyphs.expected.title")}
                      text={t("marginTrading.liquidation.glyphs.expected.text")}
                    />
                    <GlyphPoint
                      icon="warning"
                      title={t("marginTrading.liquidation.glyphs.trigger.title")}
                      text={t("marginTrading.liquidation.glyphs.trigger.text")}
                    />
                    <GlyphPoint
                      icon="security"
                      title={t("marginTrading.liquidation.glyphs.noOracles.title")}
                      text={t("marginTrading.liquidation.glyphs.noOracles.text")}
                    />
                  </div>
                </div>

                <Details>
                  <p>{t("marginTrading.intro")}</p>
                  <div>
                    <h5 className="text-18 lg:text-20 font-bold text-primary-text mb-3">
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
                      <BulletListItem>
                        {t.rich("marginTrading.lendingOrders.collateral", { b: bold })}
                      </BulletListItem>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-18 lg:text-20 font-bold text-primary-text mb-3">
                      {t("marginTrading.borrowerAccess.heading")}
                    </h5>
                    <ul className="flex flex-col gap-2">
                      <BulletListItem>{t("marginTrading.borrowerAccess.deposit")}</BulletListItem>
                      <BulletListItem>{t("marginTrading.borrowerAccess.trade")}</BulletListItem>
                      <BulletListItem>{t("marginTrading.borrowerAccess.security")}</BulletListItem>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-18 lg:text-20 font-bold text-primary-text mb-3">
                      {t("marginTrading.liquidation.title")}
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
                </Details>

                <p className="flex items-center gap-2 text-16 lg:text-18 text-secondary-text">
                  <Svg iconName="forward" size={24} className="text-green flex-shrink-0" />
                  <span>
                    {t.rich("marginTrading.deepDive", {
                      link: (chunks) => (
                        <TextLink
                          text={chunks}
                          isExternal
                          href="https://youtu.be/hZW6AIrAznQ?si=XK3twzPiFyuHjlPF"
                        />
                      ),
                    })}
                  </span>
                </p>
              </div>
            }
            heading={t("marginTrading.heading")}
          />
          <div className="flex flex-col gap-5">
            <FeatureBlock
              anchor="margin"
              image={<ERC223SupportImage />}
              content={
                <div className="flex flex-col gap-6">
                  <Lede>{t("erc223Support.lede")}</Lede>
                  <div className="grid grid-cols-2 gap-3">
                    <Stat value="$201M" tone="red" label={t("erc223Support.lossesStat")} />
                    <Stat value="15%" tone="green" label={t("erc223Support.gasStat")} />
                  </div>
                  <div className="grid gap-5">
                    <GlyphPoint
                      icon="security"
                      title={t("erc223Support.glyphs.control.title")}
                      text={t("erc223Support.glyphs.control.text")}
                    />
                    <GlyphPoint
                      icon="margin-trading"
                      tone="blue"
                      title={t("erc223Support.glyphs.margin.title")}
                      text={t("erc223Support.glyphs.margin.text")}
                    />
                    <GlyphPoint
                      icon="swap-horizontal"
                      tone="purple"
                      title={t("erc223Support.glyphs.fallback.title")}
                      text={t("erc223Support.glyphs.fallback.text")}
                    />
                  </div>
                  <Details>
                    <p>{t("erc223Support.losses")}</p>
                    <p>{t("erc223Support.marginTrading")}</p>
                    <p>{t("erc223Support.erc20Fallback")}</p>
                  </Details>
                </div>
              }
              heading={t("erc223Support.heading")}
            />
            <FeatureBlock
              image={<TransparentALImage />}
              content={
                <div className="flex flex-col gap-6">
                  <Lede>{t("autoListings.lede")}</Lede>
                  <div className="grid gap-5">
                    <GlyphPoint
                      icon="token"
                      tone="blue"
                      title={t("autoListings.glyphs.import.title")}
                      text={t.rich("autoListings.glyphs.import.text", {
                        tokenlists: tokenlistsLink,
                      })}
                    />
                    <GlyphPoint
                      icon="auto-listing"
                      title={t("autoListings.glyphs.contract.title")}
                      text={t.rich("autoListings.glyphs.contract.text", {
                        autolisting: autolistingLink,
                      })}
                    />
                    <GlyphPoint
                      icon="double-usd"
                      tone="purple"
                      title={t("autoListings.glyphs.revenue.title")}
                      text={t("autoListings.glyphs.revenue.text")}
                    />
                    <GlyphPoint
                      icon="decision"
                      tone="purple"
                      title={t("autoListings.glyphs.voting.title")}
                      text={t("autoListings.glyphs.voting.text")}
                    />
                  </div>
                  <Details>
                    <p>
                      {t.rich("autoListings.description", {
                        tokenlists: tokenlistsLink,
                        autolisting: autolistingLink,
                      })}
                    </p>
                  </Details>
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
