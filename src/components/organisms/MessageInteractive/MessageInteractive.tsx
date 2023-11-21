import React, { useEffect, useMemo, useState } from "react";
import styles from "./MessageInteractive.module.scss";
import { usePurchaseData } from "@/stores/usePurchaseData";
import Image from "next/image";
import { useReward } from "@/components/organisms/BuyForm/hooks/useReward";
import { formatUnits } from "viem";

export default function MessageInteractive() {
  const {amountToPay, computed} = usePurchaseData();
  const { readData } = useReward({amountToPay, pickedToken: computed.pickedToken, devMode: true});
  const [message, setMessage] = useState("...");

  useEffect(() => {
    if(typeof readData !== "undefined") {
      if (typeof readData === "bigint") {
        const formatted = formatUnits(readData, 18);

        if(+formatted >= 50000) {
          setMessage("Wow great job");
          return;
        }

        if(+formatted >= 1000) {
          setMessage("You're on the right path to financial independence!");
          return;
        }

        if(+formatted >= 100) {
          setMessage("Great choice! Your investments are gaining momentum!");
          return;
        }

        if(+formatted >= 10) {
          setMessage("Two is a good start. But maybe it's time to up the ante?");
          return;
        }

        if(+formatted >= 1) {
          setMessage("Nice one. It is tiny but efficient investment");
          return;
        }

        setMessage("...");
      }
    }
  }, [readData]);

  // const message = useMemo(() => {
  //
  // }, [output]);

  return <div className={styles.interactiveContainer}>
    <span className={styles.logo}>
      <Image width={48} height={48} src="/dex.svg" alt="" />
    </span>
    <div className={styles.text}>
      <span>Dexaran</span>
      <div className={styles.messageContainer}>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  </div>;
}
