import { useETHPriceStore } from "@/stores/useETHPriceStore";
import { useCallback, useEffect } from "react";
import { IIFE } from "@/functions/iife";

const API_URL = "https://api-data.absolutewallet.com/api/v1/currencies/minimal/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2?fiat=USD";
export default function useETHPrice() {
  const { price, setPrice } = useETHPriceStore();

  useEffect(() => {
    async function updatePrice() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.price) {
          setPrice(+data.price);
        }
      } catch (e) {
        console.log(e);
      }
    }

    updatePrice();

    const i = setInterval(() => {
      updatePrice();
    }, 60 * 1000);

    return () => {
      clearInterval(i);
    }
  }, [setPrice]);

  const getPriceForETH = useCallback((amount: number) => {
    return (amount * price).toFixed(1);
  }, [price]);

  return { getPriceForETH };
}
