export type TokenInfo = {
  id: number,
  image: string,
  address: `0x${string}`,
  symbol: string,
  chainId: number,
  decimals: number
}

export const ETH: TokenInfo = {
  id: 1,
  image: "/images/tokens/ETH.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "ETH",
  chainId: 1,
  decimals: 18
}

export const USDT: TokenInfo = {
  id: 2,
  image: "/images/tokens/USDT.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "USDT",
  chainId: 1,
  decimals: 6
}

export const DAI: TokenInfo = {
  id: 3,
  image: "/images/tokens/DAI.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "DAI",
  chainId: 1,
  decimals: 18
}

export const USDC: TokenInfo = {
  id: 4,
  image: "/images/tokens/USDC.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "USDC",
  chainId: 1,
  decimals: 18
}

export const DEX223: TokenInfo = {
  id: 5,
  image: "/images/tokens/DEX223.svg",
  address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  symbol: "DEX223",
  chainId: 1,
  decimals: 18
}

export const CLO: TokenInfo = {
  id: 11,
  image: "/images/tokens/CLO.svg",
  address: "0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a",
  symbol: "CLO",
  decimals: 18,
  chainId: 820
}

export const TEST_USDT: TokenInfo = {
  id: 12,
  image: "/images/tokens/USDT.svg",
  address: "0xe3f73915ceC0d1b30724dE01Db04Ee1a1b75019e",
  symbol: "USDT (test)",
  decimals: 6,
  chainId: 820
}

export const TEST_DEX223: TokenInfo = {
  id: 13,
  image: "/images/tokens/DEX.svg",
  address: "0xB7C978aFF8D7d86Ad9c59938A1e368e217BA9392",
  symbol: "DEX223 (test)",
  chainId: 820,
  decimals: 18
}

export const tokensToPayWith = [ETH, USDT, DAI, USDC];

export const testTokensToPayWith = [CLO, TEST_USDT];
