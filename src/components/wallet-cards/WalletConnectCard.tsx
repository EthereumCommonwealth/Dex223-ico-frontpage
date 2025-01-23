import { useAccount, useConnect } from "wagmi";

import PickButton from "@/components/PickButton";
import {
  useConnectWalletDialogStateStore,
  useConnectWalletStore,
} from "@/stores/useConnectWalletStore";
import { wallets } from "@/config/wallets";
import usePreloaderTimeout from "@/hooks/usePreloader";
import addToast from "@/other/toast";

const { image, name } = wallets.wc;
export default function WalletConnectCard() {
  const { isConnecting } = useAccount();
  const { connectors, connectAsync, isPending } = useConnect();

  const { walletName, setName, chainToConnect } = useConnectWalletStore();
  const { setIsOpened } = useConnectWalletDialogStateStore();

  const loading = usePreloaderTimeout({ isLoading: walletName === "wc" && isPending });

  return (
    <PickButton
      disabled={isConnecting}
      onClick={() => {
        setName("wc");
        connectAsync({
          connector: connectors[0],
          chainId: chainToConnect,
        })
          .then(() => {
            setIsOpened(false);
            addToast("Wallet connected");
          })
          .catch((e) => {
            if (e.code && e.code === 4001) {
              addToast("User rejected the request", "error");
            } else {
              addToast("Something went wrong", "error");
            }
          });
      }}
      image={image}
      label={name}
      loading={loading}
    />
  );
}
