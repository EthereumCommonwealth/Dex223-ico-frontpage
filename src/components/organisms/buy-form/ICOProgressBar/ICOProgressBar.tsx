import React, { useMemo } from "react";
import styles from "./ICOProgressBar.module.scss";
import { useICOContractBalance } from "@/components/organisms/purchase-components/BuyForm/hooks/useICOContractBalance";

function millions(amount: number) {
  const million = 1000000;
  return amount * million;
}

const total = millions(3200);

export default function ICOProgressBar({presale, withDividers = false}) {
  const contractBalance = useICOContractBalance({presale});

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
    {withDividers && <div className={styles.progressBarDividersContainer}>
      {barPercentage && barPercentage < 30 && <div className={styles.firstDivider}>
        <div className={styles.tooltip}>
          When 960M tokens will be sold the price will change from $0.0009 =&gt; $0.001
        </div>
      </div>}
      {barPercentage && barPercentage < 50 && <div className={styles.secondDivider}>
        <div className={styles.tooltip}>
          When 1,6B tokens will be sold the price will change from $0.001 =&gt; $0.0011
        </div>
      </div>}
      {barPercentage && barPercentage < 70 && <div className={styles.thirdDivider}>
        <div className={styles.tooltip}>
          When 2.24B tokens will be sold the price will change from $0.0011 =&gt; $0.0012
        </div>
      </div>}
      {barPercentage && barPercentage < 90 && <div className={styles.forthDivider}>
        <div className={styles.tooltip}>
          When 2.88B tokens will be sold the price will change from $0.0012 =&gt; $0.0013
        </div>
      </div>}
    </div>}
    <div className={styles.progressBar}>
      <div style={{ width: `${barPercentage}%` }} className={styles.bar}/>
      {/*<div style={{ width: `${100}%` }} className={styles.bar}/>*/}
    </div>
    <div className={styles.raised}>
      D223 sold: {contractBalance?.data?.formatted ? (total - +contractBalance?.data?.formatted).toLocaleString("en-US", {maximumFractionDigits: 2}) : "—"} / {total.toLocaleString("en-US")}
      {/*D223 sold: 160,000,000 / 160,000,000*/}
    </div>
  </>;
}
