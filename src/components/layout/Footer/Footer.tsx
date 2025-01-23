import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLProps } from "react";

import Text from "../../atoms/Text";
import styles from "./Footer.module.scss";

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
    <footer className={clsx(styles.footer, className)}>
      <div className="container_internal">
        <div className={styles.footerLinks}>
          <div className={styles.leftLinks}>
            <div className={styles.linkColumn}>
              <div className={styles.footerLinkGroupTitle}>Social media</div>
              {socialLinks.map((link) => {
                return (
                  <div key={link.text}>
                    <a target="_blank" href={link.href} className={styles.footerLink}>
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className={styles.linkColumn}>
              <div className={styles.footerLinkGroupTitle}>Useful links</div>
              {usefulLinks.map((link) => {
                return (
                  <div key={link.text}>
                    <a target="_blank" href={link.href} className={styles.footerLink}>
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className={styles.linkColumn}>
              <div className={styles.footerLinkGroupTitle}>Partners</div>
              {partners.map((link) => {
                return (
                  <div key={link.text}>
                    <a target="_blank" href={link.href} className={styles.footerLink}>
                      {link.text}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className={styles.linkColumn}>
              <div className={styles.footerLinkGroupTitle}>Company</div>
              {companyLinks.map((link) => {
                return (
                  <div key={link.text}>
                    <Link
                      href={link.href}
                      className={clsx(
                        "text-16 font-medium uppercase duration-200 hover:text-green",
                        pathname.includes(link.href)
                          ? "text-green pointer-events-none"
                          : "text-primary-text",
                      )}
                    >
                      {link.text}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.rightLinks}>
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className="container_internal">
          <div className={styles.bottomFooterContent}>
            <div style={{ maxWidth: 872 }}>
              <Text variant={16} color="secondary">
                Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The value of
                cryptocurrencies may go down as well as up. Profits may be subject to capital gains
                or other taxes applicable in your jurisdiction.
              </Text>
            </div>
            <span className={styles.cpr}>
              Copyright © {new Date(Date.now()).getFullYear()} DEX223 <br /> All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
