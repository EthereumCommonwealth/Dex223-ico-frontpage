import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";
import ERC20ABI from "@/constants/abis/erc20.json";
import { ICOContractAddressETH } from "@/constants/tokens";
import { parseUnits } from "viem";
import { usePurchaseData } from "@/stores/usePurchaseData";
import { useCallback } from "react";
import { config } from "rxjs";

export function useAllowance() {
  const { address } = useAccount();
  const { amountToPay, pickedToken } = usePurchaseData(({ amountToPay, computed }) => ({
    amountToPay,
    pickedToken: computed.pickedToken
  }));

  const { config: allowanceConfig, error } = usePrepareContractWrite({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "approve",
    gas: BigInt(60000),
    args: [
      ICOContractAddressETH,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {
    data: approvingData,
    write: _writeTokenApprove,
    isLoading: waitingForApprove
  } = useContractWrite(allowanceConfig);

  const writeTokenApprove = useCallback(() => {
    try {
      _writeTokenApprove();
    } catch (e) {
      console.log(e);
    }
  }, [_writeTokenApprove]);

  const { data: allowanceFromAwait ,isLoading: isApproving } = useWaitForTransaction({
    hash: approvingData?.hash,
  });

  const { data: allowanceData }: { data: bigint } = useContractRead({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "allowance",
    args: [
      address,
      ICOContractAddressETH
    ],
    watch: true
  });

  return {
    writeTokenApprove,
    allowanceData: allowanceData,
    isApproving,
    waitingForApprove
  }
}
