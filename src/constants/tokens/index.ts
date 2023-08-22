export type TokenInfo = {
  id: number,
  image: string,
  address: string,
  symbol: string
}

export const ETH: TokenInfo = {
  id: 1,
  image: "/images/tokens/ETH.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "ETH"
}

export const USDT: TokenInfo = {
  id: 2,
  image: "/images/tokens/USDT.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "USDT"
}

export const DAI: TokenInfo = {
  id: 3,
  image: "/images/tokens/DAI.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "DAI"
}

export const USDC: TokenInfo = {
  id: 4,
  image: "/images/tokens/USDC.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "USDC"
}

export const DEX223 = {
  id: 1,
  image: "/images/tokens/DEX223.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "DEX223"
}

export const tokensToPayWith = [ETH, USDT, DAI, USDC];
