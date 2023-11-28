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

export function useAllowance() {
  const { address } = useAccount();
  const { amountToPay, pickedToken } = usePurchaseData(({ amountToPay, computed }) => ({
    amountToPay,
    pickedToken: computed.pickedToken
  }));

  const { config: allowanceConfig } = usePrepareContractWrite({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "approve",
    args: [
      ICOContractAddressETH,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {
    data: approvingData,
    write: writeTokenApprove,
    isLoading: waitingForApprove
  } = useContractWrite(allowanceConfig);

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
