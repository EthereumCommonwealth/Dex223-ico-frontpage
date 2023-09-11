
type Parameters = {
  supportedStandards: string,
  deploymentChain: string,
  listingProcess:string,
  marginTrading: string,
  markets: string,
}

export const parametersKeys = [
  "supportedStandards",
  "deploymentChain",
  "listingProcess",
  "marginTrading",
  "markets"
];

export const parametersLabels = {
  supportedStandards: "Supported standards",
  deploymentChain: "Deployment chain",
  listingProcess: "Listing process",
  marginTrading: "Margin trading",
  markets: "Markets",
}

export const Dex223Params: Parameters = {
  supportedStandards: "ERC-20, ERC-223",
  deploymentChain: "Ethereum, EOS EVM,ETC, Polygon, Arbitrum, Optimism, Avalanche, Celo, Base, BSC",
  listingProcess: "Smart-contract, tokenlists",
  marginTrading: "Encapsultatted margin trading",
  markets: "Unlimited",
}

export const uniswapParams: Parameters = {
  supportedStandards: "ERC-20",
  deploymentChain: "Ethereum, Polygon, Arbitrum, Optimism, Avalanche, Celo, Base",
  listingProcess: "Tokenlists",
  marginTrading: "No",
  markets: "Unlimited",
}

export const dydxParams: Parameters = {
  supportedStandards: "ERC-20",
  deploymentChain: "Ethereum, Custom L2 chain",
  listingProcess: "Centralized",
  marginTrading: "Leverage up to 20x",
  markets: "56 pairs",
}

export const kineParams: Parameters = {
  supportedStandards: "ERC-20",
  deploymentChain: "Ethereum, BSC",
  listingProcess: "Centralized",
  marginTrading: "Leverage up to 200x",
  markets: "21 pairs",
}

export const curveParams: Parameters = {
  supportedStandards: "ERC-20",
  deploymentChain: "Ethereum, Polygon, Arbitrum, Optimism, Avalanche, Celo, Base and 4 other",
  listingProcess: "Centralized",
  marginTrading: "No",
  markets: "156 pairs",
}

export const oneInchParams: Parameters = {
  supportedStandards: "Supported standards",
  deploymentChain: "Deployment chain",
  listingProcess: "Listing process",
  marginTrading: "Margin trading",
  markets: "Markets",
}

export const pancakeParams: Parameters = {
  supportedStandards: "Supported standards",
  deploymentChain: "Deployment chain",
  listingProcess: "Listing process",
  marginTrading: "Margin trading",
  markets: "Markets",
}


