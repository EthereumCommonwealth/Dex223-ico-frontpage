import { useBalance } from "wagmi";
import { getChainId, getDEXToken, getICOContractAddress } from "@/constants/tokens";

export function useICOContractBalance({ devMode }) {
  return useBalance({
    address: getICOContractAddress(devMode),
    token: getDEXToken(devMode).address,
    chainId: getChainId(devMode),
    watch: true
  });
}
