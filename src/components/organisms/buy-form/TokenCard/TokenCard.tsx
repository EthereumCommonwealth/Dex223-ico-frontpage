import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { NumericFormat } from "react-number-format";

import TokenPicker from "@/components/organisms/buy-form/TokenPicker";

import Spacer from "../../../atoms/Spacer";
import styles from "./TokenCard.module.scss";

interface Props {
  type: "pay" | "receive";
  tokenName: string;
  tokenLogo: string;
  amount: string;
  handleChange: any;
  readonly?: boolean;
  balance: string;
  withPicker?: boolean;
  presale?: boolean;
}

export default function TokenCard({
  type,
  tokenName,
  tokenLogo,
  amount,
  handleChange,
  readonly = false,
  balance = "",
  presale = false,
  withPicker = false,
}: Props) {
  return (
    <>
      {withPicker && <TokenPicker presale={presale} />}
      <div className={clsx(styles.tokenCard, withPicker && styles.withPicker)}>
        <div className={styles.inputWrapper}>
          <h2>
            {type === "pay" ? (
              <span>
                Amount in <span className="bold">{tokenName}</span> you pay
              </span>
            ) : (
              <span>
                Amount in <span className="bold">{tokenName}</span> you receive
              </span>
            )}
          </h2>
          <NumericFormat
            inputMode="decimal"
            onValueChange={(values) => handleChange(values.value)}
            placeholder={"0"}
            className={clsx(styles.input)}
            readOnly={readonly}
            type="text"
            value={amount}
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image layout="fill" objectFit="contain" src={tokenLogo} alt="" />
        </div>
      </div>
      <Spacer height={4} />
      {Boolean(balance) ? (
        <p className={styles.balance}>Balance: {balance}</p>
      ) : (
        <div className={styles.balancePlaceholder} />
      )}
    </>
  );
}
