import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {golos_text} from "../assets/fonts";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {EthereumClient, w3mConnectors, w3mProvider} from "@web3modal/ethereum";
import {publicProvider} from 'wagmi/providers/public';
import {Web3Modal} from "@web3modal/react";
import {callisto} from "../constants/chains/clo";
import {SnackbarProvider} from "../providers/SnackbarProvider";
import Head from "next/head";

const projectId = "b426036634aca8d1f9795404b66664b5";

const chains = [callisto];

const {publicClient} = configureChains(chains, [
  w3mProvider({projectId}),
  publicProvider()
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({projectId, chains}),
  publicClient
});

const ethereumClient = new EthereumClient(wagmiConfig, chains)

const description = "Next generation decentralized exchange for ERC-223 & ERC-20 tokens with margin trading, 15% cheaper GAS fees and transparent auto-listings for any tokens.";

export default function App({Component, pageProps}: AppProps) {
  return <>
    <Head>
      <title>Dex223: token presale</title>
      <meta name="description"
            content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>

      <meta property="og:type" content="website"/>

      <meta property="og:site_name" content="Dex223"/>
      <meta property="og:title" content="Dex223: token presale"/>
      <meta property="og:url" content="https://www.dex223.io"/>
      <meta property="og:description"
            content={description} />
      <meta property="og:image" content="https://www.dex223.io/social-link.png"/>

      <meta name="twitter:site" content="Dex223"/>
      <meta property="twitter:title" content="Dex223: token presale"/>
      <meta property="twitter:description"
            content={description} />
      <meta name="twitter:image" content="https://www.dex223.io/social-link.png"/>
      <meta name="twitter:image:alt" content="Dex223"/>
      <meta name="twitter:card" content="summary_large_image"/>
    </Head>
    <SnackbarProvider>
      <div className={golos_text.className}>
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
      </div>
    </SnackbarProvider>
  </>
}
