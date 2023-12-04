import React from "react";
import styles from "./TokenPicker.module.scss";
import clsx from "clsx";
import { tokensToPayWith } from "@/constants/tokens";
import Image from "next/image";
import { usePurchaseData } from "@/stores/usePurchaseData";

export default function TokenPicker() {
  const { pickedTokenId, setPickedTokenId } = usePurchaseData((state) => ({
    pickedTokenId: state.pickedTokenId,
    setPickedTokenId: state.setPickedTokenId
  }));


  return <div className={clsx(styles.tokenCards)}>
    {tokensToPayWith.map((token) => {
      return <button disabled={token.id === 1} key={token.id} onClick={() => setPickedTokenId(token.id)}
                     className={clsx(styles.tokenPickButton, pickedTokenId === token.id && styles.active)}>
        <div className={styles.tokenImage}>
          <Image layout='fill' objectFit='contain' src={token.image} alt=""/>
        </div>
        <span>{token.symbol}</span>
        <div className={styles.broken}>
          We detected a problem with a price oracle
        </div>
      </button>
    })}
  </div>;
}
