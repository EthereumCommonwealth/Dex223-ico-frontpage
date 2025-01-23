"use client";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import React, { useState } from "react";
import Svg from "@/components/atoms/Svg";
import clsx from "clsx";

export default function Header() {
  const {isConnected, address} = useAccount();

  const { disconnect } = useDisconnect();
  const [isWalletMenuVisible, setWalletMenuVisible] = useState(false);

  return <Container>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <Link prefetch={false} href="/">
          <div className="w-[186px] h-[46px] relative">
            <Image src="/images/comp-dex-logo.svg" alt="" fill />
          </div>
        </Link>
        <nav>
          <ul className="flex items-center">
            <a className=" font-medium py-5 px-3 text-secondary-text hover:text-green duration-200" href="#philosophy">Philosophy</a>
            <a className=" font-medium py-5 px-3 text-secondary-text hover:text-green duration-200" href="#margin-trading">Margin trading </a>
            <a className=" font-medium py-5 px-3 text-secondary-text hover:text-green duration-200" href="#tokenomics">Tokenomics</a>
            <a className=" font-medium py-5 px-3 text-secondary-text hover:text-green duration-200" href="#philosophy">Contact us</a>
            <Link className="py-5 font-medium px-3 text-secondary-text hover:text-green duration-200" href="/development">Development</Link>
            <a target="_blank" className="py-5 font-medium px-3 text-secondary-text hover:text-green duration-200" href="https://blog.dex223.io/">Blog</a>
          </ul>
        </nav>
      </div>

      {isConnected && address && <div className="relative">
        <button className="px-3 py-2 duration-200 hover:bg-green-bg rounded-2 bg-primary-bg flex items-center gap-2" onClick={() => setWalletMenuVisible(!isWalletMenuVisible)}>
          <Svg iconName="wallet" />
          <span className="text-secondary-text">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          <Svg className={clsx("ml-2 duration-200 origin-center", isWalletMenuVisible ? "-rotate-90" : "rotate-90")} iconName="arrow-right-small" />
        </button>

        {isWalletMenuVisible && <div className="absolute top-[calc(100%_+_10px)] right-0 rounded-2 py-1 bg-primary-bg">
          <button onClick={disconnect} className="flex items-center gap-2 py-2 px-3 bg-tertiary-bg hover:bg-quaternary-bg min-w-[200px] duration-200">
            <Svg iconName="disconnect" />
            Disconnect
          </button>
        </div>}
      </div>}
    </div>
  </Container>
}
