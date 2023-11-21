import React, { useMemo } from "react";
import styles from "./ICOProgressBar.module.scss";
import { useICOContractBalance } from "@/components/organisms/BuyForm/hooks/useICOContractBalance";

const total = 80000000;
export default function ICOProgressBar() {
  const contractBalance = useICOContractBalance({ devMode: true });

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
      <div style={{ width: `${0}%` }} className={styles.bar}/>
    </div>
    <div className={styles.raised}>
      {/*D223 sold: {contractBalance?.data?.formatted ? (80000000 - +contractBalance?.data?.formatted).toLocaleString("en-US", {maximumFractionDigits: 2}) : "—"} / {total.toLocaleString("en-US")}*/}
      D223 sold: — / —
    </div>
  </>;
}
