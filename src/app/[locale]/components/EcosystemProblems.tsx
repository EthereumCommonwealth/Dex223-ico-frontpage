"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

import BulletListItem from "@/components/atoms/BulletListItem";
import Button, { ButtonColor, ButtonSize } from "@/components/atoms/Button";
import OverlineText from "@/components/atoms/OverlineText";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import Svg from "@/components/atoms/Svg";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
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

function useSlides() {
  const t = useTranslations("EcosystemProblems");

  return [
    {
      heading: t("erc20Security.heading"),
      content: (
        <div className="grid 2xl:gap-5 xl:pr-9  lg:gap-3 gap-2">
          <p className="text-18 2xl:text-24 text-primary-text">
            {t("erc20Security.lead", { amount: ERCLossesInt })}
          </p>
          <div className="py-3 px-4 xl:px-5 xl:py-4 border border-red-light rounded-3 shadow shadow-red">
            <p className="text-16 2xl:text-18 mb-3 lg:max-2xl:text-center">
              {t.rich("erc20Security.watchCalculator", {
                link: (chunks) => (
                  <TextLink text={chunks} href="https://dexaran.github.io/erc20-losses" />
                ),
              })}
            </p>
            <div className="flex justify-between gap-0 sm:gap-5 bg-red-bg rounded-3 items-center py-2.5 px-3.5 sm:px-5 lg:max-2xl:flex-col lg:max-2xl:items-center lg:max-2xl:gap-0 max-sm:flex-col">
              <div className="flex items-center max-sm:gap-1 gap-2 text-16 2xl:text-20 max-sm:text-12">
                <Svg
                  className="text-red-light !w-6 !h-6 sm:h-8 sm:w-8"
                  size={32}
                  iconName="warning"
                />
                <span>{t("erc20Security.totalLost")}</span>
              </div>
              <span className="text-red-light text-20 2xl:text-24 font-medium">
                <span>{ERCLosses}</span>
              </span>
            </div>
          </div>

          <p className="text-secondary-text text-16 2xl:text-18">
            {t.rich("erc20Security.history", {
              desktopOnly: (chunks) => <span className="max-xl:hidden">{chunks}</span>,
            })}
          </p>
          <p className="text-secondary-text text-16 2xl:text-18">
            {t("erc20Security.erc223Security")}
          </p>
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
        <div className="grid gap-2 xl:gap-4 xl:pr-9 ">
          <p className="text-18 xl:text-24 text-primary-text">{t("approveTransferFrom.lead")}</p>
          <p className="text-secondary-text text-16 xl:text-18">
            {t("approveTransferFrom.description")}
          </p>
          <p className="text-green pl-4 border-l-4 border-green text-16 xl:text-18">
            {t("approveTransferFrom.erc223Solution")}
          </p>
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
        <div className="grid gap-6 xl:pr-9 ">
          <p className="xl:text-24 text-primary-text text-18">{t("existingExchanges.lead")}</p>
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
        <div className="grid gap-5 text-secondary-text text-16 xl:text-20 xl:pr-9 ">
          <p>{t("gasOptimization.cheaper")}</p>
          <p>{t("gasOptimization.erc20Consumed")}</p>
          <ul className="flex flex-col gap-2">
            <BulletListItem>
              {t.rich("gasOptimization.approvalTx", {
                link: (chunks) => (
                  <TextLink
                    href="https://explorer.callistodao.org//tx/0xa20d2838ea371759f92e7d4ae9700d2de96cf65de738b518dea1753db7180377"
                    text={chunks}
                  />
                ),
              })}
            </BulletListItem>
            <BulletListItem>
              {t.rich("gasOptimization.tokensSwapTx", {
                link: (chunks) => (
                  <TextLink
                    href="https://explorer.callistodao.org//tx/0xedf726375e86b2e1df80a614049ab5e1a797174fb762d81471e3379e98497d36"
                    text={chunks}
                  />
                ),
              })}
            </BulletListItem>
          </ul>
          <p>{t("gasOptimization.erc223Consumed")}</p>
          <ul>
            <BulletListItem>
              {t.rich("gasOptimization.erc223SwapTx", {
                link: (chunks) => (
                  <TextLink
                    href="https://explorer.callistodao.org//tx/0x8cf1d1454723c2c4e0d57b1f7d202bccd47d780de1ffb1482de377a4ae1bef9b"
                    text={chunks}
                  />
                ),
              })}
            </BulletListItem>
          </ul>
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
        <div className="grid gap-6 xl:pr-9 ">
          <p className="text-18 xl:text-24 text-primary-text">
            {t("interfaceDecentralization.lead")}
          </p>
          <p className="text-secondary-text text-16 xl:text-18">
            {t("interfaceDecentralization.description")}
          </p>
          <p className="text-green pl-4 border-l-4 border-l-green text-16 xl:text-20">
            {t("interfaceDecentralization.solution")}
          </p>
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
        <div className="grid gap-6 xl:pr-9 ">
          <p className="text-18 xl:text-24 text-primary-text">{t("tokenListings.lead")}</p>
          <p className="text-secondary-text text-16 xl:text-18">{t("tokenListings.description")}</p>
          <p className="text-green pl-4 border-l-4 border-l-green text-16 xl:text-20">
            {t("tokenListings.solution")}
          </p>
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

      <div className="surface relative rounded-5">
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
                  >
                    <Svg iconName="arrow-left-small" />
                  </Button>
                  <Button
                    fullWidth
                    className="px-5 md:px-5 lg:px-5"
                    size={ButtonSize.MEDIUM}
                    colorScheme={ButtonColor.LIGHT_GREEN}
                    onClick={nextSlide}
                  >
                    <Svg iconName="arrow-right-small" />
                  </Button>
                </div>
                <div className="max-xl:min-h-[512px] pb-4">
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
                  >
                    <Svg iconName="arrow-left-small" />
                  </Button>
                  <Button
                    className="sm:max-xl:w-full px-5 md:px-5 lg:px-5"
                    size={ButtonSize.MEDIUM}
                    colorScheme={ButtonColor.LIGHT_GREEN}
                    onClick={nextSlide}
                  >
                    <Svg iconName="arrow-right-small" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-xl:h-10 max-xl:border-t xl:border-l border-secondary-bg flex items-center xl:flex-col justify-center gap-3">
            {slides.map((item, index) => {
              return (
                <div
                  role="button"
                  onClick={() => setActiveSlide(index)}
                  key={index}
                  className={clsx(
                    "w-3 h-3 rounded-full border-green border relative cursor-pointer before:w-6 before:h-6 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
                    index === activeSlide && "bg-green",
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
