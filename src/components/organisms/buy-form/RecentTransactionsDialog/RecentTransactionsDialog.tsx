import React, { useMemo } from "react";
import styles from "./RecentTransactionsDialog.module.scss";
import { useRecentTransactionsStore, useTransactionSpeedUp } from "@/stores/useRecentTransactions";
import Dialog from "@/components/atoms/Dialog";
import useZustandStore from "@/stores/useZustandStore";
import RecentTransaction from "@/components/organisms/buy-form/RecentTransaction";
import clsx from "clsx";
import Svg from "@/components/atoms/Svg";
import Image from "next/image";
import DialogHeader from "@/components/atoms/DialogHeader";
import TransactionSpeedUp from "../TransactionSpeedUp";
import LegacyTransactionSpeedUp from "../../purchase-components/LegacyTransactionSpeedUp";
import { useAccount } from "wagmi";
import DrawerDialog from "@/components/atoms/DrawerDialog";

export default function RecentTransactionsDialog({ isOpen, handleClose }) {
  const { address } = useAccount();
  const transactions = useZustandStore(useRecentTransactionsStore, state => state.transactions[address]);
  const { clearTransactions, setIsViewed } = useRecentTransactionsStore();
  const { transactionToSpeedUpId } = useTransactionSpeedUp();

  const transactionToSpeedUp = useMemo(() => {
    return transactions?.find((t) => {
      return t.id === transactionToSpeedUpId;
    })
  }, [transactionToSpeedUpId, transactions]);

  return <DrawerDialog isOpen={isOpen} onClose={handleClose}>
    <div className={styles.dialog}>
      {!transactionToSpeedUpId ? <>
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
      </> : <>
        {transactionToSpeedUp.type === 0
          ? <LegacyTransactionSpeedUp handleClose={handleClose}/>
          : <TransactionSpeedUp handleClose={handleClose}/>
        }
      </>}
    </div>
  </DrawerDialog>;
}
