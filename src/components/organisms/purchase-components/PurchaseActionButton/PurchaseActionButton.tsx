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
  } = usePurchaseTokens({presale});

  const { allowanceData, waitingForApprove, isApproving, writeTokenApprove } = useAllowance({presale});

  const approveLoading = usePreloaderTimeout({isLoading: isApproving, timeout: 2000});

  const { pickedToken, amountToPay } = usePurchaseData((state) => ({
    pickedToken: state.computed.pickedToken,
    amountToPay: state.amountToPay
  }));

  const { output } = useReward({ pickedToken, amountToPay, presale });

  const {type} = useTransactionTypeStore();

  const {
    validation: feeValidation
  } = useTransactionGasFee();

  const {
    validation: gasPriceValidation
  } = useTransactionGasPrice();

  const {
    validation: gasLimitValidation
  } = useTransactionGasLimit();

  if(!presale) {
    return <Button disabled>Wait for the next round</Button>;
  }

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

  if(presale && +amountToPay < 5000) {
    return <Button disabled>Minimum deposit is $5000</Button>
  }

  if (approveLoading) {
    return <Button disabled>
      <span className={styles.waitingContent}>
        <span>Approving</span>
        <Preloader size={24}/>
      </span>
    </Button>
  }

  if (waitingForApprove || isLoading) {
    return <Button disabled>
      <span className={styles.waitingContent}>
        <Preloader size={24}/>
      </span>
    </Button>
  }

  if (allowanceData < parseUnits(amountToPay, pickedToken.decimals) && !isNativeToken(pickedToken)) {
    return <Button onClick={writeTokenApprove}>Approve {pickedToken.symbol}</Button>
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
    if(isNativeToken(pickedToken)) {
      if(purchaseWithCoins) {
        purchaseWithCoins();
      }
    } else {
      if(purchaseWithTokens) {
        purchaseWithTokens();
      }
    }

  }}>Buy Tokens</Button>
}
