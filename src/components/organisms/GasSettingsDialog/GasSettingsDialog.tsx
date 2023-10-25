import React, {useRef} from "react";
import styles from "./GasSettingsDialog.module.scss";
import Dialog from "@/components/atoms/Dialog";
import {
  useTransactionGasFee,
  useTransactionGasLimit, useTransactionGasPrice,
  useTransactionPriorityFee,
  useTransactionTypeStore
} from "@/stores/useGasSettings";
import clsx from "clsx";
import DialogCloseButton from "@/components/atoms/DialogCloseButton";
import Input from "@/components/atoms/Input";
import Svg from "@/components/atoms/Svg";

interface Props {
  isOpen: boolean,
  onClose: any
}

export default function GasSettingsDialog({isOpen, onClose}: Props) {
  const {
    type,
    setDefaultType,
    setLegacyType
  } = useTransactionTypeStore();

  const {baseFee, feeError, maxFeePerGas, setMaxFeePerGas, feeWarning} = useTransactionGasFee()

  const {priority, priorityError, maxPriorityFeePerGas, setMaxPriorityFeePerGas} = useTransactionPriorityFee()

  const {baseGasPrice, gasPrice, setGasPrice} = useTransactionGasPrice();

  const {
    gasLimit,
    unsavedGasLimit,
    gasLimitWarning,
    isEditing,
    estimatedGasLimit,

    setEditing,
    setUnsavedGasLimit,
    onSave,
    onCancel,
    setGasLimit
  } = useTransactionGasLimit();

  const gasLimitRef = useRef<HTMLInputElement | null>(null);

  return <Dialog isOpen={isOpen} onClose={onClose}>
    <div className={styles.dialog}>
      <div className={styles.dialogHeader}>
        <DialogCloseButton handleClose={onClose}/>
        <h2 className={styles.heading}>Network fee</h2>
        <p className={styles.paragraphText}>
          Lorem ipsum dolor sit amet consectetur. Et pretium ullamcorper et massa amet amet.
          Lorem ipsum dolor sit amet consectetur. Et pretium ullamcorper et massa amet amet.
        </p>
      </div>
      <div className={styles.priceSettingContainer}>
        <div className={styles.tabButtonsContainer}>
          <div className={styles.tabButtons}>
            <button className={clsx(styles.tabButton, type === "default" && styles.active)}
                    onClick={setDefaultType}>EIP-1559
            </button>

            <button className={clsx(styles.tabButton, type === "legacy" && styles.active)}
                    onClick={setLegacyType}>Legacy
            </button>
          </div>
        </div>
        {type === "legacy" && <>
          <div className={styles.labelInputWrapper}>
            <label>Gas price</label>
            <div className={styles.inputWrapper}>
              <Input style={{paddingRight: 68}} onChange={(e) => {
                setGasPrice(e.target.value);
              }} value={gasPrice} id="gasPrice" type="text" placeholder="Gas price"/>
              <span className={styles.inputRightContent}>Gwei</span>
            </div>
            <div className={styles.helperText}>
              <button onClick={() => {
                setGasPrice(baseGasPrice);
              }} className={styles.textButton}>Current
              </button>
              {" "}
              {baseGasPrice} Gwei
            </div>
          </div>
        </>}
        {type === "default" && <div className={styles.inputs}>
          <div className={styles.labelInputWrapper}>
            <label>Max base fee</label>
            <div className={styles.inputWrapper}>
              <Input error={Boolean(feeError)} warning={Boolean(feeWarning)} style={{paddingRight: 68}} onChange={(e) => {
                setMaxFeePerGas(e.target.value);
              }} value={maxFeePerGas} id="maxFeePerGas" type="text" placeholder="Base fee"/>
              <span className={styles.inputRightContent}>Gwei</span>
            </div>
            <div className={styles.helperText}>
              <button onClick={() => {
                setMaxFeePerGas(baseFee);
              }} className={styles.textButton}>Current
              </button>
              {" "}
              {baseFee} Gwei
            </div>
          </div>
          <div className={styles.labelInputWrapper}>
            <label>Priority fee</label>
            <div className={styles.inputWrapper}>
              <Input error={Boolean(priorityError)} style={{paddingRight: 68}} onChange={(e) => {
                setMaxPriorityFeePerGas(e.target.value);
              }} value={maxPriorityFeePerGas} id="minerFee" type="text" placeholder="Miner fee"/>
              <span className={styles.inputRightContent}>Gwei</span>
            </div>
            <div className={styles.helperText}>
              <button onClick={() => {
                setMaxPriorityFeePerGas(priority);
              }} className={styles.textButton}>Current
              </button>
              {" "}
              {priority} Gwei
            </div>
          </div>
        </div>}
        {feeError && <div className={styles.feeError}>
          <Svg iconName="error"/>
          {feeError}
        </div>}
        {feeWarning && <div className={styles.feeWarning}>
          <Svg iconName="warning"/>
          {feeWarning}
        </div>}
        {priorityError && <div className={styles.feeError}>
          <Svg iconName="error"/>
          {priorityError}
        </div>}
      </div>
      <div className={styles.gasLimitSettings}>
        <div className={styles.labelInputWrapper}>
          <label>Gas Limit</label>
          <div className={styles.inputWrapper}>
            <input
              className={clsx(styles.gasLimitInput, !isEditing && styles.disabled, gasLimitWarning && styles.warning)}
              id="gasLimit"
              type="text"
              placeholder="Gas limit"
              value={isEditing
                ? unsavedGasLimit
                : gasLimit
              }
              onFocus={() => setEditing(true)}
              onChange={(e) => setUnsavedGasLimit(e.target.value)}
              ref={gasLimitRef}
            />
            <div className={styles.inputRightButtons}>
              {!isEditing
                ? <button onClick={() => {
                  setEditing(true);
                  if (gasLimitRef.current) {
                    gasLimitRef.current.focus();
                  }
                }} className={styles.editButton}>
                  <Svg iconName="edit"/>
                </button>
                : <div className={styles.saveCancelButtons}>
                  <button onClick={onCancel} className={styles.cancelButton}>
                    Cancel
                  </button>
                  <button onClick={onSave} className={styles.saveButton}>
                    Save
                  </button>
                </div>}
            </div>
          </div>
          <div className={styles.helperText}>
            <button onClick={() => {
              setGasLimit(estimatedGasLimit.toString());
            }} disabled={!isEditing} className={styles.textButton}>Estimated:
            </button>
            {" "}
            {estimatedGasLimit}
          </div>
          {gasLimitWarning && <div className={styles.feeWarning}>
            <Svg iconName="warning"/>
            {gasLimitWarning}
          </div>}
        </div>
      </div>
    </div>
  </Dialog>;
}
