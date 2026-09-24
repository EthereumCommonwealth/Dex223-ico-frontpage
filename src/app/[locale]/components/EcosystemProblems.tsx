"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

import Button, { ButtonColor, ButtonSize } from "@/components/atoms/Button";
import OverlineText from "@/components/atoms/OverlineText";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import ReadMore from "@/components/atoms/ReadMore";
import Svg from "@/components/atoms/Svg";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import GlyphPoint from "@/components/GlyphPoint";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import InterfaceDecentralizationImage from "@/inlined-svgs/InterfaceDecentralizationImage";
import ListingImage from "@/inlined-svgs/ListingImage";

const styles: any = {};

function LostCard({ icon, name, lost, percentage, color, active = false, animate = false }) {
  return (
    <div
      className={clsx(
        "py-2 px-4 xl:py-4 xl:px-5 rounded-2",
        active
          ? "relative before:absolute before:w-full before:h-full before:rounded-2 before:top-0 before:left-0 before:border-red before:border bg-red-gradient"
          : "bg-primary-bg",
      )}
    >
      <div className={"flex justify-between text-primary-text"}>
        <div className={"text-14 xl:text-20 flex items-center gap-2"}>
          {icon} {name}
        </div>
        <span className="font-bold text-14 xl:text-20">{lost}</span>
      </div>
      <div className={"h-5 xl:h-8 mt-2 xl:mt-[18px]"}>
        <div
          className="h-full w-[1%] xl:rounded-2 rounded-[2px]"
          style={{
            width: animate ? `${percentage}%` : "1%",
            backgroundColor: color,
            transitionDuration: "1s",
            transitionTimingFunction: "ease-in-out",
          }}
        />
      </div>
    </div>
  );
}

const ERCLosses = "$108,235,147";
const ERCLossesInt = "$108M";

/** Full original copy, kept one tap away behind "Read more". */
function Details({ children }: { children: React.ReactNode }) {
  return (
    <ReadMore>
      <div className="flex flex-col gap-3 text-secondary-text text-16 xl:text-18">{children}</div>
    </ReadMore>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return <p className="text-18 xl:text-24 leading-[1.4] text-primary-text">{children}</p>;
}

function useSlides() {
  const t = useTranslations("EcosystemProblems");

  return [
    {
      heading: t("erc20Security.heading"),
      content: (
        <div className="grid gap-5 xl:gap-6 xl:pr-9">
          <Lede>{t("erc20Security.lede")}</Lede>
          <div className="rounded-3 border border-red-light/60 bg-red-bg px-4 py-4 xl:px-6 xl:py-5">
            <div className="flex items-center gap-2 text-14 xl:text-16 text-secondary-text">
              <Svg className="text-red-light flex-shrink-0" size={20} iconName="warning" />
              <span>{t("erc20Security.totalLost")}</span>
            </div>
            <p className="mt-1 text-red-light font-bold tabular-nums tracking-[-0.02em] text-36 leading-[1.2] sm:text-48 sm:leading-[1.2]">
              {ERCLosses}
            </p>
            <p className="mt-2 text-14 xl:text-16">
              {t.rich("erc20Security.watchCalculator", {
                link: (chunks) => (
                  <TextLink text={chunks} href="https://dexaran.github.io/erc20-losses" />
                ),
              })}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlyphPoint
              icon="error"
              tone="red"
              title={t("erc20Security.glyphs.legacy.title")}
              text={t("erc20Security.glyphs.legacy.text")}
            />
            <GlyphPoint
              icon="security"
              title={t("erc20Security.glyphs.fix.title")}
              text={t("erc20Security.glyphs.fix.text")}
            />
          </div>
          <Details>
            <p>{t("erc20Security.lead", { amount: ERCLossesInt })}</p>
            <p>{t.rich("erc20Security.history", { desktopOnly: (chunks) => chunks })}</p>
            <p>{t("erc20Security.erc223Security")}</p>
          </Details>
        </div>
      ),
      illustration: ({ animate, key }) => (
        <div key={key} className="px-4 pb-4 xl:px-5 xl:pb-5 bg-secondary-bg rounded-3">
          <div className="pt-1 pb-2 xl:py-[11px] flex justify-between text-secondary-text text-14 xl:text-20">
            <span>{t("erc20Security.table.problem")}</span>
            <span>{t("erc20Security.table.lost")}</span>
          </div>
          <div className="flex flex-col xl:gap-2 gap-1">
            <LostCard
              animate={animate}
              color="#DDAEAE"
              lost={"$60M"}
              icon={<img className="w-5 h-5 xl:w-8 xl:h-8" src="/images/curve-logo.png" alt="" />}
              name={t("erc20Security.incidents.curveHack")}
              percentage={18}
            />
            <LostCard
              animate={animate}
              color="#CD8C8C"
              lost={"$62M"}
              icon={
                <img src="/images/problem-logos/dao.svg" alt="" className="w-5 h-5 xl:w-8 xl:h-8" />
              }
              name={t("erc20Security.incidents.daoHack")}
              percentage={18}
            />
            <LostCard
              animate={animate}
              active
              color="#D24B4B"
              lost={ERCLossesInt}
              icon={
                <img
                  src="/images/problem-logos/user-errors.svg"
                  alt=""
                  className="w-5 h-5 xl:w-8 xl:h-8"
                />
              }
              name={t("erc20Security.incidents.erc20UserErrors")}
              percentage={33}
            />
            <LostCard
              animate={animate}
              color="#CB7373"
              lost={"$150M"}
              icon={
                <img
                  src="/images/problem-logos/compound.svg"
                  alt=""
                  className="w-5 h-5 xl:w-8 xl:h-8"
                />
              }
              name={t("erc20Security.incidents.compoundHack")}
              percentage={46}
            />
            <LostCard
              animate={animate}
              color="#711212"
              lost={"$326M"}
              icon={
                <img
                  src="/images/problem-logos/wormhole.svg"
                  alt=""
                  className="w-5 h-5 xl:w-8 xl:h-8"
                />
              }
              name={t("erc20Security.incidents.wormholeHack")}
              percentage={100}
            />
          </div>
        </div>
      ),
    },
    {
      heading: t("approveTransferFrom.heading"),
      content: (
        <div className="grid gap-5 xl:gap-6 xl:pr-9">
          <Lede>{t("approveTransferFrom.lede")}</Lede>
          <div className="grid gap-4">
            <GlyphPoint
              icon="key"
              tone="red"
              title={t("approveTransferFrom.glyphs.unlimited.title")}
              text={t("approveTransferFrom.glyphs.unlimited.text")}
            />
            <GlyphPoint
              icon="warning"
              tone="red"
              title={t("approveTransferFrom.glyphs.hack.title")}
              text={t("approveTransferFrom.glyphs.hack.text")}
            />
            <GlyphPoint
              icon="security"
              title={t("approveTransferFrom.glyphs.noApproval.title")}
              text={t("approveTransferFrom.glyphs.noApproval.text")}
            />
          </div>
          <Details>
            <p>{t("approveTransferFrom.lead")}</p>
            <p>{t("approveTransferFrom.description")}</p>
            <p className="text-green pl-4 border-l-4 border-green">
              {t("approveTransferFrom.erc223Solution")}
            </p>
          </Details>
        </div>
      ),
      illustration: ({ animate, key }) => (
        <div
          key={key}
          className="relative h-full rounded-5 overflow-hidden xl:bg-[url('/images/approve-prob.png')] bg-[url('/images/approve-prob-mobile.png')]  bg-no-repeat bg-cover bg-top"
        >
          <div className={clsx(styles.attentionMark, animate && styles.animate)} />
          <div className="absolute w-full p-5 flex gap-3 bg-secondary-bg bottom-0 left-0 right-0 border-t border-secondary-border">
            <svg
              className="flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M13.9997 19.834C14.3302 19.834 14.6073 19.7222 14.8309 19.4986C15.0545 19.275 15.1663 18.9979 15.1663 18.6673C15.1663 18.3368 15.0545 18.0597 14.8309 17.8361C14.6073 17.6125 14.3302 17.5007 13.9997 17.5007C13.6691 17.5007 13.392 17.6125 13.1684 17.8361C12.9448 18.0597 12.833 18.3368 12.833 18.6673C12.833 18.9979 12.9448 19.275 13.1684 19.4986C13.392 19.7222 13.6691 19.834 13.9997 19.834ZM12.833 15.1673H15.1663V8.16732H12.833V15.1673ZM13.9997 25.6673C12.3858 25.6673 10.8691 25.3611 9.44967 24.7486C8.03023 24.1361 6.79551 23.3048 5.74551 22.2548C4.69551 21.2048 3.86426 19.9701 3.25176 18.5507C2.63926 17.1312 2.33301 15.6145 2.33301 14.0007C2.33301 12.3868 2.63926 10.8701 3.25176 9.45065C3.86426 8.03121 4.69551 6.79648 5.74551 5.74648C6.79551 4.69648 8.03023 3.86523 9.44967 3.25273C10.8691 2.64023 12.3858 2.33398 13.9997 2.33398C15.6136 2.33398 17.1302 2.64023 18.5497 3.25273C19.9691 3.86523 21.2038 4.69648 22.2538 5.74648C23.3038 6.79648 24.1351 8.03121 24.7476 9.45065C25.3601 10.8701 25.6663 12.3868 25.6663 14.0007C25.6663 15.6145 25.3601 17.1312 24.7476 18.5507C24.1351 19.9701 23.3038 21.2048 22.2538 22.2548C21.2038 23.3048 19.9691 24.1361 18.5497 24.7486C17.1302 25.3611 15.6136 25.6673 13.9997 25.6673ZM13.9997 23.334C16.6052 23.334 18.8122 22.4298 20.6205 20.6215C22.4288 18.8132 23.333 16.6062 23.333 14.0007C23.333 11.3951 22.4288 9.18815 20.6205 7.37982C18.8122 5.57148 16.6052 4.66732 13.9997 4.66732C11.3941 4.66732 9.18717 5.57148 7.37884 7.37982C5.57051 9.18815 4.66634 11.3951 4.66634 14.0007C4.66634 16.6062 5.57051 18.8132 7.37884 20.6215C9.18717 22.4298 11.3941 23.334 13.9997 23.334Z"
                fill="#CD8C8C"
              />
            </svg>
            <span className="max-md:text-12">{t("approveTransferFrom.warning")}</span>
          </div>
        </div>
      ),
    },
    {
      heading: t("existingExchanges.heading"),
      content: (
        <div className="grid gap-5 xl:gap-6 xl:pr-9">
          <Lede>{t("existingExchanges.lede")}</Lede>
          <div className="grid gap-4">
            <GlyphPoint
              icon="restrictions"
              tone="red"
              title={t("existingExchanges.glyphs.unlimited.title")}
              text={t("existingExchanges.glyphs.unlimited.text")}
            />
            <GlyphPoint
              icon="warning"
              tone="red"
              title={t("existingExchanges.glyphs.lingering.title")}
              text={t("existingExchanges.glyphs.lingering.text")}
            />
          </div>
          <Details>
            <p>{t("existingExchanges.lead")}</p>
          </Details>
        </div>
      ),
      illustration: ({ animate, key }) => (
        <div className="flex items-center">
          <div
            key={key}
            className="items-start max-xl:mx-auto max-xl:w-[322px] max-xl:py-1 grid grid-cols-2 gap-2 xl:gap-5 overflow-hidden"
          >
            <div className="flex flex-col gap-2 xl:gap-5">
              <div
                style={{
                  opacity: animate ? `100` : "0",
                  transitionDuration: "0.5s",
                }}
                className={clsx("opacity-0")}
              >
                <picture className="w-full h-auto block">
                  <source srcSet="/images/prob1_mobile.png" media="(max-width: 1024px)" />
                  <img src="/images/prob1.png" alt="" />
                </picture>
              </div>
              <div
                style={{
                  opacity: animate ? `100` : "0",
                  transitionDuration: "0.5s",
                  transitionDelay: "200ms",
                }}
                className={clsx("opacity-0")}
              >
                <picture className="w-full h-auto block">
                  <source srcSet="/images/prob2_mobile.png" media="(max-width: 1024px)" />
                  <img src="/images/prob2.png" alt="" />
                </picture>
              </div>
            </div>
            <div>
              <div
                style={{
                  opacity: animate ? `100` : "0",
                  transitionDuration: "0.5s",
                  transitionDelay: "400ms",
                }}
                className={clsx("opacity-0")}
              >
                <picture className="w-full h-auto block">
                  <source srcSet="/images/prob3_mobile.png" media="(max-width: 1024px)" />
                  <img src="/images/prob3.png" alt="" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      heading: t("gasOptimization.heading"),
      content: (
        <div className="grid gap-5 xl:gap-6 xl:pr-9">
          <div className="flex items-center gap-4">
            <span className="text-green font-bold tabular-nums tracking-[-0.02em] text-48 leading-[1.1] xl:text-58 xl:leading-[1.1]">
              15%
            </span>
            <span className="text-18 xl:text-24 leading-[1.3] text-primary-text [text-wrap:balance]">
              {t("gasOptimization.cheaperLabel")}
            </span>
          </div>
          <div className="grid gap-3 grid-cols-2">
            <div className="rounded-3 bg-secondary-bg p-3 sm:p-4 xl:p-5 ring-1 ring-inset ring-red/20">
              <div className="flex items-center gap-2 text-14 xl:text-16 text-secondary-text">
                <Svg iconName="gas" size={20} className="text-red-light" />
                {t("gasOptimization.erc20Label")}
              </div>
              <p className="mt-1 text-28 sm:text-32 xl:text-40 font-bold tabular-nums text-primary-text">
                257K <span className="text-14 xl:text-16 font-medium text-secondary-text">GAS</span>
              </p>
              <ul className="mt-2 flex flex-col gap-1 text-12 sm:text-14 xl:text-16 text-secondary-text">
                <li>
                  {t.rich("gasOptimization.approvalTx", {
                    link: (chunks) => (
                      <TextLink
                        href="https://explorer.callistodao.org//tx/0xa20d2838ea371759f92e7d4ae9700d2de96cf65de738b518dea1753db7180377"
                        text={chunks}
                      />
                    ),
                  })}
                </li>
                <li>
                  {t.rich("gasOptimization.tokensSwapTx", {
                    link: (chunks) => (
                      <TextLink
                        href="https://explorer.callistodao.org//tx/0xedf726375e86b2e1df80a614049ab5e1a797174fb762d81471e3379e98497d36"
                        text={chunks}
                      />
                    ),
                  })}
                </li>
              </ul>
            </div>
            <div className="rounded-3 bg-secondary-bg p-3 sm:p-4 xl:p-5 ring-1 ring-inset ring-green/30">
              <div className="flex items-center gap-2 text-14 xl:text-16 text-secondary-text">
                <Svg iconName="gas" size={20} className="text-green" />
                {t("gasOptimization.erc223Label")}
              </div>
              <p className="mt-1 text-28 sm:text-32 xl:text-40 font-bold tabular-nums text-green">
                220K <span className="text-14 xl:text-16 font-medium text-secondary-text">GAS</span>
              </p>
              <ul className="mt-2 flex flex-col gap-1 text-12 sm:text-14 xl:text-16 text-secondary-text">
                <li>
                  {t.rich("gasOptimization.erc223SwapTx", {
                    link: (chunks) => (
                      <TextLink
                        href="https://explorer.callistodao.org//tx/0x8cf1d1454723c2c4e0d57b1f7d202bccd47d780de1ffb1482de377a4ae1bef9b"
                        text={chunks}
                      />
                    ),
                  })}
                </li>
                <li className="flex items-start gap-1 text-green">
                  <Svg iconName="check" size={20} className="flex-shrink-0" />
                  {t("gasOptimization.noApproval")}
                </li>
              </ul>
            </div>
          </div>
          <Details>
            <p>{t("gasOptimization.cheaper")}</p>
            <p>{t("gasOptimization.erc20Consumed")}</p>
            <p>{t("gasOptimization.erc223Consumed")}</p>
          </Details>
        </div>
      ),
      illustration: ({ animate, key }) => (
        <div className="flex items-center">
          <div
            key={key}
            className="items-start max-xl:mx-auto max-xl:w-[322px] max-xl:py-1 grid grid-cols-2 gap-2 xl:gap-5 overflow-hidden"
          >
            <div className="h-full">
              <div
                style={{
                  opacity: animate ? `100` : "0",
                  transitionDuration: "0.5s",
                }}
                className={clsx("opacity-0")}
              >
                <picture className="w-full h-auto block">
                  <source srcSet="/images/sec1_mobile.png" media="(max-width: 1024px)" />
                  <img src="/images/sec1.png" alt="" />
                </picture>
              </div>
            </div>
            <div className="flex flex-col gap-2 xl:gap-5 h-full">
              <div
                style={{
                  opacity: animate ? `100` : "0",
                  transitionDuration: "0.5s",
                  transitionDelay: "200ms",
                }}
                className={clsx("opacity-0")}
              >
                <picture className="w-full h-auto block">
                  <source
                    className="block"
                    srcSet="/images/sec2_mobile.png"
                    media="(max-width: 1024px)"
                  />
                  <img src="/images/sec2.png" alt="" />
                </picture>
              </div>

              <div
                style={{
                  opacity: animate ? `100` : "0",
                  transitionDuration: "0.5s",
                  transitionDelay: "400ms",
                }}
                className={clsx("opacity-0")}
              >
                <picture className="w-full h-auto block">
                  <source srcSet="/images/sec3_mobile.png" media="(max-width: 1024px)" />
                  <img src="/images/sec3.png" alt="" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      heading: t("interfaceDecentralization.heading"),
      content: (
        <div className="grid gap-5 xl:gap-6 xl:pr-9">
          <Lede>{t("interfaceDecentralization.lead")}</Lede>
          <div className="grid gap-4">
            <GlyphPoint
              icon="warning"
              tone="red"
              title={t("interfaceDecentralization.glyphs.gateway.title")}
              text={t("interfaceDecentralization.glyphs.gateway.text")}
            />
            <GlyphPoint
              icon="integration"
              title={t("interfaceDecentralization.glyphs.manyUis.title")}
              text={t("interfaceDecentralization.glyphs.manyUis.text")}
            />
          </div>
          <Details>
            <p>{t("interfaceDecentralization.description")}</p>
            <p className="text-green pl-4 border-l-4 border-l-green">
              {t("interfaceDecentralization.solution")}
            </p>
          </Details>
        </div>
      ),
      illustration: ({ animate, key }) => (
        <div
          key={key}
          className={clsx("h-full flex items-center justify-center", animate && "animated")}
        >
          <InterfaceDecentralizationImage />
        </div>
      ),
    },
    {
      heading: t("tokenListings.heading"),
      content: (
        <div className="grid gap-5 xl:gap-6 xl:pr-9">
          <Lede>{t("tokenListings.lede")}</Lede>
          <div className="grid gap-4">
            <GlyphPoint
              icon="restrictions"
              tone="red"
              title={t("tokenListings.glyphs.gated.title")}
              text={t("tokenListings.glyphs.gated.text")}
            />
            <GlyphPoint
              icon="auto-listing"
              title={t("tokenListings.glyphs.permissionless.title")}
              text={t("tokenListings.glyphs.permissionless.text")}
            />
            <GlyphPoint
              icon="token"
              tone="blue"
              title={t("tokenListings.glyphs.importLists.title")}
              text={t("tokenListings.glyphs.importLists.text")}
            />
          </div>
          <Details>
            <p>{t("tokenListings.lead")}</p>
            <p>{t("tokenListings.description")}</p>
            <p className="text-green pl-4 border-l-4 border-l-green">
              {t("tokenListings.solution")}
            </p>
          </Details>
        </div>
      ),
      illustration: ({ animate, key }) => (
        <div
          key={key}
          className={clsx("flex group items-center justify-center h-full", animate && "animated")}
        >
          <ListingImage />
        </div>
      ),
    },
  ];
}

function EcosystemSlide({ index, activeSlide, slide }) {
  return (
    <div
      className={clsx(
        index === activeSlide
          ? "visible block opacity-100 h-unset relative"
          : "h-0 opacity-0 hidden",
      )}
    >
      <h2 className="mxl:t-4 text-28 2xl:text-40 text-primary-text xl:mb-6 mt-1 mb-3">
        {slide.heading}
      </h2>
      {slide.content}
    </div>
  );
}

export default function EcosystemProblems() {
  const t = useTranslations("EcosystemProblems");
  const tCommon = useTranslations("Common");
  const slides = useSlides();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [animationPlayed, setAnimationPlayed] = useState<number[]>([0]);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animationPlayed.includes(activeSlide)) {
      return;
    }

    setAnimationPlayed([...animationPlayed, activeSlide]);
  }, [activeSlide, animationPlayed]);

  const entry = useIntersectionObserver(ref, { threshold: 0.5, freezeOnceVisible: true });

  const nextSlide = () => {
    setActiveSlide((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      previousSlide();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => previousSlide(),
  });

  return (
    <Container>
      <Pattern
        patternColor={PatternColor.PURPLE}
        className="w-250 h-250 -right-[871px] bg-cover -scale-100"
      />

      <div
        className="surface relative rounded-5"
        role="region"
        aria-roledescription="carousel"
        aria-label={t("overline")}
        onKeyDown={onKeyDown}
      >
        <div className="grid xl:grid-cols-[1fr_40px]">
          <div ref={ref} className="xl:py-10 pt-1">
            <div {...handlers} className="grid gap-5 grid-cols-1 xl:grid-cols-12">
              <div
                className={clsx(
                  "rounded-5 min-h-[388px] max-xl:max-h-[388px] xl:min-h-[696px] xl:col-start-1 xl:col-end-6",
                )}
              >
                <div className="xl:grid xl:grid-cols-[40px_1fr] h-full max-xl:px-1">
                  <div className="max-xl:hidden" />
                  {slides[activeSlide].illustration({
                    animate: entry?.isIntersecting && animationPlayed.includes(activeSlide),
                    key: activeSlide,
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-between xl:grid xl:col-start-6 xl:col-end-13 xl:grid-rows-[1fr_40px] relative max-xl:px-4 max-xl:pb-6">
                <div className="sm:hidden grid grid-cols-2 gap-3 py-6">
                  <Button
                    fullWidth
                    className="px-5 md:px-5 lg:px-5"
                    size={ButtonSize.MEDIUM}
                    colorScheme={ButtonColor.LIGHT_GREEN}
                    onClick={previousSlide}
                    aria-label={tCommon("previousSlide")}
                  >
                    <Svg iconName="arrow-left-small" />
                  </Button>
                  <Button
                    fullWidth
                    className="px-5 md:px-5 lg:px-5"
                    size={ButtonSize.MEDIUM}
                    colorScheme={ButtonColor.LIGHT_GREEN}
                    onClick={nextSlide}
                    aria-label={tCommon("nextSlide")}
                  >
                    <Svg iconName="arrow-right-small" />
                  </Button>
                </div>
                <div className="max-xl:min-h-[512px] pb-4" aria-live="polite">
                  <OverlineText text={t("overline")} color="purple" />
                  {slides.map((slide, index) => {
                    return (
                      <div key={index}>
                        <EcosystemSlide index={index} slide={slide} activeSlide={activeSlide} />
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3 max-sm:hidden">
                  <Button
                    className="sm:max-xl:w-full px-5 md:px-5 lg:px-5"
                    size={ButtonSize.MEDIUM}
                    colorScheme={ButtonColor.LIGHT_GREEN}
                    onClick={previousSlide}
                    aria-label={tCommon("previousSlide")}
                  >
                    <Svg iconName="arrow-left-small" />
                  </Button>
                  <Button
                    className="sm:max-xl:w-full px-5 md:px-5 lg:px-5"
                    size={ButtonSize.MEDIUM}
                    colorScheme={ButtonColor.LIGHT_GREEN}
                    onClick={nextSlide}
                    aria-label={tCommon("nextSlide")}
                  >
                    <Svg iconName="arrow-right-small" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-xl:h-10 max-xl:border-t xl:border-l border-secondary-bg flex items-center xl:flex-col justify-center xl:gap-1">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setActiveSlide(index)}
                aria-label={tCommon("goToSlide", { number: index + 1 })}
                aria-current={index === activeSlide ? "true" : undefined}
                title={slide.heading}
                className="group w-11 h-10 xl:w-10 xl:h-7 flex items-center justify-center"
              >
                <span
                  className={clsx(
                    "w-3 h-3 rounded-full border-green border duration-200",
                    index === activeSlide ? "bg-green scale-110" : "group-hocus:bg-green/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
