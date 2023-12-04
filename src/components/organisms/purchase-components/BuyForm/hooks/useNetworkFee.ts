import { useMemo } from "react";
import { formatEther } from "viem";
import {
  useTransactionGasFee,
  useTransactionGasLimit,
  useTransactionGasPrice,
  useTransactionPriorityFee,
  useTransactionTypeStore
} from "@/stores/useGasSettings";
import useETHPrice from "@/hooks/useETHPrice";

export function useNetworkFee() {
  const { type } = useTransactionTypeStore();

  const { baseFee, maxFeePerGas } = useTransactionGasFee();
  const { maxPriorityFeePerGas } = useTransactionPriorityFee();
  const { gasPrice } = useTransactionGasPrice();

  const { gasLimit } = useTransactionGasLimit();

  const { getPriceForETH } = useETHPrice();

  return useMemo(() => {
    if (type === "default") {
      const maxFee = formatEther((maxPriorityFeePerGas + maxFeePerGas) * gasLimit);
      const _baseFee = formatEther((maxPriorityFeePerGas + baseFee) * gasLimit);

      const maxFeeInETH = getPriceForETH(+maxFee);
      const baseFeeInETH = getPriceForETH(+_baseFee);

      return `$${baseFeeInETH} - $${maxFeeInETH}`;
    }

    const networkFee = (+formatEther(gasLimit * gasPrice)).toFixed(4);
    return `$${getPriceForETH(+networkFee)}`;

  }, [baseFee, gasLimit, gasPrice, getPriceForETH, maxFeePerGas, maxPriorityFeePerGas, type]);
}
