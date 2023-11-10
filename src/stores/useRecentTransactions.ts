import { create } from "zustand";
import { persist } from "zustand/middleware";

const localStorageKey = "recent-transactions";

export enum RecentTransactionStatus {
  PENDING,
  SUCCESS,
  ERROR,
  QUEUED
}

export interface RecentTransaction {
  status: RecentTransactionStatus,
  hash: `0x${string}`,
  chainId: number,
  title: string,
  type: 0 | 2,
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
  transactions: { [key: string]: Array<RecentTransaction> },
  isViewed: boolean,
  setIsViewed: (isViewed: boolean) => void
  addTransaction: (transaction: Omit<RecentTransaction, "status">, account: string) => void,
  updateTransactionStatus: (hash: string, status: RecentTransactionStatus, account: string) => void,
  clearTransactions: () => void
}

export const useRecentTransactions = create<RecentTransactions>()(persist((set) => ({
  transactions: {},
  isViewed: true,
  setIsViewed: ((isViewed) => set({ isViewed })),
  addTransaction: (transaction, account) => set((state) => {
    const pendingTransactions = state.transactions[account]?.find((t) => t.status === RecentTransactionStatus.PENDING);
    const updatedTransactions = {...state.transactions};

    const currentAccountTransactions = updatedTransactions[account];

    if(!currentAccountTransactions) {
      updatedTransactions[account] = [];
    }

    if (!pendingTransactions) {
      updatedTransactions[account] = [{ ...transaction, status: RecentTransactionStatus.PENDING }, ...updatedTransactions[account]];
      return { transactions: updatedTransactions, isViewed: false };
    } else {
      updatedTransactions[account] = [{ ...transaction, status: RecentTransactionStatus.QUEUED }, ...updatedTransactions[account]];
      return { transactions: updatedTransactions, isViewed: false };
    }
  }),
  updateTransactionStatus: (hash, status, account) => set((state) => {
    const transactionIndex = state.transactions[account].findIndex((_transaction) => {
      return _transaction.hash === hash;
    });


    if (transactionIndex !== -1) {
      const updatedTransactions = {...state.transactions};
      const queuedTransactions = state.transactions[account].filter((t) => {
        return t.status === RecentTransactionStatus.QUEUED
      });

      if (queuedTransactions.length) {
        const nextQueuedTransaction = queuedTransactions.reduce((prev, curr) => {
          return prev.details.nonce < curr.details.nonce ? prev : curr;
        });
        const nextQueuedTransactionIndex = updatedTransactions[account].findIndex(t => t.hash === nextQueuedTransaction.hash);

        updatedTransactions[account][nextQueuedTransactionIndex] = {
          ...state.transactions[account][nextQueuedTransactionIndex],
          status: RecentTransactionStatus.PENDING
        };
      }

      updatedTransactions[account][transactionIndex] = { ...state.transactions[account][transactionIndex], status };

      return { transactions: updatedTransactions }
    }

    return {};
  }),
  clearTransactions: () => set(() => {
    return { transactions: {} };
  })
}), {
  name: localStorageKey, // name of the item in the storage (must be unique)
}));

export type TransactionSpeedUpType = "autoIncrease" | "market" | "aggressive" | "custom";

interface ITransactionToSpeedUp {
  transactionToSpeedUp: RecentTransaction | null,
  setTransactionToSpeedUp: (transaction: RecentTransaction | null) => void,
  speedUpType: TransactionSpeedUpType,
  setType: (type: TransactionSpeedUpType) => void
}

export const useTransactionSpeedUp = create<ITransactionToSpeedUp>((set) => ({
  transactionToSpeedUp: null,
  speedUpType: "market",

  setTransactionToSpeedUp: (transaction) => set({ transactionToSpeedUp: transaction }),
  setType: (type) => set({ speedUpType: type })
}));
