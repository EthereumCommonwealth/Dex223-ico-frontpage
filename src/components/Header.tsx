"use client";
import clsx from "clsx";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useAccount, useDisconnect } from "wagmi";

import IconButton, { IconButtonSize } from "@/components/atoms/IconButton";
import Svg from "@/components/atoms/Svg";
import Container from "@/components/Container";
import Drawer from "@/components/Drawer";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { clsxMerge } from "@/functions/clsxMerge";
import { Link, usePathname } from "@/i18n/routing";

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

const drawerNavLinks = [
  { key: "philosophy", href: "/#philosophy", icon: "lamp" },
  { key: "marginTrading", href: "/#margin", icon: "margin-trading" },
  { key: "tokenomics", href: "/#tokenomics", icon: "chart" },
  { key: "contactUs", href: "/#contact", icon: "contact" },
  { key: "development", href: "/development", icon: "code" },
  { key: "airdrops", href: "/airdrops", icon: "calendar" },
] as const;

const drawerNavLinkClassName =
  "min-h-12 flex items-center gap-3 px-4 text-16 text-secondary-text duration-200 hocus:text-primary-text hocus:bg-tertiary-bg";

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

  const pathname = usePathname();
  const [returnFocus, setReturnFocus] = useState(true);
  const openMenu = () => {
    setReturnFocus(true);
    setMenuOpened(true);
  };
  const closeMenu = () => setMenuOpened(false);

  // On the home page an in-page link only needs to scroll. Close the drawer first so its
  // scroll lock is released, then scroll, instead of letting the lock snap the page back.
  const onDrawerNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");
    // Returning focus to the menu button would cancel the smooth scroll below.
    setReturnFocus(false);
    setMenuOpened(false);
    if (!hash || pathname !== (path || "/")) {
      return;
    }
    const target = document.getElementById(hash);
    if (!target) {
      return;
    }
    e.preventDefault();
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${hash}`);
      }),
    );
  };

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
                <Link
                  prefetch={false}
                  target="_blank"
                  className={navLinkClassName}
                  href="https://blog.dex223.io/"
                >
                  {t("blog")}
                </Link>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <a
              href={`https://app.dex223.io/${locale}/swap`}
              target="_blank"
              className="sheen max-xl:hidden whitespace-nowrap group relative inline-flex items-center gap-1.5 h-10 px-5 rounded-2 text-14 font-medium text-black bg-green shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-10px_rgba(125,164,145,0.8)] duration-200 hocus:bg-green-hover hocus:-translate-y-px"
            >
              {t("launchApp")}
              <Svg
                iconName="forward"
                size={20}
                className="duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <IconButton
              className="lg:hidden"
              iconName="menu"
              buttonSize={IconButtonSize.LARGE}
              aria-label={t("menu")}
              aria-expanded={isMenuOpened}
              onClick={openMenu}
            />
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
          label={t("menu")}
          returnFocus={returnFocus}
          isOpen={isMenuOpened}
          setIsOpen={() => setMenuOpened(false)}
        >
          <div className="flex flex-col w-[min(320px,86vw)] min-h-full pb-6">
            <div className="sticky top-0 z-10 flex items-center justify-between h-[66px] pl-4 pr-2 bg-primary-bg border-b border-white/[0.06]">
              <Link prefetch={false} href="/" onClick={closeMenu} aria-label="DEX223">
                <div className="w-[118px] h-[46px] relative">
                  <Image src="/images/comp-dex-logo.svg" alt="" fill />
                </div>
              </Link>
              <IconButton
                iconName="close"
                buttonSize={IconButtonSize.LARGE}
                aria-label={t("closeMenu")}
                onClick={closeMenu}
              />
            </div>

            <nav className="flex flex-col py-2">
              {drawerNavLinks.map((link) => (
                <Link
                  key={link.key}
                  prefetch={false}
                  href={link.href}
                  onClick={(e) => onDrawerNavigate(e, link.href)}
                  className={drawerNavLinkClassName}
                >
                  <Svg iconName={link.icon} />
                  {t(link.key)}
                </Link>
              ))}
              <a href="https://blog.dex223.io/" className={drawerNavLinkClassName}>
                <Svg iconName="blog" />
                {t("blog")}
              </a>
            </nav>

            <div className="flex items-center gap-3 px-4 pb-6">
              <a
                href={`https://app.dex223.io/${locale}/swap`}
                className="flex-grow inline-flex items-center justify-center gap-1.5 h-12 px-5 rounded-2 text-16 font-medium text-black bg-green shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-10px_rgba(125,164,145,0.8)] duration-200 hocus:bg-green-hover"
              >
                {t("launchApp")}
                <Svg iconName="forward" size={20} />
              </a>
              <LocaleSwitcher placement="bottom-end" portal={false} />
            </div>

            {[
              { title: t("socialMedia"), links: socialLinks },
              // Blog is already in the main list above.
              { title: t("usefulLinks"), links: usefulLinks.filter((l) => l.key !== "blog") },
              { title: t("partners"), links: partners },
            ].map((group) => (
              <div key={group.title} className="flex flex-col pb-4">
                <div className="text-tertiary-text uppercase text-12 font-semibold tracking-[0.14em] px-4 py-2">
                  {group.title}
                </div>
                {group.links.map((link) => (
                  <a
                    key={link.key}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link.href}
                    className="min-h-11 flex items-center px-4 text-secondary-text duration-200 hocus:text-primary-text hocus:bg-tertiary-bg"
                  >
                    {t(`links.${link.key}`)}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </Drawer>
      </Container>
    </div>
  );
}
