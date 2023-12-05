import { useBalance } from "wagmi";
import { chainToConnect, DEX223, ICOContractAddressETH, ICOContractAddressETHPreSale } from "@/constants/tokens";

export function useICOContractBalance({presale}) {
  return useBalance({
    address: presale ? ICOContractAddressETHPreSale : ICOContractAddressETH,
    token: DEX223.address,
    chainId: chainToConnect.id,
    watch: true,
    cacheTime: 0
  });
}
