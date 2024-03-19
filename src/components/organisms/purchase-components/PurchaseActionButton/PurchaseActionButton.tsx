import React from "react";
import styles from "./PurchaseActionButton.module.scss";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useSnackbar } from "@/providers/SnackbarProvider";
import {
  useTransactionGasFee,
  useTransactionGasLimit,
  useTransactionGasPrice,
  useTransactionTypeStore
} from "@/stores/useGasSettings";
import Button from "@/components/atoms/Button";
import Spacer from "@/components/atoms/Spacer";
import Preloader from "@/components/atoms/Preloader";
import { useAllowance } from "@/components/organisms/purchase-components/BuyForm/hooks/useAllowance";
import { parseUnits } from "viem";
import { usePurchaseData } from "@/stores/usePurchaseData";
import { usePurchaseTokens } from "@/components/organisms/purchase-components/BuyForm/hooks/usePurchaseTokens";
import { useReward } from "@/components/organisms/purchase-components/BuyForm/hooks/useReward";
import { chainToConnect } from "@/constants/tokens";
import { isNativeToken } from "@/functions/isNativeToken";
import usePreloaderTimeout from "@/hooks/usePreloaderTimeout";
import Dialog from "@/components/atoms/Dialog";
import { useConfirmInWalletDialogStore } from "@/stores/useConfirmInWalletDialogStore";
import Svg from "@/components/atoms/Svg";

export default function PurchaseActionButton({
                                               isEnoughBalance,
                                               isAmountEntered,
                                               contractBalance,
                                               openKeystore,
                                               presale
                                             }) {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { showMessage } = useSnackbar();
  const { chain } = useNetwork();
  const {
    isLoading,
    purchaseWithCoins,
    purchaseWithTokens
  } = usePurchaseTokens({ presale });

  const { allowanceData, waitingForApprove, isApproving, writeTokenApprove } = useAllowance({ presale });

  const approveLoading = usePreloaderTimeout({ isLoading: isApproving, timeout: 2000 });

  const { pickedToken, amountToPay } = usePurchaseData((state) => ({
    pickedToken: state.computed.pickedToken,
    amountToPay: state.amountToPay
  }));

  const {
    isOpened: confirmInWalletDialogOpened,
    setIsOpened: setConfirmInWalletDialogOpened
  } = useConfirmInWalletDialogStore();


  const { output } = useReward({ pickedToken, amountToPay, presale });

  const { type } = useTransactionTypeStore();

  const {
    validation: feeValidation
  } = useTransactionGasFee();

  const {
    validation: gasPriceValidation
  } = useTransactionGasPrice();

  const {
    validation: gasLimitValidation
  } = useTransactionGasLimit();

  // if(!presale) {
  //   return <Button disabled>Wait for the next round</Button>;
  // }

  if (!isConnected) {
    return <>
      <Button onClick={open}>Connect wallet</Button>
      <Spacer height={20}/>
      <Button onClick={openKeystore} variant="outlined">Import keystore file</Button>
    </>;
  }

  if (!isAmountEntered) {
    return <Button disabled>Enter amount</Button>;
  }

  if (Boolean(chain?.id) && chain.id !== chainToConnect.id) {
    return <Button onClick={() => switchNetwork(chainToConnect.id)}>Switch to {chainToConnect.name}</Button>
  }

  if (!isEnoughBalance) {
    return <Button disabled>Insufficient balance</Button>;
  }

  if (presale && +amountToPay < 5000) {
    return <Button disabled>Minimum deposit is $5000</Button>
  }

  if (approveLoading) {
    return <>
      <Button disabled>
      <span className={styles.waitingContent}>
        <span>Approving</span>
        <Preloader size={24}/>
      </span>
      </Button>
    </>
  }

  if (waitingForApprove || isLoading) {
    return <><Button disabled>
      <span className={styles.waitingContent}>
        <span>Waiting for confirmation</span>
        <Preloader size={24}/>
      </span>
    </Button>
      <Dialog isOpen={confirmInWalletDialogOpened} onClose={() => setConfirmInWalletDialogOpened(false)}>
        <div className="flex flex-col items-center justify-center p-10 relative">
          <button onClick={() => setConfirmInWalletDialogOpened(false)} className="absolute right-2 top-2 text-secondary-text hover:text-primary-text">
            <Svg iconName="close" />
          </button>
          <Preloader size={48}/>
          <p className="text-primary-text mt-5">Confirm operation in your wallet</p>
        </div>
      </Dialog>
    </>
  }

  if (allowanceData < parseUnits(amountToPay, pickedToken.decimals) && !isNativeToken(pickedToken)) {
    return <Button onClick={() => {
      writeTokenApprove();
      setConfirmInWalletDialogOpened(true);
    }}>Approve {pickedToken.symbol}</Button>
  }

  if (
    type === "legacy" && Boolean(gasPriceValidation.error) ||
    type === "default" && Boolean(feeValidation.error) ||
    Boolean(gasLimitValidation.error)
  ) {
    return <Button error>Update your gas fee settings</Button>
  }

  return <Button onClick={() => {
    if (+output > +contractBalance) {
      showMessage(`There are not enough tokens for sale. Just wait for the next round.`, "info");
      return;
    }
    if (isNativeToken(pickedToken)) {
      if (purchaseWithCoins) {
        purchaseWithCoins();
        setConfirmInWalletDialogOpened(true);
      }
    } else {
      if (purchaseWithTokens) {
        purchaseWithTokens();
        setConfirmInWalletDialogOpened(true);
      }
    }

  }}>Buy Tokens</Button>
}
