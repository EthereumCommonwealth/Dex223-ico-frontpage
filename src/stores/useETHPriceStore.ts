import { create } from "zustand";

type ETHPriceStore = {
  price: number,
  setPrice: (price: number) => void
}

const defaultPrice = 2028;
export const useETHPriceStore = create<ETHPriceStore>()((set, get) => ({
  price: defaultPrice,
  setPrice: (price: number) => set({price}),
}));
