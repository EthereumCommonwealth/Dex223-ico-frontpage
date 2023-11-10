import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import ERC20ABI from "@/constants/abis/erc20.json";
import { getICOContractAddress } from "@/constants/tokens";
import { parseUnits } from "viem";
import { usePurchaseData } from "@/stores/usePurchaseData";

export function useAllowance({ devMode }) {
  const { address } = useAccount();
  const { amountToPay, pickedToken } = usePurchaseData(({ amountToPay, computed }) => ({
    amountToPay,
    pickedToken: computed.pickedToken
  }))

  const { config: allowanceConfig } = usePrepareContractWrite({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "approve",
    args: [
      getICOContractAddress(devMode),
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {
    data: approvingData,
    write: writeTokenApprove,
    isLoading: waitingForApprove
  } = useContractWrite(allowanceConfig);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approvingData?.hash,
  });

  const { data: allowanceData }: { data: bigint } = useContractRead({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "allowance",
    args: [
      address,
      getICOContractAddress(devMode)
    ],
    watch: true
  });

  return {
    writeTokenApprove,
    allowanceData,
    isApproving,
    waitingForApprove
  }
}
