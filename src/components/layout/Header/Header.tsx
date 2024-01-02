import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { useAccount } from "wagmi";
import { useWeb3Modal, useWeb3ModalEvents } from "@web3modal/react";
import Drawer from "../../atoms/Drawer/Drawer";
import { useSwipeable } from "react-swipeable";
import Svg from "../../atoms/Svg";
import Link from "next/link";
import Image from "next/image";
import { mixpanelIdentify, mixpanelSetProfileProp, trackEvent } from "@/functions/mixpanel";

export default function Header({ blur }: { blur?: boolean }) {
  const { address, isConnected } = useAccount();
  const { open, close, setDefaultChain } = useWeb3Modal();

  // Track wallect connect
  useWeb3ModalEvents(event => {
    if (event.name === "ACCOUNT_CONNECTED") {
      trackEvent("connectWallet", { address });
      if (address) {
        mixpanelIdentify(address);
        mixpanelSetProfileProp("$name", address);
        mixpanelSetProfileProp("address", address);
      }
    }
  })

  const [menuOpen, setMenuOpen] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      setMenuOpen(false);
    },
  });

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const element = document.getElementById(hash);

      if (element) {
        const top = element.getBoundingClientRect();
        if (top.y > 1) {
          window.scrollTo({
            top: top.y,
            left: 0
          })
        }
      }

    }
  }, []);

  return <header className={styles.header}>
    <div className={clsx("container", styles.headerContent, blur && styles.blur)}>
      <div className={styles.bottomLine}>
        <svg width="3840" height="51" viewBox="0 0 3840 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3840 1H1979L1796.5 50H0" stroke="#5A5A5A"/>
        </svg>
      </div>
      <div className={styles.logoAndNav}>
        <Link prefetch={false} href="/">
          <span className={styles.logo}>
            <Image src="/images/comp-dex-logo.svg" alt="" layout="fill"/>
          </span>
        </Link>
        <nav>
          <ul className={styles.navList}>
            <li><Link prefetch={false} href="/#philosophy">Philosophy</Link></li>
            <li><Link prefetch={false} href="/#margin">Margin trading</Link></li>
            <li><Link prefetch={false} href="/#tokenomics">Tokenomics</Link></li>
            <li><Link prefetch={false} href="/#contact">Contact us</Link></li>
            <li><Link prefetch={false} href="/development">Development</Link></li>
          </ul>
        </nav>
      </div>
      <div className={styles.settings}>
        {address && <button className={styles.addressButton} onClick={open}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 13.5C16.4333 13.5 16.7917 13.3583 17.075 13.075C17.3583 12.7917 17.5 12.4333 17.5 12C17.5 11.5667 17.3583 11.2083 17.075 10.925C16.7917 10.6417 16.4333 10.5 16 10.5C15.5667 10.5 15.2083 10.6417 14.925 10.925C14.6417 11.2083 14.5 11.5667 14.5 12C14.5 12.4333 14.6417 12.7917 14.925 13.075C15.2083 13.3583 15.5667 13.5 16 13.5ZM13 17C12.45 17 11.9792 16.8042 11.5875 16.4125C11.1958 16.0208 11 15.55 11 15V9C11 8.45 11.1958 7.97917 11.5875 7.5875C11.9792 7.19583 12.45 7 13 7H20C20.55 7 21.0208 7.19583 21.4125 7.5875C21.8042 7.97917 22 8.45 22 9V15C22 15.55 21.8042 16.0208 21.4125 16.4125C21.0208 16.8042 20.55 17 20 17H13ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5H13C11.8167 5 10.8542 5.37083 10.1125 6.1125C9.37083 6.85417 9 7.81667 9 9V15C9 16.1833 9.37083 17.1458 10.1125 17.8875C10.8542 18.6292 11.8167 19 13 19H21C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z"
              fill="#F5FFF9"/>
          </svg>

          <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
        </button>}
        <button onClick={() => setMenuOpen(true)} className={styles.menuButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 18V16.5H21V18H3ZM3 12.75V11.25H21V12.75H3ZM3 7.5V6H21V7.5H3Z" fill="#F5FFF9"/>
          </svg>
        </button>
        <Drawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} position="left">
          <div {...handlers} className={styles.menuWrapper}>
            <div className={styles.menuHeader}>
              <Image width={113} height={29} src="/images/comp-dex-logo.svg" alt=""/>
            </div>
            <div className={styles.menuContent}>
              <div className={styles.menuList}>
                <ul>
                  <li>
                    <Link prefetch={false} href="/#philosophy" className={styles.menuListButton} onClick={() => {
                      setMenuOpen(false);
                    }}>
                      <Svg iconName="lamp"/>
                      <span>Philosophy</span>
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/#margin" className={styles.menuListButton} onClick={() => {
                      setMenuOpen(false);
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M15.9721 4.13544C16.3711 3.5784 17.1995 3.57857 17.5983 4.13579L20.9184 8.77512H18.839V14.7393L14.7282 20.4811V8.77512H12.6487L15.9721 4.13544ZM11.3513 15.2249L8.03112 19.8642C7.63234 20.4214 6.80397 20.4216 6.40496 19.8646L3.08154 15.2249H5.16103V9.26071L9.27182 3.51895V15.2249H11.3513Z"
                          fill="#F5FFF9"/>
                      </svg>
                      <span>Margin trading</span>
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/#tokenomics" className={styles.menuListButton} onClick={() => {
                      setMenuOpen(false);
                    }}>
                      <Svg iconName="chart"/>
                      <span>Tokenomics</span>
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/#contact" className={styles.menuListButton} onClick={() => {
                      setMenuOpen(false);
                    }}>
                      <Svg iconName="contact"/>
                      <span>Contact us</span>
                    </Link>
                  </li>
                  <li>
                    <Link prefetch={false} href="/development" className={styles.menuListButton} onClick={() => {
                      setMenuOpen(false);
                    }}>
                      <Svg iconName="code"/>
                      <span>Development</span>
                    </Link>
                  </li>
                </ul>
              </div>
              {address && <button className={styles.addressMenuButton} onClick={async () => {
                setMenuOpen(false);
                await open();
              }}>
                <Svg iconName="wallet"/>

                <span>{`${address.slice(0, 6)}...${address.slice(-7)}`}</span>
              </button>}
              {!isConnected && <button className={styles.connectWalletButton} onClick={async () => {
                setMenuOpen(false);
                await open();
              }}>
                Connect wallet
              </button>}
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  </header>;
}
