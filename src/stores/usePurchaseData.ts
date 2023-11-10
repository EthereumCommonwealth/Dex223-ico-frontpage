import { create } from "zustand";
import { testTokensToPayWith, TokenInfo } from "@/constants/tokens";

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
  pickedTokenId: testTokensToPayWith[0].id,
  amountToPay: "",

  setPickedTokenId: (id) => set({ pickedTokenId: id }),
  setAmountToPay: (amount) => set({ amountToPay: amount }),
  computed: {
    get pickedToken() {
      const pt = testTokensToPayWith.find((token) => token.id === get().pickedTokenId);
      if (!pt) {
        return testTokensToPayWith[0];
      }
      return pt;
    }
  }
}));
