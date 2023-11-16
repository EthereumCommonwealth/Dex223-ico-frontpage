import React, { useMemo, useState } from "react";
import styles from "./LegacyTransactionSpeedUp.module.scss";
import DialogHeader from "@/components/atoms/DialogHeader";
import Spacer from "@/components/atoms/Spacer";
import { TransactionSpeedUpType, useRecentTransactionsStore, useTransactionSpeedUp } from "@/stores/useRecentTransactions";
import clsx from "clsx";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Svg from "@/components/atoms/Svg";
import RecentTransaction from "@/components/organisms/RecentTransaction";
import { formatEther, parseEther } from "viem";
import { useAccount, useContractWrite, useFeeData, usePrepareContractWrite } from "wagmi";
import testICOABI from "../../../constants/abis/testICOABI.json";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { addBigIntPercent } from "@/functions/addBigIntPercent";
import Image from "next/image";
import ExternalTextLink from "@/components/atoms/ExternalTextLink";
import { NumericFormat } from "react-number-format";
import Tooltip from "@/components/atoms/Tooltip";

function useGasEstimation({ gasPrice }: {
  gasPrice: bigint
}) {
  const { transactionToSpeedUpId } = useTransactionSpeedUp();
  const { transactions } = useRecentTransactionsStore();
  const { address } = useAccount();

  const transactionToSpeedUp = useMemo(() => {
    return transactions[address].find((t) => {
      return t.id === transactionToSpeedUpId;
    })
  }, [address, transactionToSpeedUpId, transactions]);

  const estimatedGasFee = useMemo(() => {
    return (+formatEther(gasPrice *
      BigInt(transactionToSpeedUp?.details.gas))).toFixed(7);
  }, [gasPrice, transactionToSpeedUp?.details.gas]);

  return {
    gasPrice,
    estimated: estimatedGasFee,
    gas: transactionToSpeedUp.details.gas
  }
}

const labelsMap = {
  autoIncrease: "10% increase",
  market: "Market",
  aggressive: "Aggressive",
  custom: "Custom"
}

const iconsMap = {
  autoIncrease: <Svg iconName="auto-increase"/>,
  market: <Svg iconName="market"/>,
  aggressive: <Svg iconName="aggressive"/>,
  custom: <Svg iconName="custom-increase"/>
}

function SpeedUpVariant({ id, handleCheck, isActive, calculatedValue, helperText }: {
  id: TransactionSpeedUpType
  isActive: boolean,
  calculatedValue: string,
  helperText: string,
  handleCheck: () => void
}) {
  return <div className={styles.speedUpLabelWrapper}>
    <label className={clsx(styles.speedUpLabel, id === "custom" && styles.noBorder, isActive && styles.active)}>
      <div className={styles.speedUpLabelText}>
        <input onChange={handleCheck} checked={isActive} name="speedUpVariant" type="radio"/>
        <span className={styles.indicator}/>
        {iconsMap[id]}
        {labelsMap[id]}
      </div>

      <div className={styles.speedUpValue}>
        {calculatedValue}
        <Tooltip text={helperText}/>
      </div>

    </label>
  </div>
}

export default function LegacyTransactionSpeedUp({ handleClose }) {
  const { connector, address } = useAccount();
  const { transactions, updateTransactionHash } = useRecentTransactionsStore();


  const isMetamask = useMemo(() => {
    return connector.name === "MetaMask";
  }, [connector?.name]);

  const { transactionToSpeedUpId, speedUpType, setType, setTransactionToSpeedUp } = useTransactionSpeedUp();

  const transactionToSpeedUp = useMemo(() => {
    return transactions[address].find((t) => {
      return t.id === transactionToSpeedUpId;
    })
  }, [address, transactionToSpeedUpId, transactions]);

  const { data } = useFeeData({
    chainId: 820
  });

  const [customGasPrice, setCustomGasPrice] = useState(addBigIntPercent(BigInt(transactionToSpeedUp.details.gasPrice), 10));

  const computedGasPrice = useMemo(() => {
    return formatEther(customGasPrice, "gwei")
  }, [customGasPrice]);

  const customGasPriceError = useMemo(() => {
    if (customGasPrice < addBigIntPercent(BigInt(transactionToSpeedUp.details.gasPrice), 10)) {
      return "You have to set at least +10% value to apply transaction speed up."
    }

    return "";
  }, [customGasPrice, transactionToSpeedUp.details.gasPrice]);

  const autoIncreaseData = useGasEstimation({
    gasPrice: addBigIntPercent(BigInt(transactionToSpeedUp.details.gasPrice), 10),
  });

  const marketData = useGasEstimation({
    gasPrice: addBigIntPercent(data.gasPrice, 20)
  });

  const aggressiveData = useGasEstimation({
    gasPrice: addBigIntPercent(data.gasPrice, 25)
  });

  const customData = useGasEstimation({
    gasPrice: customGasPrice
  });

  const currentData = useMemo(() => {
    switch (speedUpType) {
      case "market":
        return marketData;
      case "aggressive":
        return aggressiveData;
      case "autoIncrease":
        return autoIncreaseData;
      case "custom":
        return customData;
    }
  }, [aggressiveData, autoIncreaseData, customData, marketData, speedUpType]);

  const { config: purchaseConfig } = usePrepareContractWrite({
    address: transactionToSpeedUp?.details.address,
    abi: testICOABI,
    functionName: transactionToSpeedUp?.details.functionName,
    args: transactionToSpeedUp?.details.args,
    gas: currentData.gas,
    //set nonce from transactionSpeedUp to rewrite transaction
    nonce: transactionToSpeedUp?.details.nonce,
    //set new gas settings to speed up transaction
    gasPrice: currentData.gasPrice
  });

  const { showMessage } = useSnackbar();

  const {
    write: handleSpeedUp,
  } = useContractWrite({
    ...purchaseConfig, onSettled: (data, error) => {
      if (error) {
        console.log(error);
        return;
      }

      updateTransactionHash(transactionToSpeedUp.id, data.hash, address);

      showMessage("New gas settings are applied");
    }
  });

  return <>
    <DialogHeader
      onClose={() => {
        handleClose();
        setTimeout(() => {
          setTransactionToSpeedUp(null)
        }, 500);
      }}
      onBack={() => setTransactionToSpeedUp(null)}
      title="Speed up"
    />
    {isMetamask ? <div className={styles.metamaskMessageContainer}>
        <Image src="/images/wallets/metamask.svg" alt="" width={80} height={75}/>
        <h3>Try the solution built into Metamask</h3>
        <p>
          We have noticed that you are using MetaMask wallet. Unfortunately it does not support Speed Up through dApps.
          As an alternative you could use built-in speed up option inside Metamask extension.
          Here is <ExternalTextLink text="more details"
                                    href="https://support.metamask.io/hc/en-us/articles/360015489251-How-to-speed-up-or-cancel-a-pending-transaction"/>
        </p>
      </div> :
      <div className={styles.speedUpContent}>
        <RecentTransaction noSpeedUp transaction={transactionToSpeedUp}/>
        <Spacer height={20}/>
        <div className={styles.speedUpTableHeader}>
          <span>Gas option</span>
          <span className={styles.maxFeeLabel}>Network fee, CLO</span>
        </div>
        {([{
          id: "autoIncrease",
          value: autoIncreaseData.estimated,
          helperText: "aaa"
        },
          {
            id: "market",
            value: marketData.estimated,
            helperText: "aaa"
          },
          {
            id: "aggressive",
            value: aggressiveData.estimated,
            helperText: "aaa"
          },
          {
            id: "custom",
            value: customData.estimated,
            helperText: "aaa"
          }] as { id: TransactionSpeedUpType, value: string, helperText: string }[]).map((variant) => {
          return <SpeedUpVariant id={variant.id} handleCheck={() => setType(variant.id)} key={variant.id}
                                 isActive={speedUpType === variant.id} calculatedValue={variant.value}
                                 helperText={variant.helperText}/>
        })}
        <div className={clsx(styles.customSpeedUpSettingsWrapper, speedUpType !== "custom" && styles.disabled)}>
          <div>
            <div className={styles.labelInputWrapper}>
              <label>
                Gas price
                <Tooltip text="Tooltip for gas price"/>
              </label>
              <div className={styles.inputWrapper}>
                <NumericFormat
                  style={{ paddingRight: 68 }}
                  onValueChange={values => setCustomGasPrice(parseEther(values.value, "gwei"))}
                  value={computedGasPrice}
                  id="gasPrice"
                  type="text"
                  placeholder="Gas price"
                  customInput={Input}
                />
                <span className={styles.inputRightContent}>Gwei</span>
              </div>
              <div className={styles.helperText}>
                Current transaction {formatEther(BigInt(+transactionToSpeedUp.details.gasPrice), "gwei")} Gwei
              </div>
            </div>
          </div>
          {customGasPriceError && speedUpType === "custom" && <div className={styles.feeError}>
            <Svg iconName="error"/>
            {customGasPriceError}
          </div>}
        </div>

        <Spacer height={20}/>
        <Button disabled={Boolean(customGasPriceError) && speedUpType === "custom"}
                onClick={handleSpeedUp}>Apply</Button>
      </div>}
  </>;
}
