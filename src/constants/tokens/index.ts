import { callisto } from "@/constants/chains/callisto";
import { mainnet } from "wagmi";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

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
  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  symbol: "USDT",
  chainId: 1,
  decimals: 6
}

export const DAI: TokenInfo = {
  id: 3,
  image: "/images/tokens/DAI.svg",
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  symbol: "DAI",
  chainId: 1,
  decimals: 18
}

export const USDC: TokenInfo = {
  id: 4,
  image: "/images/tokens/USDC.svg",
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  symbol: "USDC",
  chainId: 1,
  decimals: 6
}

export const PROD_DEX223: TokenInfo = {
  id: 5,
  image: "/images/tokens/D223.svg",
  address: "0xcCe968120e6Ded56F32fbfe5A2Ec06CBF1e7c8ED",
  symbol: "D223",
  chainId: 1,
  decimals: 18
}

export const TEST_DEX223: TokenInfo = {
  id: 5,
  image: "/images/tokens/D223.svg",
  address: "0x9f519E60Fe7d9B4078AD77d3C2831A055C87A79B",
  symbol: "D223",
  chainId: 1,
  decimals: 18
}

export const CLO: TokenInfo = {
  id: 11,
  image: "/images/tokens/CLO.svg",
  address: "0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a",
  symbol: "CLO",
  chainId: 820,
  decimals: 18
}

export const BUSDT: TokenInfo = {
  id: 12,
  image: "/images/tokens/BUSDT.svg",
  address: "0xbf6c50889d3a620eb42C0F188b65aDe90De958c4",
  symbol: "BUSDT",
  chainId: 820,
  decimals: 18
}

const devMode = false;

const PRODUCTION_TOKENS = [ETH, USDT, DAI, USDC];
const PRE_SALE_TOKENS = [USDT, USDC];
const TEST_TOKENS = [CLO, BUSDT];

const PRODUCTION_ICO_ADDRESS = "0x66bbbc0698fd3ac3c1f8bf6e2a550d3775a68879";
const PRODUCTION_ICO_ADDRESS_PRE_SALE = "0x9eb11e62bA74366C5AAAA7eEc850FC31E7a3aCf1";
const TEST_ICO_ADDRESS = "0x2909348851A89beD89508fBd4f87CA82A42780d0";
// TEST DATA

export const tokensToPayWith = devMode ? TEST_TOKENS : PRODUCTION_TOKENS;
export const tokensToPayWithPreSale = PRE_SALE_TOKENS;
export const ICOContractAddressETH: `0x${string}` = devMode ? TEST_ICO_ADDRESS : PRODUCTION_ICO_ADDRESS;
export const ICOContractAddressETHPreSale = PRODUCTION_ICO_ADDRESS_PRE_SALE;
export const DEX223 = devMode ? TEST_DEX223 : PROD_DEX223;
export const chainToConnect = devMode ? callisto : mainnet;
export const chainsToConnect = [chainToConnect];
