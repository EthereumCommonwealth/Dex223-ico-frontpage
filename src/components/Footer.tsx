"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLProps } from "react";

import Container from "@/components/Container";

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
    text: "ERC20 & ERC223 Token Converter",
    href: "https://dexaran.github.io/token-converter/",
  },
  {
    text: "ERC223 Front Page",
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
    text: "EOS Support",
    href: "https://eossupport.io/",
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

interface Props extends HTMLProps<HTMLDivElement> {}
export default function Footer({ className }: Props) {
  const pathname = usePathname();

  return (
    <footer>
      <Container>
        <div className="p-10 flex justify-between before:h-[1px] before:bg-gradient-to-r before:from-secondary-border/20 before:via-50% before:via-secondary-border before:to-secondary-border/20 before:w-full before:absolute relative before:top-0 before:left-0">
          <div className="flex gap-[80px]">
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase">Social media</div>
              {socialLinks.map((link) => {
                return (
                  <div key={link.text}>
                    <a
                      target="_blank"
                      href={link.href}
                      className="font-medium hover:text-green duration-200 text-secondary-text"
                    >
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase">Useful links</div>
              {usefulLinks.map((link) => {
                return (
                  <div key={link.text}>
                    <a
                      target="_blank"
                      href={link.href}
                      className="font-medium hover:text-green duration-200 text-secondary-text"
                    >
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase">Partners</div>
              {partners.map((link) => {
                return (
                  <div key={link.text}>
                    <a
                      target="_blank"
                      href={link.href}
                      className="font-medium hover:text-green duration-200 text-secondary-text"
                    >
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase">Company</div>
              {companyLinks.map((link) => {
                return (
                  <div key={link.text}>
                    <Link
                      href={link.href}
                      className={clsx(
                        "text-16 font-medium duration-200 hover:text-green",
                        pathname.includes(link.href)
                          ? "text-green pointer-events-none"
                          : "text-secondary-text",
                      )}
                    >
                      {link.text}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div />
        </div>
        <div className="p-6 flex justify-between items-center before:h-[1px] before:bg-gradient-to-r before:from-secondary-border/20 before:via-50% before:via-secondary-border before:to-secondary-border/20 before:w-full before:absolute relative before:top-0 before:left-0">
          <div style={{ maxWidth: 872 }}>
            <p className="text-tertiary-text">
              Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The value of
              cryptocurrencies may go down as well as up. Profits may be subject to capital gains or
              other taxes applicable in your jurisdiction.
            </p>
          </div>
          <span className="text-tertiary-text text-right">
            Copyright © {new Date(Date.now()).getFullYear()} DEX223 <br /> All Rights Reserved
          </span>
        </div>
      </Container>
    </footer>
  );
}
