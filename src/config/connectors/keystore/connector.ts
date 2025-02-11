import { ConnectorNotConnectedError, createConnector } from "@wagmi/core";
import {
  Address,
  createWalletClient,
  fallback,
  fromHex,
  getAddress,
  http,
  WalletClient,
  webSocket,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

import { ChainId } from "@/config/types/ChainId";

export type KeystoreConnectorParameters = {
  pk: Address;
};

keystore.type = "keystore" as const;

export function keystore({ pk }: KeystoreConnectorParameters) {
  let connected = false;
  let client: WalletClient | undefined;
  let _pk = pk;

  return createConnector<WalletClient>((config) => ({
    id: "keystore",
    name: "Keystore",
    type: keystore.type,
    async setup() {
      //initial setup
    },
    async connect({ chainId }: { chainId: ChainId }) {
      const provider: WalletClient = await this.getProvider({ chainId });

      try {
        const accounts = await provider.getAddresses();
        const currentChainId = await provider.getChainId();

        connected = true;

        console.log("onConnect");
        console.log(accounts, currentChainId);
        return { accounts, chainId: currentChainId };
      } catch (e) {
        console.log(e);
        return { accounts: [], chainId: 1 };
      }
    },
    async disconnect() {
      connected = false;
    },
    async getAccounts() {
      if (!connected) throw new ConnectorNotConnectedError();
      const provider = await this.getProvider();
      console.log("Provider in get acc");
      console.log(provider);

      const accounts = await provider.request({ method: "eth_accounts" });
      return accounts.map((x: any) => getAddress(x));
    },
    async getChainId() {
      const provider = await this.getProvider();
      const hexChainId = await provider.request({ method: "eth_chainId" });
      console.log("Is there any? ");
      console.log(hexChainId);

      return fromHex(hexChainId, "number");
    },
    async isAuthorized() {
      if (!connected) return false;
      const accounts = await this.getAccounts();
      return !!accounts.length;
    },
    async switchChain({ chainId }) {
      config.emitter.emit("change", { chainId });
      const chain = config.chains.find((x) => x.id === chainId);

      return chain!;
    },
    onAccountsChanged(accounts) {},
    onChainChanged(chain) {},
    async onDisconnect(_error) {},
    async getProvider(params: { chainId?: number }) {
      if (!client) {
        const account = privateKeyToAccount(_pk);
        const chain = config.chains.find((x) => x.id === params.chainId) || config.chains[0];

        client = createWalletClient({
          account,
          chain,
          transport: http(),
        });
      }
      return client;
    },
    async getClient(params: { chainId?: number }) {
      if (!client) {
        const account = privateKeyToAccount(_pk);
        const chain = config.chains.find((x) => x.id === params.chainId) || config.chains[0];

        client = createWalletClient({
          account,
          chain,
          transport: http(),
        });
      }
      return client;
    },
  }));
}
