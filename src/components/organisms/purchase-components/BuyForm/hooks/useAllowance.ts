import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWalletClient
} from "wagmi";
import ERC20ABI from "@/constants/abis/erc20.json";
import { chainToConnect, ICOContractAddressETH, ZERO_ADDRESS } from "@/constants/tokens";
import { parseUnits } from "viem";
import { usePurchaseData } from "@/stores/usePurchaseData";
import { isNativeToken } from "@/functions/isNativeToken";
import { useCallback, useMemo } from "react";

export function useAllowance() {
  const { address } = useAccount();
  const { amountToPay, pickedToken } = usePurchaseData(({ amountToPay, computed }) => ({
    amountToPay,
    pickedToken: computed.pickedToken
  }));
  const { data: walletClient } = useWalletClient();

  const writeWithoutPrepare = useCallback(async () => {
    if(walletClient) {
      await walletClient.writeContract({
        address: pickedToken.address,
        abi: ERC20ABI,
        functionName: "approve",
        args: [
          ICOContractAddressETH,
          parseUnits(amountToPay, pickedToken.decimals)
        ],
        account: address,
        chain: chainToConnect
      })
    }
  }, [address, amountToPay, pickedToken.address, pickedToken.decimals, walletClient]);

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

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approvingData?.hash,
  });

  const { data: allowanceData }: { data: bigint } = useContractRead({
    address: isNativeToken(pickedToken) ? ZERO_ADDRESS : pickedToken.address,
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
    allowanceData,
    isApproving,
    waitingForApprove,
    writeWithoutPrepare
  }
}
