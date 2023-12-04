import { useEffect } from "react";
import { addBigIntPercent } from "@/functions/addBigIntPercent";
import {
  useTransactionGasFee,
  useTransactionGasPrice,
  useTransactionPriorityFee
} from "@/stores/useGasSettings";
import { useFeeData } from "wagmi";
import { chainToConnect } from "@/constants/tokens";
import addBigInt from "@/functions/addBigInt";
import { parseEther } from "viem";

export default function useTrackFeeData() {
  const { setBaseFee, setMaxFeePerGas, computed: baseFeeComputed, focused: gasFeeFocused } = useTransactionGasFee();
  const { setBasePriority, setMaxPriorityFeePerGas, computed: priorityComputed } = useTransactionPriorityFee();
  const { setGasPrice, setBaseGasPrice, computed: gasPriceComputed, focused: gasPriceFocused } = useTransactionGasPrice();
  const { data: feeData } = useFeeData({
    chainId: chainToConnect.id,
    watch: true
  });

  useEffect(() => {
    if (feeData?.formatted?.gasPrice) {
      if(!gasPriceFocused && !gasPriceComputed.customized) {
        setGasPrice(feeData.gasPrice + parseEther("2", "gwei"));
      }
      setBaseGasPrice(feeData.gasPrice);
    }

    if (feeData?.lastBaseFeePerGas) {
      if(!gasFeeFocused && !baseFeeComputed.customized) {
        setMaxFeePerGas(addBigIntPercent(feeData.lastBaseFeePerGas, 10));
      }
      setBaseFee(feeData.lastBaseFeePerGas);
    }

    if (feeData?.formatted?.maxPriorityFeePerGas) {
      setMaxPriorityFeePerGas(feeData.maxPriorityFeePerGas);
      setBasePriority(feeData.maxPriorityFeePerGas);
    }
  }, [feeData, setBaseGasPrice, setBaseFee, setBasePriority, setGasPrice, setMaxFeePerGas, setMaxPriorityFeePerGas, gasFeeFocused, baseFeeComputed.customized, gasPriceFocused, gasPriceComputed.customized]);
}
