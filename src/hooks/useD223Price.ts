import { useContractRead } from "wagmi";
import { ICOContractAddressETH, ICOContractAddressETHPreSale, USDT, ZERO_ADDRESS } from "@/constants/tokens";
import testICOABI from "@/constants/abis/icoABI.json";
import { isNativeToken } from "@/functions/isNativeToken";
import { parseUnits } from "viem";

export function useD223Price({presale}): {price} {
  const { data: readData, isLoading, status } = useContractRead({
    address: presale ? ICOContractAddressETHPreSale : ICOContractAddressETH,
    abi: testICOABI,
    functionName: "getRewardAmount",
    chainId: 1,
    args: [
      USDT.address,
      parseUnits("1", USDT.decimals)
    ],
    cacheTime: 60000 * 5
  });

  return {price: readData};
}
