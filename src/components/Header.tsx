"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useAccount, useDisconnect } from "wagmi";

import IconButton from "@/components/atoms/IconButton";
import Svg from "@/components/atoms/Svg";
import Container from "@/components/Container";
import Drawer from "@/components/Drawer";
import { clsxMerge } from "@/functions/clsxMerge";

const socialLinks = [
  {
    text: "Telegram discussions",
    href: "https://t.me/Dex223_Defi",
  },
  {
    text: "Telegram announcements channel",
    href: "https://t.me/Dex_223",
  },
  {
    text: "Dex223 X account",
    href: "https://twitter.com/Dex_223",
  },
  {
    text: "Discord",
    href: "https://discord.gg/t5bdeGC5Jk",
  },
  {
    text: "Dexaran's X account",
    href: "https://twitter.com/Dexaran",
  },
];

const usefulLinks = [
  {
    text: "ERC-20 live losses calculator",
    href: "https://dexaran.github.io/erc20-losses/",
  },
  {
    text: "ERC-20 & ERC-223 Token Converter",
    href: "https://dexaran.github.io/token-converter/",
  },
  {
    text: "ERC-223 Front Page",
    href: "https://dexaran.github.io/erc223",
  },
  {
    text: "Page source codes",
    href: "https://github.com/Dexaran/Dex223-ICO-page/tree/main",
  },
  {
    text: "Blog",
    href: "https://blog.dex223.io/",
  },
];

const partners = [
  {
    text: "BlockzHub",
    href: "https://blockzhub.io/",
  },
  {
    text: "CLS Global",
    href: "https://www.cls.global",
  },
  {
    text: "Beosin",
    href: "https://beosin.com",
  },
  {
    text: "Roro Technology",
    href: "https://rorotechnology.io/",
  },
];

const companyLinks = [
  {
    text: "Operating agreement",
    href: "/operating-agreement",
  },
  {
    text: "Token Description",
    href: "/token-description",
  },
  {
    text: "Privacy policy",
    href: "/privacy-policy",
  },
  {
    text: "DeFi agreement",
    href: "/defi-agreement",
  },
  {
    text: "Trademark policy",
    href: "/trademark-policy",
  },
];

const navLinkClassName =
  "relative font-medium py-5 px-3 text-secondary-text hocus:text-primary-text duration-200 after:absolute after:left-3 after:right-3 after:bottom-3.5 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-green after:to-green-hover after:transition-transform after:duration-300 hocus:after:scale-x-100";

export default function Header() {
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
              <div className="w-[118px] lg:w-[186px] h-[46px] relative">
                <Image src="/images/comp-dex-logo.svg" alt="" fill />
              </div>
            </Link>
            <nav className="max-lg:hidden">
              <ul className="flex items-center">
                <Link prefetch={false} className={navLinkClassName} href="/#philosophy">
                  Philosophy
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/#margin">
                  Margin trading{" "}
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/#tokenomics">
                  Tokenomics
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/#contact">
                  Contact us
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/development">
                  Development
                </Link>
                <Link prefetch={false} className={navLinkClassName} href="/airdrops">
                  Airdrops
                </Link>
                <Link
                  prefetch={false}
                  target="_blank"
                  className={navLinkClassName}
                  href="https://blog.dex223.io/"
                >
                  Blog
                </Link>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://app.dex223.io/en/swap"
              target="_blank"
              className="max-lg:hidden group relative inline-flex items-center gap-1.5 h-10 px-5 rounded-2 text-14 font-medium text-black bg-green shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-10px_rgba(125,164,145,0.8)] duration-200 hocus:bg-green-hover hocus:-translate-y-px"
            >
              Launch app
              <Svg
                iconName="forward"
                size={20}
                className="duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <div className="lg:hidden" onClick={() => setMenuOpened(true)}>
              <IconButton iconName="menu" />
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
                Philosophy
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
                Margin trading
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
                Tokenomics
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
                Contact us
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
                Development
              </Link>
              <Link
                prefetch={false}
                target="_blank"
                className="h-[44px] flex items-center gap-3 text-secondary-text pl-4"
                href="https://blog.dex223.io/"
              >
                <Svg iconName="blog" />
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase pl-3">Social media</div>
              {socialLinks.map((link) => {
                return (
                  <div key={link.text}>
                    <a
                      target="_blank"
                      href={link.href}
                      className="flex items-center gap-3 text-secondary-text pl-4"
                    >
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase pl-3">Useful links</div>
              {usefulLinks.map((link) => {
                return (
                  <div key={link.text}>
                    <a
                      target="_blank"
                      href={link.href}
                      className="flex items-center gap-3 text-secondary-text pl-4"
                    >
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase pl-4">Partners</div>
              {partners.map((link) => {
                return (
                  <div key={link.text}>
                    <a
                      target="_blank"
                      href={link.href}
                      className="flex items-center gap-3 text-secondary-text pl-4"
                    >
                      {link.text}
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
