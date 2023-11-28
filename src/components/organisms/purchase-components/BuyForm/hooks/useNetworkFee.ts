import { useMemo } from "react";
import { formatEther } from "viem";
import {
  useTransactionGasFee,
  useTransactionGasLimit,
  useTransactionGasPrice,
  useTransactionPriorityFee,
  useTransactionTypeStore
} from "@/stores/useGasSettings";

export function useNetworkFee() {
  const { type } = useTransactionTypeStore();

  const { baseFee, maxFeePerGas } = useTransactionGasFee();
  const { maxPriorityFeePerGas } = useTransactionPriorityFee();
  const { gasPrice } = useTransactionGasPrice();

  const { gasLimit } = useTransactionGasLimit();

  return useMemo(() => {
    if (type === "default") {
      const maxFee = (+formatEther((maxPriorityFeePerGas + maxFeePerGas) * gasLimit)).toFixed(4);
      const _baseFee = (+formatEther((maxPriorityFeePerGas + baseFee) * gasLimit)).toFixed(4);

      return `${_baseFee} - ${maxFee}`;
    }

    return (+formatEther(gasLimit * gasPrice)).toFixed(4);

  }, [baseFee, gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas, type]);
}
