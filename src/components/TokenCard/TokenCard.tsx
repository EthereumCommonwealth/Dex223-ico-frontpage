import React from "react";
import styles from "./TokenCard.module.scss";
import Image from "next/image";
import clsx from "clsx";
import {TokenBalance} from "@safe-global/safe-apps-sdk";
import {FetchBalanceResult} from "@wagmi/core";
import Text from "../Text";
import Spacer from "../Spacer";

interface Props {
  type: "pay" | "receive",
  tokenName: string,
  tokenLogo: string,
  amount: string,
  handleChange: any,
  readonly?: boolean
  balance: string
}

export default function TokenCard({type, tokenName, tokenLogo, amount, handleChange, readonly = false, balance = ""}: Props) {
  return <>
    <div className={styles.tokenCard}>
    <div className={styles.inputWrapper}>
      <h2>{type === "pay" ? `Amount in ${tokenName} you pay` : `Amount in ${tokenName} you receive`}</h2>
      <input placeholder={"0"} className={clsx(styles.input)} type="text" value={amount} onChange={handleChange} readOnly={readonly} />
    </div>
    <Image width={52} height={52} src={tokenLogo} alt="" />

  </div>
    <Spacer height={4} />
    <Text color="secondary" align="right" tag="p" variant={14}>Balance: {balance}</Text>
    </>;
}
