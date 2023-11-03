import React from "react";
import {
  Chain,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWalletClient
} from "wagmi";
import styles from "./RecentTransaction.module.scss";
import {RecentTransaction, RecentTransactionStatus, useRecentTransactions} from "@/stores/useRecentTransactions";
import Svg from "@/components/atoms/Svg";
import Preloader from "@/components/atoms/Preloader";
import testICOABI from "@/constants/abis/testICOABI.json";
import {getICOContractAddress} from "@/constants/tokens";

const transactionStatusImage = {
  [RecentTransactionStatus.SUCCESS]: <Svg iconName="done"/>,
  [RecentTransactionStatus.PENDING]: <Preloader size={24}/>,
  [RecentTransactionStatus.ERROR]: <Svg iconName="error-fill"/>,
}

const getExplorerLink = (hash: string, chainId: number) => {
  if (chainId === 820) {
    return `https://explorer.callisto.network/tx/${hash}`
  }

  if (chainId === 1) {
    return `https://etherscan.io/tx/${hash}`;
  }
}

function TransactionRow({transaction}: { transaction: RecentTransaction }) {
  console.log("Transaction data");
  console.log({
    address: transaction.details.address,
    abi: testICOABI,
    functionName: transaction.details.functionName,
    gas: BigInt(transaction.details.gas),
    maxFeePerGas: BigInt(transaction.details.maxFeePerGas) * BigInt(11) / BigInt(10),
    maxPriorityFeePerGas: BigInt(transaction.details.maxPriorityFeePerGas),
    args: [transaction.details.args[0], BigInt(transaction.details.args[1])],
    nonce: transaction.details.nonce
  })

  const {config: purchaseConfig} = usePrepareContractWrite({
    address: transaction.details.address,
    abi: testICOABI,
    functionName: transaction.details.functionName,
    gas: BigInt(transaction.details.gas),
    maxFeePerGas: BigInt(transaction.details.maxFeePerGas) * BigInt(12) / BigInt(10),
    maxPriorityFeePerGas: BigInt(+transaction.details.maxPriorityFeePerGas) * BigInt(15) / BigInt(10),
    args: transaction.details.args,
    nonce: transaction.details.nonce
  });

  const {
    write: speedUp,
  } = useContractWrite({
    ...purchaseConfig, onSettled: (data, error) => {
      if (error) {
        console.log(error);
        return;
      }

      console.log("Rewrite settled");
      console.log(data);
    }
  });

  return <div className={styles.transactionRow}>
    {transaction.title} ({transaction.details?.nonce})
    <div className={styles.transactionIcons}>
      <a target="_blank" href={getExplorerLink(transaction.hash, transaction.chainId)}><Svg iconName="forward"/></a>
      {transaction.status === RecentTransactionStatus.PENDING && <button onClick={speedUp}>Speed up</button>}
      <span
        className={transaction.status === RecentTransactionStatus.ERROR && styles.error}>{transactionStatusImage[transaction.status]}</span>
    </div>
  </div>
}

function PendingTransaction({transaction}: { transaction: RecentTransaction }) {
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

  console.log(waitForTransaction);

  return <TransactionRow transaction={transaction}/>
}

export default function RecentTransaction({transaction}) {
  if (transaction.status === RecentTransactionStatus.PENDING) {
    return <PendingTransaction transaction={transaction}/>
  }

  return <TransactionRow transaction={transaction}/>;
}

