import { useBalance } from "wagmi";
import { DEX223, ICOContractAddressETH } from "@/constants/tokens";

export function useICOContractBalance() {
  return useBalance({
    address: ICOContractAddressETH,
    token: DEX223.address,
    chainId: 1,
    watch: true
  });
}
