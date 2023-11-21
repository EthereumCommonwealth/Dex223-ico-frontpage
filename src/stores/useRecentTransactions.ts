import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

const localStorageKey = "recent-transactions";

export enum RecentTransactionStatus {
  PENDING,
  SUCCESS,
  ERROR,
  QUEUED
}

export interface RecentTransaction {
  id: string,
  status: RecentTransactionStatus,
  hash: `0x${string}`,
  chainId: number,
  title: string,
  type: 0 | 2,
  isViewed: boolean,
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
  setIsViewed: (id: string, address: string, isViewed?: boolean) => void
  addTransaction: (transaction: Omit<RecentTransaction, "status" | "id" | "isViewed">, account: string) => void,
  updateTransactionStatus: (id: string, status: RecentTransactionStatus, account: string) => void,
  updateTransactionHash: (id: string, newHash: `0x${string}`, account: string) => void,
  clearTransactions: () => void
}

export const useRecentTransactionsStore = create<RecentTransactions>()(persist((set) => ({
  transactions: {},
  isViewed: true,
  addTransaction: (transaction, account) => set((state) => {
    const pendingTransactions = state.transactions[account]?.find((t) => t.status === RecentTransactionStatus.PENDING);
    const updatedTransactions = {...state.transactions};

    const currentAccountTransactions = updatedTransactions[account];

    if(!currentAccountTransactions) {
      updatedTransactions[account] = [];
    }


    const uid = uuidv4();

    if (!pendingTransactions) {
      updatedTransactions[account] = [{
        ...transaction,
        status: RecentTransactionStatus.PENDING,
        id: uid,
        isViewed: false
      }, ...updatedTransactions[account]];
      return { transactions: updatedTransactions, isViewed: false };
    } else {
      updatedTransactions[account] = [{
          ...transaction,
          status: RecentTransactionStatus.QUEUED,
          id: uid,
          isViewed: false
        }, ...updatedTransactions[account]];
      return { transactions: updatedTransactions, isViewed: false };
    }
  }),
  updateTransactionStatus: (id, status, account) => set((state) => {
    const transactionIndex = state.transactions[account].findIndex((_transaction) => {
      return _transaction.id === id;
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
  updateTransactionHash: (id, newHash, account) => set((state) => {
    const transactionIndex = state.transactions[account].findIndex((_transaction) => {
      return _transaction.id === id;
    });


    if (transactionIndex !== -1) {
      const updatedTransactions = {...state.transactions};

      updatedTransactions[account][transactionIndex] = { ...state.transactions[account][transactionIndex], hash: newHash };

      return { transactions: updatedTransactions }
    }

    return {};
  }),
  setIsViewed: (id, account, isViewed = true) => set((state) => {
    const transactionIndex = state.transactions[account].findIndex((_transaction) => {
      return _transaction.id === id;
    });


    if (transactionIndex !== -1) {
      const updatedTransactions = {...state.transactions};
      updatedTransactions[account][transactionIndex] = { ...state.transactions[account][transactionIndex], isViewed };

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
  transactionToSpeedUpId: string | null,
  setTransactionToSpeedUp: (transactionId: string | null) => void,
  speedUpType: TransactionSpeedUpType,
  setType: (type: TransactionSpeedUpType) => void
}

export const useTransactionSpeedUp = create<ITransactionToSpeedUp>((set) => ({
  transactionToSpeedUpId: null,
  speedUpType: "market",

  setTransactionToSpeedUp: (transactionId) => set({ transactionToSpeedUpId: transactionId }),
  setType: (type) => set({ speedUpType: type })
}));
