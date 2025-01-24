import { http } from "viem";
import { createConfig, createStorage, parseCookie } from "wagmi";
import { metaMask, walletConnect } from "wagmi/connectors";

import { mainnet } from "@/config/chains/mainnet";

const cookieStorage = {
  getItem(key: string) {
    if (typeof window === "undefined") return null;
    const value = parseCookie(document.cookie, key);
    return value ?? null;
  },
  setItem(key: string, value: string) {
    if (typeof window === "undefined") return;
    document.cookie = `${key}=${value};path=/;samesite=Lax`;
  },
  removeItem(key: string) {
    if (typeof window === "undefined") return;
    document.cookie = `${key}=;path=/;max-age=-1`;
  },
};

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    walletConnect({
      projectId: "109bdaa543046acc8c6a4d3d5310af12",
    }),
    // coinbaseWallet({
    //   appName: "DEX223",
    //   appLogoUrl: "https://test-app.dex223.io/tokens/DEX.svg",
    // }),
    metaMask({
      dappMetadata: {
        name: "dex223.io",
        url: "https://app.dex223.io",
      },
      useDeeplink: true,
    }),
    // injected({
    //   target: "trust",
    // }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  multiInjectedProviderDiscovery: false, // to avoid connecting to io.metamask and other injected connectors
  transports: {
    [mainnet.id]: http(),
  },
});
