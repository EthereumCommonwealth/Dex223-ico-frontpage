import { create } from "zustand";

type ConfirmInWalletDialogStore = {
  isOpened: boolean,
  setIsOpened: (isOpened: boolean) => void
}

export const useConfirmInWalletDialogStore = create<ConfirmInWalletDialogStore>()((set, get) => ({
  isOpened: false,
  setIsOpened: (isOpened) => set({isOpened}),
}));
