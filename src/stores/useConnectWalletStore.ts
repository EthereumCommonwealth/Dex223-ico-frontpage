import { create } from "zustand";
import { ChainId } from "@/config/types/ChainId";

export type WalletName = "metamask" | "wc" | "keystore";

interface ConnectWalletStore {
  walletName: WalletName;
  setName: (walletName: WalletName) => void;
  chainToConnect: ChainId.MAINNET;
  setChainToConnect: (chain: ChainId) => void;

  wcChainsToConnect: number[]; //for simultaneous connection via walletConnect
  addChainToConnect: (chain: number) => void;
  removeChainToConnect: (chain: number) => void;
}

export const useConnectWalletStore = create<ConnectWalletStore>((set, get) => ({
  walletName: "metamask",
  setName: (walletName) => set({ walletName }),

  chainToConnect: ChainId.MAINNET,
  setChainToConnect: (chainToConnect) => set({ chainToConnect }),

  wcChainsToConnect: [ChainId.MAINNET],
  addChainToConnect: (chain) => {
    const newChainsSet = [...get().wcChainsToConnect, chain];
    return set({ wcChainsToConnect: newChainsSet });
  },
  removeChainToConnect: (chain) => {
    const newChainsSet = [...get().wcChainsToConnect].filter((e) => e !== chain);
    return set({ wcChainsToConnect: newChainsSet });
  },
}));

interface ConnectWalletDialogStateStore {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}
export const useConnectWalletDialogStateStore = create<ConnectWalletDialogStateStore>(
  (set, get) => ({
    isOpened: false,
    setIsOpened: (isOpened) => set({ isOpened }),
  }),
);
