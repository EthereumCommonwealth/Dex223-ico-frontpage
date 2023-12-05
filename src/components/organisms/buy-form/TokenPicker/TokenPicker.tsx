import React, { useMemo } from "react";
import styles from "./TokenPicker.module.scss";
import clsx from "clsx";
import { tokensToPayWith, tokensToPayWithPreSale } from "@/constants/tokens";
import Image from "next/image";
import { usePurchaseData } from "@/stores/usePurchaseData";

export default function TokenPicker({presale}) {
  const { pickedTokenId, setPickedTokenId } = usePurchaseData((state) => ({
    pickedTokenId: state.pickedTokenId,
    setPickedTokenId: state.setPickedTokenId
  }));

  const tokens = useMemo(() => {
    return presale ? tokensToPayWithPreSale : tokensToPayWith;
  }, [presale]);

  return <div className={clsx(styles.tokenCards, presale && styles.presale)}>
    {tokens.map((token) => {
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
