import { useEffect, useMemo, useRef, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useContractRead } from "wagmi";
import { getICOContractAddress, TokenInfo } from "@/constants/tokens";
import testICOABI from "@/constants/abis/testICOABI.json";

function isNativeToken(token: TokenInfo) {
  return token.id === 1 || token.id === 11;
}

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function useReward({ amountToPay, devMode, pickedToken }) {
  const { data: readData, isLoading, status } = useContractRead({
    address: getICOContractAddress(devMode),
    abi: testICOABI,
    functionName: "getRewardAmount",
    chainId: pickedToken.chainId,
    args: [
      isNativeToken(pickedToken) ? ZERO_ADDRESS : pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const output = useMemo(() => {
    console.log(readData);
    if (!amountToPay || !readData) {
      return ""
    }

    return formatUnits(<bigint>readData, 18);
  }, [amountToPay, readData]);

  return { output, readData };
}
