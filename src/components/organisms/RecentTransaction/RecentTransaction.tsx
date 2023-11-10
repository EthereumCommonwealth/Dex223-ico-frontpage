import React from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import styles from "./RecentTransaction.module.scss";
import {
  RecentTransaction,
  RecentTransactionStatus,
  useRecentTransactions,
  useTransactionSpeedUp
} from "@/stores/useRecentTransactions";
import Svg from "@/components/atoms/Svg";
import Preloader from "@/components/atoms/Preloader";
import clsx from "clsx";

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
        <button className={styles.speedUp} onClick={() => setTransactionToSpeedUp(transaction)}>Speed up</button>}

      {transaction.status === RecentTransactionStatus.QUEUED &&
        <p className={styles.queued}>Queued</p>
      }
      <a target="_blank" href={getExplorerLink(transaction.hash, transaction.chainId)}><Svg iconName="forward"/></a>
      <span
        className={transaction.status === RecentTransactionStatus.ERROR && styles.error}>{transactionStatusImage[transaction.status]}</span>
    </div>
  </div>
}

function PendingTransaction({ transaction, noSpeedUp }: { transaction: RecentTransaction, noSpeedUp?: boolean }) {
  const {address} = useAccount();
  const { updateTransactionStatus } = useRecentTransactions();

  const waitForTransaction = useWaitForTransaction({
    hash: transaction.hash,
    onSuccess: () => {
      updateTransactionStatus(transaction.hash, RecentTransactionStatus.SUCCESS, address);
    },
    onError: () => {
      updateTransactionStatus(transaction.hash, RecentTransactionStatus.ERROR, address);
    }
  });

  return <TransactionRow noSpeedUp={noSpeedUp} transaction={transaction}/>
}

export default function RecentTransaction({ transaction, noSpeedUp = false }) {
  if (transaction.status === RecentTransactionStatus.PENDING) {
    return <PendingTransaction noSpeedUp={noSpeedUp} transaction={transaction}/>
  }

  return <TransactionRow transaction={transaction}/>;
}

