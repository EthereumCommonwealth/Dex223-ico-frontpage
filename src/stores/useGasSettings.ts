import {create} from "zustand";

interface TransactionTypeState {
  type: "legacy" | "default",
  gasPrice: string,
  maxFeePerGas: string,
  maxPriorityFeePerGas: string,

  currentFeePerGas: string,

  setLegacyType: () => void,
  setDefaultType: () => void

  setGasPrice: (price: string) => void
  setMaxFeePerGas: (price: string) => void
  setMaxPriorityFeePerGas: (price: string) => void
}

export const useTransactionTypeStore = create<TransactionTypeState>()((set, get) => ({
  type: "default",
  gasPrice: "",
  maxFeePerGas: "",
  maxPriorityFeePerGas: "",

  currentFeePerGas: "",

  setLegacyType: () => set((state) => ({...state, type: "legacy"})),
  setDefaultType: () => set((state) => ({...state, type: "default"})),

  setGasPrice: (price) => set((state) => ({...state, gasPrice: price})),
  setMaxFeePerGas: (price) => set((state) => ({...state, maxFeePerGas: price})),
  setMaxPriorityFeePerGas: (price) => set((state) => ({...state, maxPriorityFeePerGas: price})),
}));

interface GasLimit {
  gasLimit: number,
  unsavedGasLimit: number,
  isEditing: boolean,
  onCancel: () => void,
  onSave: () => void,
  setEditing: (isEditing: boolean) => void,
  setUnsavedGasLimit: (value: string) => void,
  setGasLimit: (value: string) => void
}

export const useTransactionGasLimit = create<GasLimit>((set) => ({
  gasLimit: 0,
  unsavedGasLimit: 0,
  isEditing: false,

  setEditing: (isEditing: boolean) => set(() => {
    return {
      isEditing
    }
  }),

  setUnsavedGasLimit: (gasLimit: string) => set(() => {
    return {
      unsavedGasLimit: +gasLimit
    }
  }),

  setGasLimit: (gasLimit: string) => set(() => {
    return {
      gasLimit: +gasLimit
    }
  }),

  onSave: () => set((state) => {
    return {
      isEditing: false,
      gasLimit: state.unsavedGasLimit
    }
  }),

  onCancel: () => set(() => {
    return {isEditing: false}
  })
}))
