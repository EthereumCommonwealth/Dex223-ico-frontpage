import React, {useEffect} from "react";
import styles from "./RecentTransactionsDialog.module.scss";
import {useRecentTransactions, useTransactionSpeedUp} from "@/stores/useRecentTransactions";
import Dialog from "@/components/atoms/Dialog";
import useZustandStore from "@/stores/useZustandStore";
import RecentTransaction from "@/components/organisms/RecentTransaction";
import clsx from "clsx";
import Svg from "@/components/atoms/Svg";
import Image from "next/image";
import DialogHeader from "@/components/atoms/DialogHeader";
import TransactionSpeedUp from "@/components/organisms/TransactionSpeedUp";

export default function RecentTransactionsDialog({isOpen, handleClose}) {
  const transactions = useZustandStore(useRecentTransactions, state => state.transactions);
  const {clearTransactions, setIsViewed} = useRecentTransactions();
  const {transactionToSpeedUp} = useTransactionSpeedUp();

  useEffect(() => {
    if (isOpen) {
      setIsViewed(true);
    }
  }, [isOpen, setIsViewed]);

  return <Dialog isOpen={isOpen} onClose={handleClose}>
    <div className={styles.dialog}>
      {!transactionToSpeedUp ? <>
        <DialogHeader
          onClose={handleClose}
          title="Recent transactions"
        />
        <div className={clsx(styles.dialogContent, !transactions?.length && styles.empty)}>
          {transactions?.length
            ? <>
              <div className={styles.transactionsList}>
                {transactions?.map((transaction) => {
                  return <RecentTransaction key={transaction.hash} transaction={transaction}/>
                })}
              </div>
            </>
            : <div className={styles.noTransactions}>
              <div>
                <Image src="/images/no-recent.svg" alt="" width={80} height={80}/>
              </div>
              All transaction will be displayed here.
            </div>}
        </div>
        <div className={styles.dialogFooter}>
          <span>Total transactions: {transactions?.length || 0}</span>
          <button disabled={!transactions?.length} onClick={clearTransactions} className={styles.clearButton}>
            <span>Clear all</span>
            <Svg iconName="delete"/>
          </button>
        </div>
      </> : <TransactionSpeedUp handleClose={handleClose} />}
    </div>
  </Dialog>;
}
