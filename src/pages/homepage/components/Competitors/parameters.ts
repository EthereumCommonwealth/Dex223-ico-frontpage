type Parameters = {
  supportedStandards: string,
  deploymentChain: string,
  listingProcess: string,
  marginTrading: string,
  markets: string,
}

const parametersLabels: Parameters = {
  supportedStandards: "Supported standards",
  deploymentChain: "Deployment chain",
  listingProcess: "Listing process",
  marginTrading: "Margin trading",
  markets: "Markets",
}

const Dex223Params: Parameters = {
  supportedStandards: "ERC-20, ERC-223",
  deploymentChain: "Ethereum, EOS EVM,ETC, Polygon, Arbitrum, Optimism, Avalanche, Celo, Base, BSC",
  listingProcess: "Smart-contract, tokenlists",
  marginTrading: "Encapsultatted margin trading",
  markets: "Unlimited",
}

const uniswapParams: Parameters = {
  supportedStandards: "ERC-20",
  deploymentChain: "Ethereum, Polygon, Arbitrum, Optimism, Avalanche, Celo, Base",
  listingProcess: "Tokenlists",
  marginTrading: "No",
  markets: "Unlimited",
}

const dydxParams: Parameters = {
  supportedStandards: "ERC-20",
  deploymentChain: "Ethereum, Custom L2 chain",
  listingProcess: "Centralized",
  marginTrading: "Leverage up to 20x",
  markets: "56 pairs",
}

const kineParams: Parameters = {
  supportedStandards: "ERC-20",
  deploymentChain: "Ethereum, BSC",
  listingProcess: "Centralized",
  marginTrading: "Leverage up to 200x",
  markets: "21 pairs",
}

const curveParams: Parameters = {
  supportedStandards: "ERC-20",
  deploymentChain: "Ethereum, Polygon, Arbitrum, Optimism, Avalanche, Celo, Base and 4 other",
  listingProcess: "Centralized",
  marginTrading: "No",
  markets: "156 pairs",
}

const standardsRow: string[] = [
  parametersLabels.supportedStandards,
  Dex223Params.supportedStandards,
  uniswapParams.supportedStandards,
  dydxParams.supportedStandards,
  kineParams.supportedStandards,
  curveParams.supportedStandards
];

const chainsRow: string[] = [
  parametersLabels.deploymentChain,
  Dex223Params.deploymentChain,
  uniswapParams.deploymentChain,
  dydxParams.deploymentChain,
  kineParams.deploymentChain,
  curveParams.deploymentChain
];

const listingProcessRow: string[] = [
  parametersLabels.listingProcess,
  Dex223Params.listingProcess,
  uniswapParams.listingProcess,
  dydxParams.listingProcess,
  kineParams.listingProcess,
  curveParams.listingProcess
];

const marginTradingRow: string[] = [
  parametersLabels.marginTrading,
  Dex223Params.marginTrading,
  uniswapParams.marginTrading,
  dydxParams.marginTrading,
  kineParams.marginTrading,
  curveParams.marginTrading
];

const marketsRow: string[] = [
  parametersLabels.markets,
  Dex223Params.markets,
  uniswapParams.markets,
  dydxParams.markets,
  kineParams.markets,
  curveParams.markets
];

export const comparativeTableData = [
  standardsRow,
  chainsRow,
  listingProcessRow,
  marginTradingRow,
  marketsRow
]
