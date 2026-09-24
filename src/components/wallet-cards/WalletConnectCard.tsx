import { useTranslations } from "next-intl";
import { useAccount, useConnect } from "wagmi";

import PickButton from "@/components/PickButton";
import { wallets } from "@/config/wallets";
import usePreloaderTimeout from "@/hooks/usePreloader";
import addToast from "@/other/toast";
import {
  useConnectWalletDialogStateStore,
  useConnectWalletStore,
} from "@/stores/useConnectWalletStore";

const { image, name } = wallets.wc;
export default function WalletConnectCard() {
  const t = useTranslations("Wallet");
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
            addToast(t("toasts.walletConnected"));
          })
          .catch((e) => {
            if (e.code && e.code === 4001) {
              addToast(t("toasts.userRejected"), "error");
            } else {
              addToast(t("toasts.somethingWentWrong"), "error");
            }
          });
      }}
      image={image}
      label={name}
      loading={loading}
    />
  );
}
