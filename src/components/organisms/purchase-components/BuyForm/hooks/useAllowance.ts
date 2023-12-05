import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";
import ERC20ABI from "@/constants/abis/erc20.json";
import { ICOContractAddressETH, ICOContractAddressETHPreSale } from "@/constants/tokens";
import { parseUnits } from "viem";
import { usePurchaseData } from "@/stores/usePurchaseData";
import { isNativeToken } from "@/functions/isNativeToken";

export function useAllowance({presale}) {
  const { address } = useAccount();
  const { amountToPay, pickedToken } = usePurchaseData(({ amountToPay, computed }) => ({
    amountToPay,
    pickedToken: computed.pickedToken
  }));

  const { config: allowanceConfig, error } = usePrepareContractWrite({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "approve",
    args: [
      presale ? ICOContractAddressETHPreSale : ICOContractAddressETH,
      parseUnits(amountToPay, pickedToken.decimals)
    ],
    cacheTime: 0
  });

  const {
    data: approvingData,
    write: writeTokenApprove,
    isLoading: waitingForApprove
  } = useContractWrite(allowanceConfig);

  const { data: allowanceFromAwait ,isLoading: isApproving } = useWaitForTransaction({
    hash: approvingData?.hash,
    cacheTime: 0
  });

  const { data: allowanceData }: { data: bigint } = useContractRead({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "allowance",
    args: [
      address,
      presale ? ICOContractAddressETHPreSale : ICOContractAddressETH
    ],
    cacheTime: 0,
    watch: true,
    enabled: !isNativeToken(pickedToken)
  });

  return {
    writeTokenApprove,
    allowanceData: allowanceData,
    isApproving,
    waitingForApprove
  }
}
