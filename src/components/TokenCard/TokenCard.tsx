import React from "react";
import styles from "./TokenCard.module.scss";
import Image from "next/image";

interface Props {
  type: "pay" | "receive",
  tokenName: string,
  tokenLogo: string,
  amount: string,
  handleChange: any,
  readonly?: boolean
}

export default function TokenCard({type, tokenName, tokenLogo, amount, handleChange, readonly = false}: Props) {
  return <div className={styles.tokenCard}>
    <div className={styles.inputWrapper}>
      <h2>{type === "pay" ? `Amount in ${tokenName} you pay` : `Amount in ${tokenName} you receive`}</h2>
      <input placeholder={"0"} className={styles.input} type="text" value={amount} onChange={handleChange} readOnly={readonly} />
    </div>
    <Image width={52} height={52} src={tokenLogo} alt="" />

  </div>;
}
