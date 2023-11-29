import React, { useEffect, useState } from "react";
import styles from "./BuyForm.module.scss";
import { DEX223, ICOContractAddressETH } from "@/constants/tokens";
import clsx from "clsx";
import TokenCard from "../../buy-form/TokenCard";
import Spacer from "../../../atoms/Spacer";
import {
  useAccount,
  useBalance,
  useNetwork,
  usePublicClient,
  useWalletClient
} from "wagmi";
import testICOABI from "../../../../constants/abis/testICOABI.json";
import { parseUnits } from "viem";
import Svg from "../../../atoms/Svg";
import DrawerDialog from "../../../atoms/DrawerDialog";
import KeystoreConnect from "../../others/KeystoreConnect";
import GasSettingsDialog from "@/components/organisms/purchase-components/GasSettingsDialog";
import {
  useTransactionGasFee,
  useTransactionGasLimit,
  useTransactionGasPrice,
  useTransactionPriorityFee, useTransactionTypeStore,
} from "@/stores/useGasSettings";
import RecentTransactionsDialog from "../../buy-form/RecentTransactionsDialog";
import { useICOContractBalance } from "@/components/organisms/purchase-components/BuyForm/hooks/useICOContractBalance";
import { useReward } from "@/components/organisms/purchase-components/BuyForm/hooks/useReward";
import { useNetworkFee } from "@/components/organisms/purchase-components/BuyForm/hooks/useNetworkFee";
import { usePurchaseData } from "@/stores/usePurchaseData";
import TokenPicker from "../../buy-form/TokenPicker";
import PurchaseActionButton from "../PurchaseActionButton";
import ICOProgressBar from "../../buy-form/ICOProgressBar";
import { isNativeToken } from "@/functions/isNativeToken";
import MessageInteractive from "../../buy-form/MessageInteractive";
import {
  useRecentTransactionTracking
} from "@/components/organisms/purchase-components/BuyForm/hooks/useRecentTransactionTracking";
import AlertMessage from "@/components/atoms/AlertMessage";
import addBigInt from "@/functions/addBigInt";
import { defaultGasLimit } from "@/constants/config";
import useTrackFeeData from "@/components/organisms/purchase-components/BuyForm/hooks/useTrackFeeData";
import { useAllowance } from "@/components/organisms/purchase-components/BuyForm/hooks/useAllowance";
import Countdown from "@/components/atoms/Countdown";


export default function BuyForm() {
  const { pickedToken, setAmountToPay, amountToPay } = usePurchaseData((state) => ({
    pickedToken: state.computed.pickedToken,
    setAmountToPay: state.setAmountToPay,
    amountToPay: state.amountToPay
  }));
  const [dialogOpened, setDialogOpened] = useState(false);
  const [gasSettingsOpened, setGasSettingsOpened] = useState(false);
  const [isRecentTransactionsOpened, setRecentTransactionsOpened] = useState(false);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const publicClient = usePublicClient({ chainId: chain?.id });

  const {
    isUnViewed,
    pending,
    failed,
    success,
    totalUnViewed
  } = useRecentTransactionTracking();

  const { type } = useTransactionTypeStore();
  const baseFeeComputed = useTransactionGasFee((state) => state.computed);
  const priorityComputed = useTransactionPriorityFee((state) => state.computed);
  const gasPriceComputed = useTransactionGasPrice((state) => state.computed);
  const {
    setGasLimit,
    setUnsavedGasLimit,
    setEstimatedGasLimit,
    computed: gasLimitComputed
  } = useTransactionGasLimit();

  useTrackFeeData();

  const contractBalance = useICOContractBalance();

  const { data: tokenToPayBalance } = useBalance({
    address,
    token: isNativeToken(pickedToken) ? undefined : pickedToken.address,
    watch: true,
    chainId: pickedToken.chainId
  });

  const { data: D223Balance } = useBalance({
    address,
    token: DEX223.address,
    watch: true,
    chainId: DEX223.chainId
  });

  const { data: walletClient }: any = useWalletClient();
  const { allowanceData } = useAllowance();

  const [isGasEstimating, setIsGasEstimating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!+amountToPay) {
          return;
        }
        setIsGasEstimating(true);

        if (publicClient?.estimateContractGas) {
          let gas: bigint;

          if (isNativeToken(pickedToken)) {
            gas = await publicClient.estimateGas({
              account: address,
              to: ICOContractAddressETH,
              value: parseUnits(amountToPay, pickedToken.decimals)
            });
          } else {
            gas = await publicClient.estimateContractGas({
              account: address,
              address: ICOContractAddressETH,
              abi: testICOABI,
              functionName: 'purchaseTokens',
              args: [
                pickedToken.address,
                parseUnits(amountToPay, pickedToken.decimals)
              ]
            });
          }

          if (!gas || gasLimitComputed.customized) {
            return;
          }

          if (addBigInt(gas, 7000) > defaultGasLimit) {
            const _limit = addBigInt(gas, 7000);
            setGasLimit(_limit);
            setUnsavedGasLimit(_limit);
            setEstimatedGasLimit(_limit);
          } else {
            setGasLimit(defaultGasLimit);
            setUnsavedGasLimit(defaultGasLimit);
            setEstimatedGasLimit(defaultGasLimit);
          }
        }
      } catch (error) {
        if (!gasLimitComputed.customized) {
          setGasLimit(defaultGasLimit);
          setUnsavedGasLimit(defaultGasLimit);
          setEstimatedGasLimit(defaultGasLimit);
        }
        console.log("🚀 ~ gas estimation error:", error);
      } finally {
        setIsGasEstimating(false);
      }
    })();
  }, [
    allowanceData,
    address,
    walletClient,
    pickedToken.decimals,
    amountToPay,
    publicClient,
    setGasLimit,
    setUnsavedGasLimit,
    setEstimatedGasLimit,
    pickedToken,
    gasLimitComputed.customized
  ]);

  const { output } = useReward({ pickedToken, amountToPay });

  const networkFee = useNetworkFee();

  return <div className={styles.formToBuy}>
    <div className={styles.preICOText}>pre-ICO: Round 2</div>
    <p className={styles.ico}>
      ICO contract: {ICOContractAddressETH}
    </p>
    <Countdown />
    <ICOProgressBar/>
    <div className={styles.ratio}>
      <span>1 D223 = $0.00065</span>
    </div>

    <TokenPicker/>
    <TokenCard balance={tokenToPayBalance?.formatted} type="pay" tokenName={pickedToken.symbol}
               tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(v) => setAmountToPay(v)}/>
    <Spacer height={12}/>
    <TokenCard balance={D223Balance?.formatted} type="receive" tokenName={DEX223.symbol}
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
          ~ {networkFee} ETH
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

          }}><Svg iconName="check-below"/></span>
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
    <Spacer height={8}/>
  </div>;
}//460
