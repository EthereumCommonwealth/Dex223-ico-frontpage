import React, { useCallback, useRef } from "react";
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
import DialogHeader from "@/components/atoms/DialogHeader";
import { parseEther } from "viem";
import { NumericFormat } from "react-number-format";
import Tooltip from "@/components/atoms/Tooltip";
import Button from "@/components/atoms/Button";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { addBigIntPercent } from "@/functions/addBigIntPercent";

interface Props {
  isOpen: boolean,
  onClose: any
}

export default function GasSettingsDialog({ isOpen, onClose }: Props) {
  const {
    type,
    setDefaultType,
    setLegacyType
  } = useTransactionTypeStore();

  const {
    baseFee,
    setMaxFeePerGas,
    validation: gasFeeValidation,
    computed: computedBaseFee
  } = useTransactionGasFee();

  const {
    basePriority,
    setMaxPriorityFeePerGas,
    validation: priorityFeeValidation,
    computed: computedPriority
  } = useTransactionPriorityFee();

  const {
    baseGasPrice,
    setGasPrice,
    validation: gasPriceValidation,
    computed: computedGasPrice
  } = useTransactionGasPrice();

  const {
    gasLimit,
    unsavedGasLimit,
    isEditing,
    estimatedGasLimit,

    setEditing,
    setGasLimit,
    setUnsavedGasLimit,
    onSave,
    onCancel,
    resetUnsaved,
    validation: gasLimitValidation,
  } = useTransactionGasLimit();

  const gasLimitRef = useRef<HTMLInputElement | null>(null);

  const { showMessage } = useSnackbar();

  const handleReset = useCallback(() => {
    if (type === "default") {
      setMaxFeePerGas(addBigIntPercent(baseFee, 20));
      setMaxPriorityFeePerGas(addBigIntPercent(basePriority, 50));
    }
    if (type === "legacy") {
      setGasPrice(addBigIntPercent(baseGasPrice, 20));
    }

    setGasLimit(addBigIntPercent(estimatedGasLimit, 20));
    setUnsavedGasLimit(addBigIntPercent(estimatedGasLimit, 20));
    setEditing(false);

    showMessage("Gas settings have been configured!");
  }, [
    baseFee,
    baseGasPrice,
    basePriority,
    estimatedGasLimit,
    setEditing,
    setGasLimit,
    setGasPrice,
    setMaxFeePerGas,
    setMaxPriorityFeePerGas,
    setUnsavedGasLimit,
    showMessage,
    type
  ]);

  return <Dialog isOpen={isOpen} onClose={onClose}>
    <div className={styles.dialog}>
      <DialogHeader
        title="Network fee"
        onClose={onClose}
        paragraph="Network fee is paid when you submit a transaction. We recommend changing Priority
        Fee only in order to make transaction cheaper or speed it up at a cost of paying higher fee.
        There are two types of transactions in Ethereum: EIP-1559 and Legacy. Network Fee = gasLimit *
         (Base Fee + Priority Fee) for EIP-1559 transactions. Network Fee = gasLimit * gasPrice for
         Legacy transactions. We recommend using EIP-1559 transactions on any chain except BSC.
          BSC does not support EIP-1559 transactions so use Legacy there."
      />
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
            <label>
              Gas price
              <Tooltip text="Tesxt for gas price"/>
            </label>
            <div className={styles.inputWrapper}>
              <NumericFormat
                style={{ paddingRight: 68 }}
                onValueChange={values => setGasPrice(parseEther(values.value, "gwei"))}
                value={computedGasPrice.gasPrice}
                id="gasPrice"
                type="text"
                placeholder="Gas price"
                customInput={Input}
                error={Boolean(gasPriceValidation.error)}
                warning={Boolean(gasPriceValidation.warning)}
              />
              <span className={styles.inputRightContent}>Gwei</span>
            </div>
            <div className={styles.helperText}>
              <button onClick={() => {
                setGasPrice(baseGasPrice);
              }} className={styles.textButton}>Current
              </button>
              {" "}
              {computedGasPrice.baseGasPrice} Gwei
            </div>
          </div>
        </>}
        {type === "default" &&
          <>
            <div className={styles.inputs}>
              <div className={styles.labelInputWrapper}>
                <label>
                  Base fee
                  <Tooltip text="Tesxt for base fee"/>
                </label>
                <div className={styles.inputWrapper}>
                  <NumericFormat
                    style={{ paddingRight: 68 }}
                    onValueChange={values => setMaxFeePerGas(parseEther(values.value, "gwei"))}
                    value={computedBaseFee.maxFeePerGas}
                    id="maxFeePerGas"
                    type="text"
                    placeholder="Base fee"
                    customInput={Input}
                    error={Boolean(gasFeeValidation.error)}
                    warning={Boolean(gasFeeValidation.warning)}
                  />
                  <span className={styles.inputRightContent}>Gwei</span>
                </div>
                <div className={styles.helperText}>
                  <button onClick={() => {
                    setMaxFeePerGas(baseFee);
                  }} className={styles.textButton}>Current
                  </button>
                  {" "}
                  {computedBaseFee.baseFee} Gwei
                </div>
              </div>
              <div className={styles.labelInputWrapper}>
                <label>
                  Priority fee
                  <Tooltip text="Tesxt for priority"/>
                </label>
                <div className={styles.inputWrapper}>
                  <NumericFormat
                    style={{ paddingRight: 68 }}
                    onValueChange={values => setMaxPriorityFeePerGas(parseEther(values.value, "gwei"))}
                    value={computedPriority.maxPriorityFeePerGas}
                    id="minerFee"
                    type="text"
                    placeholder="Miner fee"
                    customInput={Input}
                    warning={Boolean(priorityFeeValidation.warning)}
                  />
                  <span className={styles.inputRightContent}>Gwei</span>
                </div>
                <div className={styles.helperText}>
                  <button onClick={() => {
                    setMaxPriorityFeePerGas(basePriority);
                  }} className={styles.textButton}>Current
                  </button>
                  {" "}
                  {computedPriority.basePriority} Gwei
                </div>
              </div>
            </div>
            {gasFeeValidation.error && <div className={styles.feeError}>
              <Svg iconName="error"/>
              {gasFeeValidation.error}
            </div>}
            {[gasFeeValidation.warning, priorityFeeValidation.warning].map((warning) => {
              if (warning) {
                return <div key={warning} className={styles.feeWarning}>
                  <Svg iconName="warning"/>
                  {warning}
                </div>
              }
            })}
          </>}
        <button onClick={handleReset} className={styles.configureButton}>
          Configure Automatically
          <Svg iconName="auto-config"/>
        </button>
      </div>
      <div className={styles.gasLimitSettings}>
        <div className={styles.labelInputWrapper}>
          <label>
            Gas Limit
            <Tooltip text="Tesxt for gas limit"/>
          </label>
          <div className={styles.inputWrapper}>
            <NumericFormat
              className={clsx(styles.gasLimitInput, !isEditing && styles.disabled, gasLimitValidation.warning && styles.warning, gasLimitValidation.error && styles.error)}
              placeholder="Gas limit"
              // readOnly={readonly}
              onValueChange={(values) => setUnsavedGasLimit(BigInt(values.value))}
              type="text"
              value={isEditing
                ? unsavedGasLimit.toString()
                : gasLimit.toString()
              }
              onFocus={() => setEditing(true)}
              getInputRef={gasLimitRef}
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
              resetUnsaved();
            }} disabled={!isEditing} className={styles.textButton}>Estimated:
            </button>
            {" "}
            {estimatedGasLimit.toString()}
          </div>
          {gasLimitValidation.warning && <div className={styles.feeWarning}>
            <Svg iconName="warning"/>
            {gasLimitValidation.warning}
          </div>}
          {gasLimitValidation.error && <div className={styles.feeWarning}>
            <Svg iconName="error"/>
            {gasLimitValidation.error}
          </div>}
        </div>
      </div>
    </div>
  </Dialog>;
}
