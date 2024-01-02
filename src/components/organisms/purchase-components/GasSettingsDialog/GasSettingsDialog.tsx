import React, { useCallback, useRef } from "react";
import styles from "./GasSettingsDialog.module.scss";
import {
  useTransactionGasFee,
  useTransactionGasLimit, useTransactionGasPrice,
  useTransactionPriorityFee,
  useTransactionTypeStore
} from "@/stores/useGasSettings";
import clsx from "clsx";
import Input from "@/components/atoms/Input";
import Svg from "@/components/atoms/Svg";
import DialogHeader from "@/components/atoms/DialogHeader";
import { parseEther } from "viem";
import { NumericFormat } from "react-number-format";
import Tooltip from "@/components/atoms/Tooltip";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { addBigIntPercent } from "@/functions/addBigIntPercent";
import AlertMessage from "@/components/atoms/AlertMessage";;
import DrawerDialog from "@/components/atoms/DrawerDialog";

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
    computed: computedBaseFee,
    setFocused: setFeeFocused
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
    computed: computedGasPrice,
    setFocused: setPriceFocused
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
      setMaxFeePerGas(addBigIntPercent(baseFee, 10));
      setMaxPriorityFeePerGas(basePriority);
    }
    if (type === "legacy") {
      setGasPrice(baseGasPrice + parseEther("2", "gwei"));
    }

    setGasLimit(estimatedGasLimit);
    setUnsavedGasLimit(estimatedGasLimit);
    setEditing(false);

    showMessage("Gas settings have been configured!");
  }, [baseFee, baseGasPrice, basePriority, estimatedGasLimit, setEditing, setGasLimit, setGasPrice, setMaxFeePerGas, setMaxPriorityFeePerGas, setUnsavedGasLimit, showMessage, type]);

  console.log("MAX FEE");
  console.log(computedBaseFee.maxFeePerGas);

  return <DrawerDialog isOpen={isOpen} onClose={onClose}>
    <div className={styles.dialog}>
      <DialogHeader
        title="Network fee"
        onClose={onClose}
        paragraph={<span>Network fee is paid when you submit a transaction. We recommend changing Priority
        Fee only in order to make transaction cheaper or speed it up at a cost of paying higher fee.
        There are two types of transactions in Ethereum: EIP-1559 and Legacy. Network Fee = gasLimit *
         (Base Fee + Priority Fee) for EIP-1559 transactions. Network Fee = gasLimit * gasPrice for
         Legacy transactions. <span className="desktop">We recommend using EIP-1559 transactions on any chain except BSC.
          BSC does not support EIP-1559 transactions so use Legacy there.</span></span>}
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
              <Tooltip text="gasPrice is used to calculate the transaction fee. Increasing the value of gasPrice will result in higher transaction cost but will get your transaction submit faster. Reducing gasPrice will decrease the cost of your transaction but it may take longer to submit. Setting gasPrice to a very low value may make your transaction never submit."/>
            </label>
            <div className={styles.inputWrapper}>
              <NumericFormat
                inputMode="decimal"
                style={{ paddingRight: 68 }}
                onValueChange={values => setGasPrice(parseEther(values.value, "gwei"))}
                value={computedGasPrice.gasPrice}
                id="gasPrice"
                type="text"
                placeholder="Gas price"
                customInput={Input}
                error={Boolean(gasPriceValidation.error)}
                warning={Boolean(gasPriceValidation.warning)}
                onFocus={() => setPriceFocused(true)}
                onBlur={() => setPriceFocused(false)}
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
                  <Tooltip text="Base Fee is fixed and depends on the load of the network. We don't recommend changing this unless you absolutely know what you're doing" />
                </label>
                <div className={styles.inputWrapper}>
                  <NumericFormat
                    inputMode="decimal"
                    style={{ paddingRight: 68 }}
                    onValueChange={values => setMaxFeePerGas(parseEther(values.value, "gwei"))}
                    value={computedBaseFee.maxFeePerGas}
                    id="maxFeePerGas"
                    type="text"
                    placeholder="Base fee"
                    customInput={Input}
                    error={Boolean(gasFeeValidation.error)}
                    warning={Boolean(gasFeeValidation.warning)}
                    onFocus={() => setFeeFocused(true)}
                    onBlur={() => setFeeFocused(false)}
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
                  <Tooltip text="Priority Fee is paid to the node that will include your transaction in the next block. Increasing the value of Priority Fee will result in higher transaction cost but will get your transaction submit faster. Reducing Priority Fee will decrease the cost of your transaction but it may take longer to submit."/>
                </label>
                <div className={styles.inputWrapper}>
                  <NumericFormat
                    inputMode="decimal"
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
            {gasFeeValidation.error && <AlertMessage text={gasFeeValidation.error} severity="error" />}
            {[gasFeeValidation.warning, priorityFeeValidation.warning].map((warning) => {
              if (warning) {
                return <AlertMessage key={warning} text={warning} severity="warning" />
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
            <Tooltip text="gasLimit is a measure of actions that a contract can perform in your transaction. Setting gasLimit to a low value may result in your transaction not being able to perform the necessary actions (i.e. purchase tokens) and fail. We don't recommend changing this unless you absolutely know what you're doing."/>
          </label>
          <div className={styles.inputWrapper}>
            <NumericFormat
              inputMode="decimal"
              className={clsx(styles.gasLimitInput, !isEditing && styles.disabled, gasLimitValidation.warning && styles.warning, gasLimitValidation.error && styles.error)}
              placeholder="Gas limit"
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
            }} disabled={!isEditing} className={styles.textButton}>Recommended:
            </button>
            {" "}
            {estimatedGasLimit.toString()}
          </div>
          {gasLimitValidation.warning && <AlertMessage text={gasLimitValidation.warning} severity="warning" />}
          {gasLimitValidation.error && <AlertMessage text={gasLimitValidation.error} severity="error" />}
        </div>
      </div>
    </div>
  </DrawerDialog>;
}
