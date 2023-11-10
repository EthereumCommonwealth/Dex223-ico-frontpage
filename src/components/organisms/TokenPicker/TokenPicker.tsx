import React from "react";
import styles from "./TokenPicker.module.scss";
import clsx from "clsx";
import { getTokensToPayWith } from "@/constants/tokens";
import Image from "next/image";
import { usePurchaseData } from "@/stores/usePurchaseData";

export default function TokenPicker({ devMode }) {
  const { pickedTokenId, setPickedTokenId } = usePurchaseData((state) => ({
    pickedTokenId: state.pickedTokenId,
    setPickedTokenId: state.setPickedTokenId
  }));

  return <div className={clsx(styles.tokenCards, devMode && styles.dev)}>
    {getTokensToPayWith(devMode).map((token) => {
      return <button key={token.id} onClick={() => setPickedTokenId(token.id)}
                     className={clsx(styles.tokenPickButton, pickedTokenId === token.id && styles.active)}>
        <div className={styles.tokenImage}>
          <Image layout='fill' objectFit='contain' src={token.image} alt=""/>
        </div>
        {token.symbol}
      </button>
    })}
  </div>;
}
