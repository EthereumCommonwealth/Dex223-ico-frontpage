import { useEffect, useMemo, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useContractRead } from "wagmi";
import { ICOContractAddressETH, ICOContractAddressETHPreSale, ZERO_ADDRESS } from "@/constants/tokens";
import testICOABI from "@/constants/abis/icoABI.json";
import { isNativeToken } from "@/functions/isNativeToken";

export function useReward({ amountToPay, pickedToken, presale }) {
  const { data: readData, isLoading, status } = useContractRead({
    address: presale ? ICOContractAddressETHPreSale : ICOContractAddressETH,
    abi: testICOABI,
    functionName: "getRewardAmount",
    chainId: pickedToken.chainId,
    args: [
      isNativeToken(pickedToken) ? ZERO_ADDRESS : pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ],
    cacheTime: 60000 * 5
  });

  const [output, setOutput] = useState("");

  useEffect(() => {
    if (typeof readData !== "undefined") {
      if (typeof readData === "bigint") {
        setOutput(formatUnits(<bigint>readData, 18))
      }
    }
  }, [readData]);

  return { output, readData };
}
