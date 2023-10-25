import {create} from "zustand";

interface TransactionTypeState {
  type: "legacy" | "default",

  setLegacyType: () => void,
  setDefaultType: () => void
}

export const useTransactionTypeStore = create<TransactionTypeState>()((set, get) => ({
  type: "default",

  setLegacyType: () => set((state) => ({...state, type: "legacy"})),
  setDefaultType: () => set((state) => ({...state, type: "default"})),
}));

interface GasPrice {
  gasPrice: string,
  baseGasPrice: string,
  setGasPrice: (price: string) => void
  setBaseGasPrice: (price: string) => void

}

export const useTransactionGasPrice = create<GasPrice>((set) => ({
  gasPrice: "",
  baseGasPrice: "",
  setGasPrice: (price) => set((state) => ({...state, gasPrice: price})),
  setBaseGasPrice: (price) => set({baseGasPrice: price})
}))

interface GasFee {
  baseFee: string,
  maxFeePerGas: string,
  feeError: string | null,
  feeWarning: string | null,

  setMaxFeePerGas: (price: string) => void
  setBaseFee: (price: string) => void
}

export const useTransactionGasFee = create<GasFee>((set) => ({
  maxFeePerGas: "",
  baseFee: "",
  feeError: null,
  feeWarning: null,
  setMaxFeePerGas: (price) => set((state) => {
    if (Boolean(state.baseFee) && +price < +state.baseFee) {
      return {feeError: "Base fee can't be lower than current", maxFeePerGas: price, feeWarning: null}
    }

    if (Boolean(state.baseFee) && +price > +state.baseFee * 3) {
      return {feeWarning: "Max base fee is unnecessarily too high", feeError: null, maxFeePerGas: price}
    }

    return {maxFeePerGas: price, feeError: null, feeWarning: null}
  }),
  setBaseFee: (price) => set({baseFee: price}),
}));

interface PriorityFee {
  maxPriorityFeePerGas: string,
  priority: string,
  priorityError: string | null,
  setMaxPriorityFeePerGas: (price: string) => void
  setBasePriority: (priority: string) => void
}

export const useTransactionPriorityFee = create<PriorityFee>(set => ({
  maxPriorityFeePerGas: "",
  priority: "",
  priorityError: null,
  setMaxPriorityFeePerGas: (price) => set((state) => {
    if (!price || +price <= 0) {
      return {maxPriorityFeePerGas: price, priorityError: "Priority Fee can't be lower or equal 0"}
    }

    return {maxPriorityFeePerGas: price, priorityError: null}
  }),
  setBasePriority: (priority) => set({priority}),
}))

interface GasLimit {
  estimatedGasLimit: number,
  gasLimit: number,
  unsavedGasLimit: number,
  isEditing: boolean,
  gasLimitWarning: string | null,
  onCancel: () => void,
  onSave: () => void,
  setEditing: (isEditing: boolean) => void,
  setUnsavedGasLimit: (value: string) => void,
  setGasLimit: (value: string) => void,
  setEstimatedGasLimit: (value: string) => void,
}

export const useTransactionGasLimit = create<GasLimit>((set) => ({
  estimatedGasLimit: 0,
  gasLimit: 0,
  unsavedGasLimit: 0,
  isEditing: false,
  gasLimitWarning: null,
  setEditing: (isEditing: boolean) => set(() => {
    return {
      isEditing
    }
  }),

  setUnsavedGasLimit: (gasLimit: string) => set((state) => {
    if (Boolean(state.estimatedGasLimit) && +gasLimit < state.estimatedGasLimit) {
      return {
        unsavedGasLimit: +gasLimit,
        gasLimitWarning: "Gas limit is lower than estimated"
      }
    }

    if (Boolean(state.estimatedGasLimit) && +gasLimit > state.estimatedGasLimit * 3) {
      return {
        unsavedGasLimit: +gasLimit,
        gasLimitWarning: "Gas limit is unnecessarily too high"
      }
    }

    return {
      unsavedGasLimit: +gasLimit,
      gasLimitWarning: null
    }
  }),

  setEstimatedGasLimit: (gasLimit: string) => set({estimatedGasLimit: +gasLimit}),

  setGasLimit: (gasLimit: string) => set(() => {
    return {
      gasLimit: +gasLimit,
      gasLimitWarning: null
    }
  }),

  onSave: () => set((state) => {
    if (+state.gasLimit < state.estimatedGasLimit) {
      return {
        isEditing: false,
        gasLimitWarning: "Gas limit is lower than estimated",
        gasLimit: state.unsavedGasLimit

      }
    }

    if (+state.gasLimit > state.estimatedGasLimit * 3) {
      return {
        isEditing: false,
        gasLimitWarning: "Gas limit is unnecessarily too high",
        gasLimit: state.unsavedGasLimit

      }
    }

    return {
      isEditing: false,
      gasLimitWarning: null,
      gasLimit: state.unsavedGasLimit

    }
  }),

  onCancel: () => set((state) => {
    if (+state.gasLimit < state.estimatedGasLimit) {
      return {
        isEditing: false,
        gasLimitWarning: "Gas limit is lower than estimated"
      }
    }

    if (+state.gasLimit > state.estimatedGasLimit * 3) {
      return {
        isEditing: false,
        gasLimitWarning: "Gas limit is unnecessarily too high"
      }
    }

    return {
      isEditing: false,
      gasLimitWarning: null
    }
  })
}))
