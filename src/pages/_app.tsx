import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {golos_text} from "../assets/fonts";
import {mainnet, bsc} from "wagmi/chains";
import {Chain, configureChains, createConfig, WagmiConfig} from "wagmi";
import {EthereumClient, w3mConnectors, w3mProvider} from "@web3modal/ethereum";
import { publicProvider } from 'wagmi/providers/public';
import {Web3Modal} from "@web3modal/react";
import {callisto} from "../constants/chains/clo";

const projectId = "b426036634aca8d1f9795404b66664b5";

const chains = [callisto];

const { publicClient } = configureChains(chains, [
  w3mProvider({projectId}),
  publicProvider()
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({projectId, chains}),
  publicClient
});

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export default function App({ Component, pageProps }: AppProps) {
  return <div className={golos_text.className}>
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </div>
}
