import React, { useEffect } from "react";
import styles from "./RecentTransaction.module.scss";
import {
  RecentTransaction,
  RecentTransactionStatus, useRecentTransactionsStore,
  useTransactionSpeedUp
} from "@/stores/useRecentTransactions";
import Svg from "@/components/atoms/Svg";
import Preloader from "@/components/atoms/Preloader";
import clsx from "clsx";
import { useAccount } from "wagmi";

const transactionStatusImage = {
  [RecentTransactionStatus.SUCCESS]: <Svg iconName="done"/>,
  [RecentTransactionStatus.PENDING]: <Preloader size={24}/>,
  [RecentTransactionStatus.ERROR]: <Svg iconName="error-fill"/>,
  [RecentTransactionStatus.QUEUED]: <Preloader color="#D38932" size={24}/>
}

const getExplorerLink = (hash: string, chainId: number) => {
  if (chainId === 820) {
    return `https://explorer.callisto.network/tx/${hash}`
  }

  if (chainId === 1) {
    return `https://etherscan.io/tx/${hash}`;
  }
}

function TransactionRow({ transaction, noSpeedUp }: { transaction: RecentTransaction, noSpeedUp?: boolean }) {
  const { setTransactionToSpeedUp } = useTransactionSpeedUp();

  return <div className={clsx(styles.transactionRow, noSpeedUp && styles.withWrapper)}>
    {transaction.title}
    <div className={styles.transactionIcons}>
      {transaction.status === RecentTransactionStatus.PENDING && !noSpeedUp &&
        <button className={styles.speedUp} onClick={() => setTransactionToSpeedUp(transaction.id)}>Speed up</button>
      }

      {transaction.status === RecentTransactionStatus.QUEUED &&
        <p className={styles.queued}>Queued</p>
      }
      <a target="_blank" href={getExplorerLink(transaction.hash, transaction.chainId)}><Svg iconName="forward"/></a>
      <span
        className={transaction.status === RecentTransactionStatus.ERROR && styles.error}>{transactionStatusImage[transaction.status]}</span>
    </div>
  </div>
}
export default function RecentTransaction({ transaction, noSpeedUp = false }) {
  const { setIsViewed } = useRecentTransactionsStore();
  const {address} = useAccount();

  useEffect(() => {
    setIsViewed(transaction.id, address);
  }, [address, setIsViewed, transaction.id, transaction.status]);

  return <TransactionRow transaction={transaction} noSpeedUp={noSpeedUp} />;
}

