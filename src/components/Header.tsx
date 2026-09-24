"use client";
import clsx from "clsx";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useAccount, useDisconnect } from "wagmi";

import IconButton from "@/components/atoms/IconButton";
import Svg from "@/components/atoms/Svg";
import Container from "@/components/Container";
import Drawer from "@/components/Drawer";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { clsxMerge } from "@/functions/clsxMerge";
import { linkTargetProps } from "@/functions/links";
import { Link } from "@/i18n/routing";

const socialLinks = [
  {
    key: "telegramDiscussions",
    href: "https://t.me/Dex223_Defi",
  },
  {
    key: "telegramAnnouncements",
    href: "https://t.me/Dex_223",
  },
  {
    key: "dex223X",
    href: "https://twitter.com/Dex_223",
  },
  {
    key: "discord",
    href: "https://discord.gg/t5bdeGC5Jk",
  },
  {
    key: "dexaranX",
    href: "https://twitter.com/Dexaran",
  },
];

const usefulLinks = [
  {
    key: "lossesCalculator",
    href: "https://dexaran.github.io/erc20-losses/",
  },
  {
    key: "tokenConverter",
    href: "https://dexaran.github.io/token-converter/",
  },
  {
    key: "erc223FrontPage",
    href: "https://dexaran.github.io/erc223",
  },
  {
    key: "sourceCode",
    href: "https://github.com/Dexaran/Dex223-ICO-page/tree/main",
  },
  {
    key: "blog",
    href: "https://blog.dex223.io/",
  },
];

const partners = [
  {
    key: "blockzhub",
    href: "https://blockzhub.io/",
  },
  {
    key: "clsGlobal",
    href: "https://www.cls.global",
  },
  {
    key: "beosin",
    href: "https://beosin.com",
  },
  {
    key: "roroTechnology",
    href: "https://rorotechnology.io/",
  },
];

const companyLinks = [
  {
    key: "operatingAgreement",
    href: "/operating-agreement",
  },
  {
    key: "tokenDescription",
    href: "/token-description",
  },
  {
    key: "privacyPolicy",
    href: "/privacy-policy",
  },
  {
    key: "defiAgreement",
    href: "/defi-agreement",
  },
  {
    key: "trademarkPolicy",
    href: "/trademark-policy",
  },
];

const navLinkClassName =
  "relative whitespace-nowrap font-medium text-14 2xl:text-16 py-5 px-1.5 xl:px-2 2xl:px-3 text-secondary-text hocus:text-primary-text duration-200 after:absolute after:left-1.5 after:right-1.5 xl:after:left-2 xl:after:right-2 2xl:after:left-3 2xl:after:right-3 after:bottom-3.5 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-green after:to-green-hover after:transition-transform after:duration-300 hocus:after:scale-x-100";

export default function Header() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { isConnected, address } = useAccount();

  const { disconnect } = useDisconnect();
  const [isWalletMenuVisible, setWalletMenuVisible] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);

  // useEffect(() => {
  //   if (window.location.hash) {
  //     const hash = window.location.hash.replace("#", "");
  //     const element = document.getElementById(hash);
  //
  //     if (element) {
  //       const top = element.getBoundingClientRect();
  //       if (top.y > 1) {
  //         window.scrollTo({
  //           top: top.y,
  //           left: 0,
  //         });
  //       }
  //     }
  //   }
  // }, []);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      setMenuOpened(false);
    },
  });

  return (
    <div className="sticky top-0 z-[80]">
      {/* Glass layer lives on a sibling so the Drawer's fixed overlay is not trapped by backdrop-filter. */}
      <div
        aria-hidden
        className={clsx(
          "absolute inset-0 border-b transition-[opacity,border-color] duration-300 bg-global-bg/70 backdrop-blur-xl backdrop-saturate-150",
          isScrolled ? "opacity-100 border-white/[0.06]" : "opacity-0 border-transparent",
        )}
      />
      <Container>
        <header className="flex justify-between items-center max-lg:py-2.5 max-lg:-mr-2">
          <div className="flex items-center gap-5">
            <Link prefetch={false} href="/">
              <div className="w-[118px] lg:w-[150px] 2xl:w-[186px] h-[46px] relative">
                <Image src="/images/comp-dex-logo.svg" alt="" fill />
              </div>
            </Link>
            <nav className="max-lg:hidden">
              <ul className="flex items-center">
                <Link prefetch={false} className={navLinkClassName} href="/#philosophy">
                  {t("philosophy")}
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/#margin">
                  {t("marginTrading")}
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/#tokenomics">
                  {t("tokenomics")}
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/#contact">
                  {t("contactUs")}
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/development">
                  {t("development")}
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/airdrops">
                  {t("airdrops")}
                </Link>
                <a className={navLinkClassName} href="https://blog.dex223.io/">
                  {t("blog")}
                </a>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <a
              href={`https://app.dex223.io/${locale}/swap`}
              className="sheen max-xl:hidden whitespace-nowrap group relative inline-flex items-center gap-1.5 h-10 px-5 rounded-2 text-14 font-medium text-black bg-green shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-10px_rgba(125,164,145,0.8)] duration-200 hocus:bg-green-hover hocus:-translate-y-px"
            >
              {t("launchApp")}
              <Svg
                iconName="forward"
                size={20}
                className="duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <div className="lg:hidden" onClick={() => setMenuOpened(true)}>
              <IconButton iconName="menu" aria-label={t("menu")} />
            </div>
          </div>
          {isConnected && address && (
            <div className="relative">
              <button
                className={clsxMerge(
                  "px-3 py-2 duration-200 hover:bg-green-bg rounded-2 bg-primary-bg flex items-center gap-2",
                  isWalletMenuVisible && "bg-green-bg",
                )}
                onClick={() => setWalletMenuVisible(!isWalletMenuVisible)}
              >
                <Svg iconName="wallet" />
                <span className="text-secondary-text">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
                <Svg
                  className={clsx(
                    "ml-2 duration-200 origin-center",
                    isWalletMenuVisible ? "-rotate-90" : "rotate-90",
                  )}
                  iconName="arrow-right-small"
                />
              </button>

              {isWalletMenuVisible && (
                <div className="absolute top-[calc(100%_+_10px)] right-0 rounded-2 py-1 bg-primary-bg">
                  <button
                    onClick={() => disconnect()}
                    className="flex items-center gap-2 py-2 px-5 hover:bg-tertiary-bg duration-200"
                  >
                    <Svg iconName="logout" />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          )}
        </header>
        <Drawer
          handlers={handlers}
          placement="left"
          isOpen={isMenuOpened}
          setIsOpen={() => setMenuOpened(false)}
        >
          <div className="flex flex-col w-[320px] gap-6 mt-1">
            <div className="flex flex-col gap-1">
              <Link
                onClick={() => {
                  setMenuOpened(false);
                }}
                prefetch={false}
                className="h-[44px] flex items-center gap-3 text-secondary-text pl-4"
                href="/#philosophy"
              >
                <Svg iconName="lamp" />
                {t("philosophy")}
              </Link>
              <Link
                onClick={() => {
                  setMenuOpened(false);
                }}
                prefetch={false}
                className="h-[44px] flex items-center gap-3 text-secondary-text pl-4"
                href="/#margin"
              >
                <Svg iconName="margin-trading" />
                {t("marginTrading")}
              </Link>
              <Link
                onClick={() => {
                  setMenuOpened(false);
                }}
                prefetch={false}
                className="h-[44px] flex items-center gap-3 text-secondary-text pl-4"
                href="/#tokenomics"
              >
                <Svg iconName="chart" />
                {t("tokenomics")}
              </Link>
              <Link
                onClick={() => {
                  setMenuOpened(false);
                }}
                prefetch={false}
                className="h-[44px] flex items-center gap-3 text-secondary-text pl-4"
                href="/#contact"
              >
                <Svg iconName="contact" />
                {t("contactUs")}
              </Link>
              <Link
                onClick={() => {
                  setMenuOpened(false);
                }}
                prefetch={false}
                className="h-[44px] flex items-center gap-3 text-secondary-text pl-4"
                href="/development"
              >
                <Svg iconName="code" />
                {t("development")}
              </Link>
              <a
                className="h-[44px] flex items-center gap-3 text-secondary-text pl-4"
                href="https://blog.dex223.io/"
              >
                <Svg iconName="blog" />
                {t("blog")}
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase pl-3">{t("socialMedia")}</div>
              {socialLinks.map((link) => {
                return (
                  <div key={link.key}>
                    <a
                      {...linkTargetProps(link.href)}
                      href={link.href}
                      className="flex items-center gap-3 text-secondary-text pl-4"
                    >
                      {t(`links.${link.key}`)}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase pl-3">{t("usefulLinks")}</div>
              {usefulLinks.map((link) => {
                return (
                  <div key={link.key}>
                    <a
                      {...linkTargetProps(link.href)}
                      href={link.href}
                      className="flex items-center gap-3 text-secondary-text pl-4"
                    >
                      {t(`links.${link.key}`)}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase pl-4">{t("partners")}</div>
              {partners.map((link) => {
                return (
                  <div key={link.key}>
                    <a
                      {...linkTargetProps(link.href)}
                      href={link.href}
                      className="flex items-center gap-3 text-secondary-text pl-4"
                    >
                      {t(`links.${link.key}`)}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </Drawer>
      </Container>
    </div>
  );
}
