import React from "react";
import styles from "./GasSettingsDialog.module.scss";
import Dialog from "@/components/atoms/Dialog";
import {useTransactionTypeStore} from "@/stores/useGasSettings";

interface Props {
  isOpen: boolean,
  onClose: any
}

export default function GasSettingsDialog({isOpen, onClose}: Props) {
  const {
    type,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    setDefaultType,
    setLegacyType,
    setGasPrice,
    setMaxFeePerGas,
    setMaxPriorityFeePerGas
  } = useTransactionTypeStore();

  return <Dialog isOpen={isOpen} onClose={onClose}>
    <div className={styles.dialog}>
      <div className={styles.typeTabs}>
        <button onClick={setLegacyType}>Legacy</button>
        <button onClick={setDefaultType}>Default</button>
      </div>

      {type === "legacy" && <>
        <div className={styles.labelInputWrapper}>
          <label htmlFor="gasPrice">Gas price</label>
          <input onChange={(e) => {
            setGasPrice(e.target.value);
          }} value={gasPrice} id="gasPrice" type="text" placeholder="Gas price" />
        </div>
      </>}
      {type === "default" && <div className={styles.inputs}>
        <div className={styles.labelInputWrapper}>
          <label htmlFor="maxFeePerGas">Max base fee</label>
          <input onChange={(e) => {
            setMaxFeePerGas(e.target.value);
          }} value={maxFeePerGas} id="maxFeePerGas" type="text" placeholder="Base fee" />
        </div>
        <div className={styles.labelInputWrapper}>
          <label htmlFor="minerFee">Miner priority fee</label>
          <input onChange={(e) => {
            setMaxPriorityFeePerGas(e.target.value);
          }} value={maxPriorityFeePerGas} id="minerFee" type="text" placeholder="Miner fee" />
        </div>
      </div>}

      <label htmlFor="gasLimit">Gas Limit</label>
      <input id="gasLimit" type="text" placeholder="Gas limit" />
    </div>

  </Dialog>;
}
