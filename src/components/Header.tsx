"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

import Svg from "@/components/atoms/Svg";
import Container from "@/components/Container";
import { clsxMerge } from "@/functions/clsxMerge";

export default function Header() {
  const { isConnected, address } = useAccount();

  const { disconnect } = useDisconnect();
  const [isWalletMenuVisible, setWalletMenuVisible] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const element = document.getElementById(hash);

      if (element) {
        const top = element.getBoundingClientRect();
        if (top.y > 1) {
          window.scrollTo({
            top: top.y,
            left: 0,
          });
        }
      }
    }
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Link prefetch={false} href="/">
            <div className="w-[186px] h-[46px] relative">
              <Image src="/images/comp-dex-logo.svg" alt="" fill />
            </div>
          </Link>
          <nav>
            <ul className="flex items-center">
              <Link
                prefetch={false}
                className=" font-medium py-5 px-3 text-secondary-text hover:text-green duration-200"
                href="/#philosophy"
              >
                Philosophy
              </Link>
              <Link
                prefetch={false}
                className=" font-medium py-5 px-3 text-secondary-text hover:text-green duration-200"
                href="/#margin"
              >
                Margin trading{" "}
              </Link>
              <Link
                prefetch={false}
                className=" font-medium py-5 px-3 text-secondary-text hover:text-green duration-200"
                href="/#tokenomics"
              >
                Tokenomics
              </Link>
              <Link
                prefetch={false}
                className=" font-medium py-5 px-3 text-secondary-text hover:text-green duration-200"
                href="/#contact"
              >
                Contact us
              </Link>
              <Link
                prefetch={false}
                className="py-5 font-medium px-3 text-secondary-text hover:text-green duration-200"
                href="/development"
              >
                Development
              </Link>
              <Link
                prefetch={false}
                target="_blank"
                className="py-5 font-medium px-3 text-secondary-text hover:text-green duration-200"
                href="https://blog.dex223.io/"
              >
                Blog
              </Link>
            </ul>
          </nav>
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
      </div>
    </Container>
  );
}
