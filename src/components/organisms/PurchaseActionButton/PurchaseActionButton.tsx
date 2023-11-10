import React from "react";
import styles from "./PurchaseActionButton.module.scss";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useChainId, useNetwork, useSwitchNetwork } from "wagmi";
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
import { useAllowance } from "@/components/organisms/BuyForm/hooks/useAllowance";
import { parseUnits } from "viem";
import { usePurchaseData } from "@/stores/usePurchaseData";
import { usePurchaseTokens } from "@/components/organisms/BuyForm/hooks/usePurchaseTokens";
import { useReward } from "@/components/organisms/BuyForm/hooks/useReward";

export default function PurchaseActionButton({
                                               isEnoughBalance,
                                               isAmountEntered,
                                               contractBalance,
                                               openKeystore,
                                               devMode
                                             }) {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { showMessage } = useSnackbar();
  const { chain } = useNetwork();
  const { waitingForPurchase } = usePurchaseTokens({ devMode: true });

  const { processBuyTokens } = usePurchaseTokens({ devMode });

  const { allowanceData, waitingForApprove, isApproving, writeTokenApprove } = useAllowance({ devMode: true });
  const { pickedToken, amountToPay } = usePurchaseData((state) => ({
    pickedToken: state.computed.pickedToken,
    amountToPay: state.amountToPay
  }));

  const { output } = useReward({ devMode: true, pickedToken, amountToPay });

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

  if (!isEnoughBalance) {
    return <Button disabled>Insufficient balance</Button>;
  }

  if (Boolean(chain?.id) && chain.id !== 820) {
    return <Button onClick={() => switchNetwork(820)}>Switch to Callisto Network</Button>
  }

  if (isApproving) {
    return <Button disabled>
      <span className={styles.waitingContent}>
        <span>Approving</span>
        <Preloader size={24}/>
      </span>
    </Button>
  }

  if (waitingForApprove || waitingForPurchase) {
    return <Button disabled>
      <Preloader size={24}/>
    </Button>
  }

  if (allowanceData < parseUnits(amountToPay, pickedToken.decimals) && pickedToken.id !== 11) {
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
      showMessage(`There are only ${contractBalance} D223 available at this moment`, "info");
      return;
    }
    processBuyTokens();
  }}>Buy Tokens</Button>
}
