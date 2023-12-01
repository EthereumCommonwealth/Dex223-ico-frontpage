import { useBalance } from "wagmi";
import { chainToConnect, DEX223, ICOContractAddressETH } from "@/constants/tokens";

export function useICOContractBalance() {
  return useBalance({
    address: ICOContractAddressETH,
    token: DEX223.address,
    chainId: chainToConnect.id,
    watch: true,
    cacheTime: 0
  });
}
