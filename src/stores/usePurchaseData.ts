import { create } from "zustand";
import { TokenInfo, tokensToPayWith } from "@/constants/tokens";

interface IPurchaseData {
  pickedTokenId: number,
  setPickedTokenId: (id: number) => void,
  amountToPay: string,
  setAmountToPay: (amount: string) => void,
  computed: {
    pickedToken: TokenInfo
  }
}

export const usePurchaseData = create<IPurchaseData>((set, get) => ({
  pickedTokenId: tokensToPayWith[0].id,
  amountToPay: "",

  setPickedTokenId: (id) => set({ pickedTokenId: id }),
  setAmountToPay: (amount) => set({ amountToPay: amount }),
  computed: {
    get pickedToken() {
      const pt = tokensToPayWith.find((token) => token.id === get().pickedTokenId);
      if (!pt) {
        return tokensToPayWith[0];
      }
      return pt;
    }
  }
}));
