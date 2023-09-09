import React from "react";
import styles from "./TokenCard.module.scss";
import Image from "next/image";
import clsx from "clsx";
import Spacer from "../../atoms/Spacer";

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
      <h2>{type === "pay" ? <span>Amount in <span className="bold">{tokenName}</span> you pay</span> : <span>Amount in <span className="bold">{tokenName}</span> you receive</span>}</h2>
      <input placeholder={"0"} className={clsx(styles.input)} type="text" value={amount} onChange={handleChange} readOnly={readonly} />
    </div>
    <div className={styles.imageWrapper}><Image layout="fill" objectFit="contain" src={tokenLogo} alt="" /></div>

  </div>
    <Spacer height={4} />
    {Boolean(balance) ? <p className={styles.balance}>Balance: {balance}</p> : <div className={styles.balancePlaceholder} />}
    </>;
}
