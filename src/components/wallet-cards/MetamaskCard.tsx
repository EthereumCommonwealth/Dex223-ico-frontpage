import { isMobile } from "react-device-detect";
import { useAccount, useConnect, useSwitchChain } from "wagmi";

import PickButton from "@/components/PickButton";
import { wallets } from "@/config/wallets";
import useDetectMetaMaskMobile from "@/hooks/useMetamaskMobile";
import usePreloaderTimeout from "@/hooks/usePreloader";
import addToast from "@/other/toast";
import {
  useConnectWalletDialogStateStore,
  useConnectWalletStore,
} from "@/stores/useConnectWalletStore";

const { image, name } = wallets.metamask;
export default function MetamaskCard() {
  const { connectors, connectAsync, isPending } = useConnect();
  const { isConnecting } = useAccount();
  const { setName, chainToConnect } = useConnectWalletStore();
  const { setIsOpened } = useConnectWalletDialogStateStore();
  const isMetamaskMobile = useDetectMetaMaskMobile();

  const { switchChainAsync } = useSwitchChain();

  const loading = usePreloaderTimeout({ isLoading: isPending });

  if (isMobile && !isMetamaskMobile) {
    return (
      <a href={`https://metamask.app.link/dapp/${window.location.host || "test-app.dex223.io"}`}>
        <PickButton disabled={isConnecting} image={image} label={name} loading={loading} />
      </a>
    );
  }

  return (
    <PickButton
      disabled={isConnecting}
      onClick={async () => {
        setName("metamask");
        const connectorToConnect = connectors[1];

        console.log(connectorToConnect);
        if (!connectorToConnect) {
          return addToast("Install metamask to proceed", "error");
        }

        try {
          await connectAsync({
            connector: connectorToConnect,
          });
          // await switchChainAsync({ chainId: chainToConnect });
          setIsOpened(false);
          addToast("Wallet connected");
        } catch (e: any) {
          // console.log(e);
          if (e.code && e.code === 4001) {
            addToast("User rejected the request", "error");
          } else {
            addToast("Something went wrong", "error");
          }
        }
      }}
      image={image}
      label={name}
      loading={loading}
    />
  );
}
