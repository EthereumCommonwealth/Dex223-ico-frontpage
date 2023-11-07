import React, {useEffect, useMemo, useState} from "react";
import styles from "./TransactionSpeedUp.module.scss";
import DialogHeader from "@/components/atoms/DialogHeader";
import Spacer from "@/components/atoms/Spacer";
import {TransactionSpeedUpType, useTransactionSpeedUp} from "@/stores/useRecentTransactions";
import clsx from "clsx";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Svg from "@/components/atoms/Svg";
import RecentTransaction from "@/components/organisms/RecentTransaction";
import {formatEther, parseEther, parseGwei} from "viem";
import {useAccount, useContractWrite, useFeeData, usePrepareContractWrite} from "wagmi";
import testICOABI from "../../../constants/abis/testICOABI.json";
import {useWeb3Modal} from "@web3modal/react";
import {useSnackbar} from "@/providers/SnackbarProvider";

function addBigIntPercent(value: bigint, percentage: number) {
  return value * (BigInt(percentage) + BigInt(100)) / BigInt(100);
}
function useGasEstimation({maxBaseFee, maxPriorityFee}: {
  maxBaseFee: bigint,
  maxPriorityFee: bigint,
}) {
  const {transactionToSpeedUp} = useTransactionSpeedUp();

  const estimatedGasFee = useMemo(() => {
    return (+formatEther((maxBaseFee + maxPriorityFee) *
      BigInt(transactionToSpeedUp?.details.gas))).toFixed(7);
  }, [maxBaseFee, maxPriorityFee, transactionToSpeedUp?.details.gas]);

  return {
    baseFee: maxBaseFee + maxPriorityFee,
    priorityFee: maxPriorityFee,
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

function SpeedUpVariant({id, handleCheck, isActive, calculatedValue, helperText}: {
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
        <Svg iconName="info"/>
      </div>

    </label>
  </div>
}
export default function TransactionSpeedUp({handleClose}) {
  const {connector} = useAccount();

  const isMetamask = useMemo(() => {
    return connector.name === "MetaMask";
  }, [connector?.name]);

  const {transactionToSpeedUp, speedUpType, setType, setTransactionToSpeedUp} = useTransactionSpeedUp();
  const {data} = useFeeData({
    chainId: 820
  });

  const [customBaseFee, setCustomBaseFee] = useState(formatEther(BigInt(+transactionToSpeedUp.details.maxFeePerGas * 1.1), "gwei"));
  const [customPriorityFee, setCustomPriorityFee] = useState(formatEther(BigInt(+transactionToSpeedUp.details.maxPriorityFeePerGas * 1.1), "gwei"));

  const autoIncreaseData = useGasEstimation({
    maxBaseFee: addBigIntPercent(BigInt(transactionToSpeedUp.details.maxFeePerGas), 10) - addBigIntPercent(BigInt(transactionToSpeedUp.details.maxPriorityFeePerGas), 10),
    maxPriorityFee: addBigIntPercent(BigInt(transactionToSpeedUp.details.maxPriorityFeePerGas), 10),
  });

  const marketData = useGasEstimation({
    maxBaseFee: addBigIntPercent(data.lastBaseFeePerGas, 20),
    maxPriorityFee: addBigIntPercent(data.maxPriorityFeePerGas, 50),
  });

  const aggressiveData = useGasEstimation({
    maxBaseFee: addBigIntPercent(data.lastBaseFeePerGas, 25),
    maxPriorityFee: addBigIntPercent(data.maxPriorityFeePerGas, 100),
  });

  const customData = useGasEstimation({
    maxBaseFee: parseEther(customBaseFee, "gwei"),
    maxPriorityFee: parseEther(customPriorityFee, "gwei"),
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

  const {config: purchaseConfig} = usePrepareContractWrite({
    address: transactionToSpeedUp?.details.address,
    abi: testICOABI,
    functionName: transactionToSpeedUp?.details.functionName,
    args: transactionToSpeedUp?.details.args,
    gas: currentData.gas,
    //set nonce from transactionSpeedUp to rewrite transaction
    nonce: transactionToSpeedUp?.details.nonce,
    //set new gas settings to speed up transaction
    maxFeePerGas: currentData.baseFee,
    maxPriorityFeePerGas: currentData.priorityFee,
  });

  const {showMessage} = useSnackbar();

  const {
    write: handleSpeedUp,
  } = useContractWrite({
    ...purchaseConfig, onSettled: (data, error) => {
      if (error) {
        console.log(error);
        return;
      }

      setTransactionToSpeedUp({...transactionToSpeedUp, hash: data.hash});

      showMessage("New gas settings are applied");
      console.log("Rewrite settled");
      console.log(data);
    }
  });

  console.log("TRANSACTION TO SPEED UP");
  console.log(transactionToSpeedUp);

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
    {isMetamask ? <div>
      We have noticed that you are using MetaMask wallet. Unfortunately it does not support Speed Up
      through dApps. As an alternative you could use built-in speed up option inside metamask extension.
        Here is more <a target="_blank" href="https://support.metamask.io/hc/en-us/articles/360015489251-How-to-speed-up-or-cancel-a-pending-transaction">details</a>
      </div> :
    <div className={styles.speedUpContent}>
      <RecentTransaction noSpeedUp transaction={transactionToSpeedUp} />
      <Spacer height={20} />
      <div className={styles.speedUpTableHeader}>
        <span>Gas option</span>
        <span className={styles.maxFeeLabel}>Max fee, CLO</span>
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
      <div className={clsx(styles.customSpeedUpSettings, speedUpType !== "custom" && styles.disabled)}>
        <div className={styles.labelInputWrapper}>
          <label>Base fee</label>
          <div className={styles.inputWrapper}>
            <Input error={false} warning={false} style={{paddingRight: 68}} onChange={(e) => {
              setCustomBaseFee(e.target.value);
            }} value={+customBaseFee} id="maxFeePerGas" type="text" placeholder="Base fee"/>
            <span className={styles.inputRightContent}>Gwei</span>
          </div>
          <div className={styles.helperText}>
            Current transaction {formatEther(BigInt(+transactionToSpeedUp.details.maxFeePerGas), "gwei")} Gwei
          </div>
        </div>
        <div className={styles.labelInputWrapper}>
          <label>Priority fee</label>
          <div className={styles.inputWrapper}>
            <Input error={false} style={{paddingRight: 68}} onChange={(e) => {
              setCustomPriorityFee(e.target.value);
            }} value={customPriorityFee} id="minerFee" type="text" placeholder="Miner fee"/>
            <span className={styles.inputRightContent}>Gwei</span>
          </div>
          <div className={styles.helperText}>
            Current {formatEther(BigInt(+transactionToSpeedUp.details.maxPriorityFeePerGas), "gwei")} Gwei
          </div>
        </div>
      </div>
      <Spacer height={20} />
      <Button onClick={handleSpeedUp}>Apply</Button>
    </div>}
  </>;
}
