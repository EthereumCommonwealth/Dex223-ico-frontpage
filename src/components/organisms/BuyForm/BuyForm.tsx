import React, { useEffect, useState } from "react";
import styles from "./BuyForm.module.scss";
import { getDEXToken, getICOContractAddress, TokenInfo } from "@/constants/tokens";
import clsx from "clsx";
import TokenCard from "../TokenCard";
import Spacer from "../../atoms/Spacer";
import {
  useAccount,
  useBalance,
  useFeeData,
  useNetwork,
  usePublicClient,
  useWalletClient
} from "wagmi";
import testICOABI from "../../../constants/abis/testICOABI.json";
import { parseUnits } from "viem";
import Svg from "../../atoms/Svg";
import DrawerDialog from "../../atoms/DrawerDialog";
import KeystoreConnect from "../KeystoreConnect";
import GasSettingsDialog from "@/components/organisms/GasSettingsDialog";
import {
  useTransactionGasFee,
  useTransactionGasLimit,
  useTransactionGasPrice,
  useTransactionPriorityFee, useTransactionTypeStore,
} from "@/stores/useGasSettings";
import RecentTransactionsDialog from "@/components/organisms/RecentTransactionsDialog";
import { useRecentTransactionsStore } from "@/stores/useRecentTransactions";
import { useICOContractBalance } from "@/components/organisms/BuyForm/hooks/useICOContractBalance";
import { useReward } from "@/components/organisms/BuyForm/hooks/useReward";
import { useNetworkFee } from "@/components/organisms/BuyForm/hooks/useNetworkFee";
import { addBigIntPercent } from "@/functions/addBigIntPercent";
import { usePurchaseData } from "@/stores/usePurchaseData";
import TokenPicker from "@/components/organisms/TokenPicker";
import PurchaseActionButton from "@/components/organisms/PurchaseActionButton";
import ICOProgressBar from "@/components/organisms/ICOProgressBar";
import { isNativeToken } from "@/functions/isNativeToken";
import MessageInteractive from "@/components/organisms/MessageInteractive";
import { useRecentTransactionTracking } from "@/components/organisms/BuyForm/hooks/useRecentTransactionTracking";
import AlertMessage from "@/components/atoms/AlertMessage";

export default function BuyForm() {
  const { pickedToken, setAmountToPay, amountToPay } = usePurchaseData((state) => ({
    pickedToken: state.computed.pickedToken,
    setAmountToPay: state.setAmountToPay,
    amountToPay: state.amountToPay
  }));
  const [dialogOpened, setDialogOpened] = useState(false);
  const [gasSettingsOpened, setGasSettingsOpened] = useState(false);
  const [isRecentTransactionsOpened, setRecentTransactionsOpened] = useState(false);
  const [devMode, setDevMode] = useState(true);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const publicClient = usePublicClient({ chainId: chain?.id });

  const { data: feeData } = useFeeData({
    chainId: chain?.id || 820,
    watch: true
  });

  // const { isViewed } = useRecentTransactionsStore();

  const {
    isUnViewed,
    pending,
    failed,
    success ,
    totalUnViewed
  } = useRecentTransactionTracking();

  const { type } = useTransactionTypeStore();
  const { setBaseFee, setMaxFeePerGas, computed: baseFeeComputed } = useTransactionGasFee();
  const { setBasePriority, setMaxPriorityFeePerGas, computed: priorityComputed } = useTransactionPriorityFee();
  const { setGasPrice, setBaseGasPrice, computed: gasPriceComputed } = useTransactionGasPrice();
  const {
    setGasLimit,
    setUnsavedGasLimit,
    setEstimatedGasLimit,
    computed: gasLimitComputed
  } = useTransactionGasLimit();

  useEffect(() => {
    if (feeData?.formatted?.gasPrice) {
      setGasPrice(addBigIntPercent(feeData.gasPrice, 20));
      setBaseGasPrice(feeData.gasPrice);
    }

    if (feeData?.lastBaseFeePerGas) {
      setMaxFeePerGas(addBigIntPercent(feeData.lastBaseFeePerGas, 20));
      setBaseFee(feeData.lastBaseFeePerGas);
    }

    if (feeData?.formatted?.maxPriorityFeePerGas) {
      setMaxPriorityFeePerGas(addBigIntPercent(feeData.maxPriorityFeePerGas, 50));
      setBasePriority(feeData.maxPriorityFeePerGas);
    }
  }, [feeData, setBaseGasPrice, setBaseFee, setBasePriority, setGasPrice, setMaxFeePerGas, setMaxPriorityFeePerGas]);

  const contractBalance = useICOContractBalance({ devMode });

  const { data: tokenToPayBalance } = useBalance({
    address,
    token: isNativeToken(pickedToken) ? undefined : pickedToken.address,
    watch: true,
    chainId: pickedToken.chainId
  });

  const { data: testToken223Balance } = useBalance({
    address,
    token: getDEXToken(devMode).address,
    watch: true,
    chainId: getDEXToken(devMode).chainId
  });

  const { data: walletClient }: any = useWalletClient();

  useEffect(() => {
    (async () => {
      try {
        if (publicClient?.estimateContractGas) {
          const gas = await publicClient.estimateContractGas({
            account: address,
            address: getICOContractAddress(devMode),
            abi: testICOABI,
            functionName: 'purchaseTokens',
            args: [
              pickedToken.address,
              parseUnits(amountToPay, pickedToken.decimals)
            ]
          });
          setGasLimit(addBigIntPercent(gas, 20));
          setUnsavedGasLimit(addBigIntPercent(gas, 20));
          setEstimatedGasLimit(gas);
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [address, walletClient, pickedToken.address, pickedToken.decimals, amountToPay, devMode, publicClient, setGasLimit, setUnsavedGasLimit, setEstimatedGasLimit]);

  const { output } = useReward({ devMode, pickedToken, amountToPay });

  const networkFee = useNetworkFee();

  console.log("UNV");
  console.log(isUnViewed);

  return <>
    <ICOProgressBar/>
    <div className={styles.ratio}><span>1 DEX223 = 0.001 {pickedToken.symbol}</span></div>
    <TokenPicker devMode={devMode}/>
    <TokenCard balance={tokenToPayBalance?.formatted} type="pay" tokenName={pickedToken.symbol}
               tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(v) => setAmountToPay(v)}/>
    <Spacer height={12}/>
    <TokenCard balance={testToken223Balance?.formatted} type="receive" tokenName={getDEXToken(devMode).symbol}
               tokenLogo="/images/tokens/DEX.svg" amount={output} handleChange={null} readonly/>
    <Spacer height={20}/>
    <div className={clsx(styles.gasSettings, gasSettingsOpened && styles.gasSettingsOpened)}>
      <div className={styles.gasHeader} role="button" onClick={() => setGasSettingsOpened(!gasSettingsOpened)}>
        <span className={styles.gasTitle}>
          Network fee
          {/*Show custom label if gasLimit was changed OR
            fee or priority was changes for type-2 transactions OR
            gasPrice was changed for type-0 tranasctions
          */}
          {(gasLimitComputed.customized
              || (type === "default" && (baseFeeComputed.customized || priorityComputed.customized))
              || (type === "legacy" && gasPriceComputed.customized))
            && <span className={styles.customTag}>Custom</span>}
        </span>
        <div className={styles.gasExpand}>
          <Svg iconName="gas"/>
          ~ {networkFee} CLO
          <button className={styles.editGasButton} onClick={() => setGasSettingsOpened(true)}>EDIT</button>
        </div>
      </div>
      <GasSettingsDialog isOpen={gasSettingsOpened} onClose={() => setGasSettingsOpened(false)}/>
    </div>
    <Spacer height={20}/>
    <MessageInteractive/>
    <Spacer height={20}/>
    <PurchaseActionButton
      isEnoughBalance={+tokenToPayBalance?.formatted > +amountToPay}
      isAmountEntered={Boolean(+amountToPay)}
      contractBalance={contractBalance?.data?.formatted}
      openKeystore={() => setDialogOpened(true)}
      devMode={devMode}
    />

    {isUnViewed && <>
      {Boolean(failed.length) && <AlertMessage
        text={<div>Your recent transaction(s) have been failed. Click <button
          className={styles.textButton}>here</button> for more details.</div>}
        severity="error"/>
      }
      {Boolean(pending.length) && <AlertMessage
        text={<div>
          We have noticed that you have pending transaction, you could track it or speed up below
          <span style={{
            marginLeft: 6,
            top: 6,
            position: "relative",

          }}><Svg iconName="check-below" /></span>
        </div>}
        severity="success"
        noIcon
      />}
      {Boolean(success.length) && Boolean(!pending.length) && Boolean(!failed.length) &&
        <AlertMessage text="Your recent transaction(s) was successful" severity="success"/>
      }
    </>}

    <div className={styles.recentTransactionsField}>
      <div className="relative">
        <span className={styles.recentTransactionsIcon}>
          <Svg iconName="recent-transactions"/>
          {Boolean(isUnViewed) && <span className={styles.newIndicator}/>}
        </span>
        Recent transactions

        {Boolean(isUnViewed) && <span className={styles.unreadCounter}>
          {totalUnViewed}
        </span>}
      </div>
      <button onClick={() => setRecentTransactionsOpened(true)} className={styles.textButton}>See all activity</button>
    </div>

    <DrawerDialog onClose={() => setDialogOpened(false)} isOpen={dialogOpened}>
      <KeystoreConnect handleClose={() => setDialogOpened(false)}/>
    </DrawerDialog>

    <RecentTransactionsDialog isOpen={isRecentTransactionsOpened} handleClose={() => {
      setRecentTransactionsOpened(false);
    }}/>
    {/*<Button disabled>Wait for the next round</Button>*/}
    <Spacer height={8}/>
  </>;
}//460
