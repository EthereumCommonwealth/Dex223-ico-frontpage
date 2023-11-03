import {create} from "zustand";
import {persist} from "zustand/middleware";

const localStorageKey = "recent-transactions";
export enum RecentTransactionStatus {
  PENDING,
  SUCCESS,
  ERROR,
}
export interface RecentTransaction {
  status: RecentTransactionStatus,
  hash: `0x${string}`,
  chainId: number,
  title: string,
  details?: {
    nonce: number,
    to?: `0x${string}`,
    address?: `0x${string}`,
    abi?: "ICO_ABI" | "ERC20_ABI",
    functionName?: "purchaseTokens" | "approve",
    value?: string,
    gas?: number,
    gasPrice?: string,
    maxPriorityFeePerGas?: string,
    maxFeePerGas?: string,
    args?: Array<string>
  }
}

interface RecentTransactions {
  transactions: Array<RecentTransaction>,
  isViewed: boolean,
  setIsViewed: (isViewed: boolean) => void
  addTransaction: (transaction: Omit<RecentTransaction, "status">) => void,
  updateTransactionStatus: (hash: string, status: RecentTransactionStatus) => void,
  clearTransactions: () => void
}

export const useRecentTransactions = create<RecentTransactions>()(persist((set) => ({
  transactions: [],
  isViewed: true,
  setIsViewed: ((isViewed) => set({isViewed})),
  addTransaction: (transaction) => set((state) => {
    const updatedTransactions = [{...transaction, status: RecentTransactionStatus.PENDING}, ...state.transactions];

    return {transactions: updatedTransactions, isViewed: false};
  }),
  updateTransactionStatus: (hash, status) => set((state) => {
    const transactionIndex = state.transactions.findIndex((_transaction) => {
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
  name: localStorageKey, // name of the item in the storage (must be unique)
}))
