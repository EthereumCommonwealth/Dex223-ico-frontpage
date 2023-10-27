import {create} from "zustand";
import {persist} from "zustand/middleware";

const localStorageKey = "recent-transactions";
export enum ResentTransactionStatus {
  PENDING,
  SUCCESS,
  ERROR,
}
interface RecentTransaction {
  status: ResentTransactionStatus
  hash: string,
  chainId: number
}

interface RecentTransactions {
  transactions: Array<RecentTransaction>,
  isInitialized: boolean,
  initializeTransactions: () => void,
  addTransaction: (transaction: Pick<RecentTransaction, "hash" | "chainId">) => void,
  updateTransactionStatus: (hash: string, status: ResentTransactionStatus) => void,
  clearTransactions: () => void
}

export const useRecentTransactions = create<RecentTransactions>()(persist((set) => ({
  transactions: [],
  isInitialized: true,
  initializeTransactions: () => set((state) => {
    const initializedState = {
      isInitialized: true
    }
    // if(localStorage) {
    //   const savedTransactions = localStorage.getItem(localStorageKey);
    //
    //
    //   if(savedTransactions) {
    //     return {...initializedState, transactions: JSON.parse(savedTransactions)};
    //   }
    // }

    return initializedState;
  }),
  addTransaction: (transaction) => set((state) => {
    const updatedTransactions = [{...transaction, status: ResentTransactionStatus.PENDING}, ...state.transactions];
    // localStorage.setItem(localStorageKey, JSON.stringify(updatedTransactions));

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
      console.log(updatedTransactions);

      // localStorage.setItem(localStorageKey, JSON.stringify(updatedTransactions));

      return {transactions: updatedTransactions}
    }

    return {};
  }),
  clearTransactions: () => set(() => {
    const updatedState = {transactions: []};
    // localStorage.setItem(localStorageKey, JSON.stringify(updatedState.transactions));

    return updatedState;
  })
}), {
  name: 'recent-transactions', // name of the item in the storage (must be unique)
}))
