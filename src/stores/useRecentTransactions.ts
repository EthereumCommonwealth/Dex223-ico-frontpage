import {create} from "zustand";
import {persist} from "zustand/middleware";

const localStorageKey = "recent-transactions";
export enum RecentTransactionStatus {
  PENDING,
  SUCCESS,
  ERROR,
}
export interface RecentTransaction {
  status: RecentTransactionStatus
  hash: `0x${string}`,
  chainId: number,
  title: string
}

interface RecentTransactions {
  transactions: Array<RecentTransaction>,
  addTransaction: (transaction: Pick<RecentTransaction, "hash" | "chainId" | "title">) => void,
  updateTransactionStatus: (hash: string, status: RecentTransactionStatus) => void,
  clearTransactions: () => void
}

export const useRecentTransactions = create<RecentTransactions>()(persist((set) => ({
  transactions: [],
  addTransaction: (transaction) => set((state) => {
    const updatedTransactions = [{...transaction, status: RecentTransactionStatus.PENDING}, ...state.transactions];

    return {transactions: updatedTransactions};
  }),
  updateTransactionStatus: (hash, status) => set((state) => {
    const transactionIndex = state.transactions.findIndex((_transaction) => {
      console.log(_transaction.hash);
      console.log(hash);
      return _transaction.hash === hash;
    });

    console.log("Found transaction: " + transactionIndex);
    if(transactionIndex !== -1) {
      const updatedTransaction = {...state.transactions[transactionIndex], status};
      const updatedTransactions = [...state.transactions];
      updatedTransactions[transactionIndex] = updatedTransaction;

      return {transactions: updatedTransactions}
    }

    return {};
  }),
  clearTransactions: () => set(() => {
    return {transactions: []};
  })
}), {
  name: 'recent-transactions', // name of the item in the storage (must be unique)
}))
