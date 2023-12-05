import React, { useEffect, useMemo, useState } from "react";
import styles from "./MessageInteractive.module.scss";
import { usePurchaseData } from "@/stores/usePurchaseData";
import Image from "next/image";
import { useReward } from "@/components/organisms/purchase-components/BuyForm/hooks/useReward";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

export default function MessageInteractive({presale}) {
  const { amountToPay, computed } = usePurchaseData();
  const { readData } = useReward({ amountToPay, pickedToken: computed.pickedToken, presale });
  const [message, setMessage] = useState("...");
  const {isConnected} = useAccount();

  useEffect(() => {
    if (typeof readData !== "undefined") {
      if (typeof readData === "bigint") {
        const formatted = formatUnits(readData, 18);

        if (+formatted >= 30760000) {
          setMessage("Oh, I see there's a whale among us!");
          return;
        }

        if (+formatted >= 15380000) {
          setMessage("Building your crypto empire, token by token.");
          return;
        }

        if (+formatted >= 1538000) {
          setMessage("What a significant contribution to the development of the ecosystem. Descendants will make up legends about us.");
          return;
        }

        if (+formatted >= 153800) {
          setMessage("Each token is a building block of the future financial system that we are building today.");
          return;
        }

        if (+formatted >= 15380) {
          setMessage("Your investments are gaining momentum. Great to see you onboard!");
          return;
        }

        if (+formatted >= 1) {
          setMessage("Congratulations on taking the first step! Your investment journey has begun.");
          return;
        }

        if(isConnected) {
          setMessage("Wallet connected! You are one step closer to financial freedom.");
          return;
        }

        setMessage("...");
      }
    }
  }, [isConnected, readData]);

  return <div className={styles.interactiveContainer}>
    <span className={styles.logo}>
      <Image width={50} height={50} src="/dex.svg" alt=""/>
    </span>
    <div className={styles.text}>
      <span>Dexaran</span>
      <div className={styles.messageContainer}>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  </div>;
}
