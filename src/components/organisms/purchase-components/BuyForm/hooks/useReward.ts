import { useMemo } from "react";
import { formatUnits, parseUnits } from "viem";
import { useContractRead } from "wagmi";
import { ICOContractAddressETH, ZERO_ADDRESS } from "@/constants/tokens";
import testICOABI from "@/constants/abis/testICOABI.json";
import { isNativeToken } from "@/functions/isNativeToken";

export function useReward({ amountToPay, pickedToken }) {
  const { data: readData, isLoading, status } = useContractRead({
    address: ICOContractAddressETH,
    abi: testICOABI,
    functionName: "getRewardAmount",
    chainId: pickedToken.chainId,
    args: [
      isNativeToken(pickedToken) ? ZERO_ADDRESS : pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const output = useMemo(() => {
    if (!amountToPay || !readData) {
      return ""
    }

    return formatUnits(<bigint>readData, 18);
  }, [amountToPay, readData]);

  return { output, readData };
}
