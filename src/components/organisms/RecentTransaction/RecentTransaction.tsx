import React from "react";
import {useWaitForTransaction} from "wagmi";
import styles from "./RecentTransaction.module.scss";
import {RecentTransactionStatus, useRecentTransactions, RecentTransaction} from "@/stores/useRecentTransactions";
import Svg from "@/components/atoms/Svg";
import Preloader from "@/components/atoms/Preloader";

const transactionStatusImage = {
  [RecentTransactionStatus.SUCCESS]: <Svg iconName="done" />,
  [RecentTransactionStatus.PENDING]: <Preloader size={24} />,
  [RecentTransactionStatus.ERROR]: <Svg iconName="error-fill" />,
}

const getExplorerLink = (hash: string, chainId: number) => {
  if(chainId === 820) {
    return `https://explorer.callisto.network/tx/${hash}`
  }

  if(chainId === 1) {
    return `https://etherscan.io/tx/${hash}`;
  }
}

function TransactionRow({transaction}: {transaction: RecentTransaction}) {
  return <div className={styles.transactionRow}>
    {transaction.title}
    <div className={styles.transactionIcons}>
      <a target="_blank" href={getExplorerLink(transaction.hash, transaction.chainId)}><Svg iconName="forward" /></a>
      <span className={transaction.status === RecentTransactionStatus.ERROR && styles.error}>{transactionStatusImage[transaction.status]}</span>
    </div>
  </div>
}
function PendingTransaction({transaction}: {transaction: RecentTransaction}) {
  const {updateTransactionStatus} = useRecentTransactions();

  const waitForTransaction = useWaitForTransaction({
    hash: transaction.hash,
    onSuccess: () => {
      updateTransactionStatus(transaction.hash, RecentTransactionStatus.SUCCESS);
    },
    onError: () => {
      updateTransactionStatus(transaction.hash, RecentTransactionStatus.ERROR);
    }
  });

  return <TransactionRow transaction={transaction} />
}

export default function RecentTransaction({transaction}) {
  if(transaction.status === RecentTransactionStatus.PENDING) {
    return <PendingTransaction transaction={transaction} />
  }

  return <TransactionRow transaction={transaction} />;
}

