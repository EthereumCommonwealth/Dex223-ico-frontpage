import { create } from "zustand";
import { formatEther } from "viem";
import { addBigIntPercent } from "@/functions/addBigIntPercent";

interface TransactionTypeState {
  type: "legacy" | "default",

  setLegacyType: () => void,
  setDefaultType: () => void
}

export const useTransactionTypeStore = create<TransactionTypeState>()((set, get) => ({
  type: "default",

  setLegacyType: () => set((state) => ({ ...state, type: "legacy" })),
  setDefaultType: () => set((state) => ({ ...state, type: "default" })),
}));

interface GasPrice {
  gasPrice: bigint,
  baseGasPrice: bigint,
  setGasPrice: (price: bigint) => void
  setBaseGasPrice: (price: bigint) => void,
  validation: {
    error: string,
    warning: string
  }
  computed: {
    gasPrice: string,
    baseGasPrice: string,
    customized: boolean
  }
}

export const useTransactionGasPrice = create<GasPrice>((set, get) => ({
  gasPrice: BigInt(0),
  baseGasPrice: BigInt(0),
  setGasPrice: (price) => set({ gasPrice: price }),
  setBaseGasPrice: (price) => set({ baseGasPrice: price }),
  validation: {
    get warning() {
      const { gasPrice, baseGasPrice } = get();

      if(Boolean(baseGasPrice) && gasPrice > gasPrice * BigInt(3)) {
        return "Gas price is higher than necessary"
      }

      return ""
    },
    get error() {
      const { gasPrice, baseGasPrice } = get();

      if(Boolean(baseGasPrice) && gasPrice < baseGasPrice) {
        return "Max base fee is low for current network conditions"
      }

      return ""
    }
  },
  computed: {
    get gasPrice() {
      return formatEther(get().gasPrice, "gwei")
    },
    get baseGasPrice() {
      return formatEther(get().baseGasPrice, "gwei")
    },
    get customized() {
      return addBigIntPercent(get().baseGasPrice, 20) !== get().gasPrice;
    }
  }
}))

interface GasFee {
  baseFee: bigint,
  maxFeePerGas: bigint,
  setMaxFeePerGas: (price: bigint) => void
  setBaseFee: (price: bigint) => void,
  validation: {
    error: string,
    warning: string
  }
  computed: {
    baseFee: string,
    maxFeePerGas: string,
    customized: boolean
  }
}

export const useTransactionGasFee = create<GasFee>((set, get) => ({
  maxFeePerGas: BigInt(0),
  baseFee: BigInt(0),
  setMaxFeePerGas: (price) => set({ maxFeePerGas: price }),
  setBaseFee: (price) => set({ baseFee: price }),
  validation: {
    get warning() {
      const { baseFee, maxFeePerGas } = get();

      if(Boolean(baseFee) && maxFeePerGas > baseFee * BigInt(3)) {
        return "Max base fee is higher than necessary"
      }

      return ""
    },
    get error() {
      const { baseFee, maxFeePerGas } = get();

      if(Boolean(baseFee) && maxFeePerGas < baseFee) {
        return "Max base fee is low for current network conditions"
      }

      return ""
    }
  },
  computed: {
    get baseFee() {
      return formatEther(get().baseFee, "gwei")
    },
    get maxFeePerGas() {
      return formatEther(get().maxFeePerGas, "gwei")
    },
    get customized() {
      return get().maxFeePerGas !== addBigIntPercent(get().baseFee, 20);
    }
  }
}));

interface PriorityFee {
  maxPriorityFeePerGas: bigint,
  basePriority: bigint,
  setMaxPriorityFeePerGas: (price: bigint) => void
  setBasePriority: (priority: bigint) => void,
  validation: {
    warning: string
  }
  computed: {
    maxPriorityFeePerGas: string,
    basePriority: string,
    customized: boolean
  }
}

export const useTransactionPriorityFee = create<PriorityFee>((set, get) => ({
  maxPriorityFeePerGas: BigInt(0),
  basePriority: BigInt(0),
  setMaxPriorityFeePerGas: (price) => set( { maxPriorityFeePerGas: price }),
  setBasePriority: (priority) => set({ basePriority: priority }),
  validation: {
    get warning() {
      const { basePriority, maxPriorityFeePerGas } = get();

      if(Boolean(basePriority) && maxPriorityFeePerGas < basePriority) {
        return "Priority fee is low for current network conditions"
      }

      if (Boolean(basePriority) && maxPriorityFeePerGas > basePriority * BigInt(2)) {
        return "Priority fee is higher than necessary. You may pay more than needed"
      }

      return ""
    }
  },
  computed: {
    get maxPriorityFeePerGas() {
      return formatEther(get().maxPriorityFeePerGas, "gwei")
    },
    get basePriority() {
      return formatEther(get().basePriority, "gwei")
    },
    get customized() {
      return get().maxPriorityFeePerGas !== addBigIntPercent(get().basePriority, 50);
    }
  }
}))

interface GasLimit {
  gasLimit: bigint,
  estimatedGasLimit: bigint,
  unsavedGasLimit: bigint,
  isEditing: boolean,
  onCancel: () => void,
  onSave: () => void,
  setEditing: (isEditing: boolean) => void,
  setUnsavedGasLimit: (value: bigint) => void,
  setGasLimit: (value: bigint) => void,
  resetUnsaved: () => void,
  setEstimatedGasLimit: (value: bigint) => void,
  validation: {
    warning: string,
    error: string
  },
  computed: {
    customized: boolean
  }
}

export const useTransactionGasLimit = create<GasLimit>((set, get) => ({
  estimatedGasLimit: BigInt(0),
  gasLimit: BigInt(0),
  unsavedGasLimit: BigInt(0),
  isEditing: false,
  setEditing: (isEditing: boolean) => set(() => {
    return {
      isEditing
    }
  }),

  setUnsavedGasLimit: (gasLimit) => set((state) => {
    return {
      unsavedGasLimit: gasLimit
    }
  }),

  setEstimatedGasLimit: (gasLimit) => set({ estimatedGasLimit: gasLimit }),

  resetUnsaved: () => set((state) => {
    return {
      unsavedGasLimit: state.estimatedGasLimit,
      gasLimitWarning: null
    }
  }),

  setGasLimit: (gasLimit) => set(() => {
    return {
      gasLimit: gasLimit,
      gasLimitWarning: null
    }
  }),

  onSave: () => set((state) => {
    return {
      isEditing: false,
      gasLimit: state.unsavedGasLimit
    }
  }),

  onCancel: () => set((state) => {
    return {
      isEditing: false,
      unsavedGasLimit: state.gasLimit
    }
  }),

  validation: {
    get warning() {
      const { estimatedGasLimit, gasLimit } = get();

      if (Boolean(estimatedGasLimit) && gasLimit > estimatedGasLimit * BigInt(3)) {
        return "Gas limit is unnecessarily too high"
      }

      return ""
    },
    get error() {
      const { estimatedGasLimit, gasLimit } = get();

      if (Boolean(estimatedGasLimit) && gasLimit < estimatedGasLimit) {
        return "Gas limit is lower than estimated"
      }

      return ""
    }
  },
  computed: {
    get customized() {
      return get().gasLimit !== addBigIntPercent(get().estimatedGasLimit, 20);
    }
  }
}))
