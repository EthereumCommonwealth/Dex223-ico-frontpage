"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { HTMLProps } from "react";

import Container from "@/components/Container";
import { linkTargetProps } from "@/functions/links";
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

interface Props extends HTMLProps<HTMLDivElement> {}
export default function Footer({ className }: Props) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  return (
    <footer>
      <Container>
        <div className="py-6 lg:py-10 flex justify-between before:h-[1px] before:bg-gradient-to-r before:from-secondary-border/20 before:via-50% before:via-secondary-border before:to-secondary-border/20 before:w-full before:absolute relative before:top-0 before:left-0">
          <div className="flex lg:gap-[80px] flex-col sm:grid sm:grid-cols-2 lg:flex gap-6 sm:gap-5 lg:flex-row w-full">
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase text-12 lg:text-14 font-semibold tracking-[0.14em]">
                {t("socialMedia")}
              </div>
              {socialLinks.map((link) => {
                return (
                  <div key={link.key}>
                    <a
                      {...linkTargetProps(link.href)}
                      href={link.href}
                      className="font-medium hocus:text-green-hover duration-200 text-secondary-text"
                    >
                      {t(`links.${link.key}`)}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase text-12 lg:text-14 font-semibold tracking-[0.14em]">
                {t("usefulLinks")}
              </div>
              {usefulLinks.map((link) => {
                return (
                  <div key={link.key}>
                    <a
                      {...linkTargetProps(link.href)}
                      href={link.href}
                      className="font-medium hocus:text-green-hover duration-200 text-secondary-text"
                    >
                      {t(`links.${link.key}`)}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase text-12 lg:text-14 font-semibold tracking-[0.14em]">
                {t("partners")}
              </div>
              {partners.map((link) => {
                return (
                  <div key={link.key}>
                    <a
                      {...linkTargetProps(link.href)}
                      href={link.href}
                      className="font-medium hocus:text-green-hover duration-200 text-secondary-text"
                    >
                      {t(`links.${link.key}`)}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-tertiary-text uppercase text-12 lg:text-14 font-semibold tracking-[0.14em]">
                {t("company")}
              </div>
              {companyLinks.map((link) => {
                return (
                  <div key={link.key}>
                    <Link
                      href={link.href}
                      className={clsx(
                        "text-16 font-medium duration-200 hover:text-green",
                        pathname.includes(link.href)
                          ? "text-green pointer-events-none"
                          : "text-secondary-text",
                      )}
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div />
        </div>
        <div className="py-4 lg:py-6 flex justify-between max-lg:flex-col max-lg:items-start items-center before:h-[1px] before:bg-gradient-to-r before:from-secondary-border/20 before:via-50% before:via-secondary-border before:to-secondary-border/20 before:w-full before:absolute relative before:top-0 before:left-0">
          <div style={{ maxWidth: 872 }}>
            <p className="text-tertiary-text max-lg:mb-4">{t("disclaimer")}</p>
          </div>
          <span className="text-tertiary-text text-right max-lg:text-12">
            {t("copyright", { year: new Date(Date.now()).getFullYear() })}{" "}
            <br className="max-lg:hidden" /> {t("rightsReserved")}
          </span>
        </div>
      </Container>
    </footer>
  );
}
