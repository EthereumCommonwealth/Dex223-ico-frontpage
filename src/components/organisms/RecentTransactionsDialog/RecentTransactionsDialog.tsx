import React from "react";
import styles from "./RecentTransactionsDialog.module.scss";
import {useRecentTransactions} from "@/stores/useRecentTransactions";
import Dialog from "@/components/atoms/Dialog";
import Preloader from "@/components/atoms/Preloader";
import useZustandStore from "@/stores/useZustandStore";

export default function RecentTransactionsDialog({isOpen, handleClose}) {
  const transactions = useZustandStore(useRecentTransactions, state => state.transactions);

  return <Dialog isOpen={isOpen} onClose={handleClose}>
    <div className={styles.dialog}>
      {false
        ? <Preloader />
        : <>
          {transactions?.length
            ? <div>
              {transactions?.map((transaction) => {
                return <div key={transaction.hash}>{transaction.hash} - {transaction.status}</div>
              })}
            </div>
            : "No recent transactions yet"}
        </>
      }
    </div>
  </Dialog>;
}
