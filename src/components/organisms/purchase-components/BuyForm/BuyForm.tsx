import React, { useEffect, useState } from "react";
import styles from "./BuyForm.module.scss";
import { DEX223, ICOContractAddressETH, ICOContractAddressETHPreSale } from "@/constants/tokens";
import clsx from "clsx";
import TokenCard from "../../buy-form/TokenCard";
import Spacer from "../../../atoms/Spacer";
import {
  useAccount,
  useBalance,
} from "wagmi";
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
import PurchaseActionButton from "../PurchaseActionButton";
import ICOProgressBar from "../../buy-form/ICOProgressBar";
import { isNativeToken } from "@/functions/isNativeToken";
import MessageInteractive from "../../buy-form/MessageInteractive";
import {
  useRecentTransactionTracking
} from "@/components/organisms/purchase-components/BuyForm/hooks/useRecentTransactionTracking";
import AlertMessage from "@/components/atoms/AlertMessage";
import { defaultGasLimitForETH, defaultGasLimitForTokens } from "@/constants/config";
import useTrackFeeData from "@/components/organisms/purchase-components/BuyForm/hooks/useTrackFeeData";
import Countdown from "@/components/atoms/Countdown";


export default function BuyForm({ presale = false }: { presale?: boolean }) {
  const { pickedToken, setAmountToPay, amountToPay } = usePurchaseData((state) => ({
    pickedToken: state.computed.pickedToken,
    setAmountToPay: state.setAmountToPay,
    amountToPay: state.amountToPay
  }));
  const [dialogOpened, setDialogOpened] = useState(false);
  const [gasSettingsOpened, setGasSettingsOpened] = useState(false);
  const [isRecentTransactionsOpened, setRecentTransactionsOpened] = useState(false);

  const { address } = useAccount();

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

  const contractBalance = useICOContractBalance({ presale });

  const { data: tokenToPayBalance } = useBalance({
    address,
    token: isNativeToken(pickedToken) ? undefined : pickedToken.address,
    watch: true,
    chainId: pickedToken.chainId,
    cacheTime: 60000 * 60
  });

  const { data: D223Balance } = useBalance({
    address,
    token: DEX223.address,
    watch: true,
    chainId: DEX223.chainId,
    cacheTime: 0
  });

  useEffect(() => {
    if (!gasLimitComputed.customized) {
      if (pickedToken.id === 1) {
        setGasLimit(defaultGasLimitForETH);
        setUnsavedGasLimit(defaultGasLimitForETH);
        setEstimatedGasLimit(defaultGasLimitForETH);
      } else {
        setGasLimit(defaultGasLimitForTokens);
        setUnsavedGasLimit(defaultGasLimitForTokens);
        setEstimatedGasLimit(defaultGasLimitForTokens);
      }
    }

  }, [gasLimitComputed.customized, pickedToken.id, setEstimatedGasLimit, setGasLimit, setUnsavedGasLimit]);

  const { output } = useReward({ pickedToken, amountToPay, presale });

  const networkFee = useNetworkFee();

  return <div className={styles.formToBuy}>
    {/*{!presale && <div className={styles.preICOText}>pre-ICO: Round 2</div>}*/}
    {presale && <p className={styles.ico}>
      ICO contract: {presale ? ICOContractAddressETHPreSale : ICOContractAddressETH}
    </p>}
    {!presale && <>
      <div className={styles.completed}>
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
          <path
            d="M13.1004 20.9332L25.2004 8.8332C25.4019 8.6332 25.6412 8.5332 25.9182 8.5332C26.1952 8.5332 26.4338 8.63379 26.6338 8.83497C26.8338 9.03612 26.9338 9.27501 26.9338 9.55164C26.9338 9.82824 26.8338 10.0665 26.6338 10.2665L13.8004 23.0999C13.6004 23.2999 13.3671 23.3999 13.1004 23.3999C12.8338 23.3999 12.6004 23.2999 12.4004 23.0999L6.33377 17.0332C6.13377 16.8317 6.03933 16.5925 6.05044 16.3154C6.06155 16.0384 6.16769 15.7999 6.36887 15.5999C6.57003 15.3999 6.80892 15.2999 7.08554 15.2999C7.36214 15.2999 7.60044 15.3999 7.80044 15.5999L13.1004 20.9332Z"
            fill="#F5FFF9"/>
        </svg>
        <span>Second pre-sale round completed!</span>
      </div>
      <p className={styles.stayTuned}>
        Stay tuned for the next round
      </p>
    </>
    }
    {!presale && <Countdown/>}
    {!presale && <ICOProgressBar presale={presale}/>}
    <div className={styles.ratio}>
      <span>1 D223 = {presale ? "$0.0008" : "$0.00065"}</span>
    </div>

    {presale && <div className={styles.min}>Min. purchase amount is $5000 in the private sale</div>}

    <TokenCard readonly={!presale} withPicker presale={presale} balance={tokenToPayBalance?.formatted} type="pay"
               tokenName={pickedToken.symbol}
               tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(v) => setAmountToPay(v)}/>
    <Spacer height={12}/>
    <TokenCard balance={D223Balance?.formatted} type="receive" tokenName={DEX223.symbol}
               tokenLogo="/images/tokens/D223.svg" amount={output} handleChange={null} readonly/>
    <Spacer height={20}/>
    <div className={clsx(styles.gasSettings, gasSettingsOpened && styles.gasSettingsOpened)}>
      <div className={styles.gasHeader} role="button" onClick={() => setGasSettingsOpened(!gasSettingsOpened)}>
        <span className={styles.gasTitle}>
          <span className="desktop">Network fee</span>
          <span className="mobile">Fee</span>
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
          ~ {networkFee}
          <button className={styles.editGasButton} onClick={() => setGasSettingsOpened(true)}>EDIT</button>
        </div>
      </div>
      <GasSettingsDialog isOpen={gasSettingsOpened} onClose={() => setGasSettingsOpened(false)}/>
    </div>
    <Spacer height={20}/>
    <MessageInteractive presale={presale}/>
    <Spacer height={20}/>
    <PurchaseActionButton
      isEnoughBalance={+tokenToPayBalance?.formatted > +amountToPay}
      isAmountEntered={Boolean(+amountToPay)}
      contractBalance={contractBalance?.data?.formatted}
      openKeystore={() => setDialogOpened(true)}
      presale={presale}
    />
    {isUnViewed && <>
      {Boolean(failed.length) && <AlertMessage
        text={<div>Your recent transaction(s) failed. Click <button onClick={() => setRecentTransactionsOpened(true)}
                                                                    className={styles.textButton}>here</button> for more
          details.</div>}
        severity="error"/>
      }
      {Boolean(pending.length) && <AlertMessage
        text={<div>
          We have noticed that you have a pending transaction, you can track or speed it up below
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
      <button onClick={() => setRecentTransactionsOpened(true)} className={styles.textButton}>
        See all <span className="desktop">{" "} activity</span>
      </button>
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
