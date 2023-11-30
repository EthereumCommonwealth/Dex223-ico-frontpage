import React, { useMemo } from "react";
import styles from "./ICOProgressBar.module.scss";
import { useICOContractBalance } from "@/components/organisms/purchase-components/BuyForm/hooks/useICOContractBalance";

function millions(amount: number) {
  const million = 1000000;
  return amount * million;
}

// const total = millions(160);
const total = 15380;
export default function ICOProgressBar() {
  const contractBalance = useICOContractBalance();

  const barPercentage = useMemo(() => {
    if (!contractBalance?.data?.formatted) {
      return 0.5;
    }

    const percentage = (total - +contractBalance?.data?.formatted) / total;
    const multipliedPercentage = percentage * 100;

    if (multipliedPercentage < 0.5) {
      return 0.5;
    }

    return multipliedPercentage;
  }, [contractBalance?.data?.formatted]);

  return <>
    <div className={styles.progressBar}>
      <div style={{ width: `${barPercentage}%` }} className={styles.bar}/>
    </div>
    <div className={styles.raised}>
      D223 sold: {contractBalance?.data?.formatted ? (total - +contractBalance?.data?.formatted).toLocaleString("en-US", {maximumFractionDigits: 2}) : "—"} / {total.toLocaleString("en-US")}
      {/*D223 sold: — / —*/}
    </div>
  </>;
}
