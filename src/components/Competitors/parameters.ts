
type Parameters = {
  supportsERC223: boolean,
  supportsERC20: boolean,
  yieldFarming: boolean,
  swap: boolean,
  nativeToken: boolean,
  supportsEthereum: boolean,
  requiresKYC: boolean,
  lowGasFee: boolean,
  crossChainTrading: boolean,
  decentralized: boolean,
  securityAudits: boolean,
  limitOrders: boolean,
  rewardsProgram: boolean,
  ecosystemIntegration: boolean,
  educationResources: boolean,
  APIAccess: boolean
}

export const parametersKeys = [
  "supportsERC223",
  "supportsERC20",
  "yieldFarming",
  "swap",
  "nativeToken",
  "supportsEthereum",
  "requiresKYC",
  "lowGasFee",
  "crossChainTrading",
  "decentralized",
  "securityAudits",
  "limitOrders",
  "rewardsProgram",
  "ecosystemIntegration",
  "educationResources",
  "APIAccess"
];

export const parametersLabels = {
  supportsERC223: "Supports ERC-223 Tokens",
  supportsERC20: "Supports ERC-20 Tokens",
  yieldFarming: "Offers Yield Farming",
  swap: "Provides Token Swaps",
  nativeToken: "Has a Native Token",
  supportsEthereum: "Supports Ethereum",
  requiresKYC: "Requires KYC",
  lowGasFee: "Low Gas Fees",
  crossChainTrading: "Cross-Chain Trading",
  decentralized: "Decentralized",
  securityAudits: "Security Audits",
  limitOrders: "Limit Orders",
  rewardsProgram: "Rewards Program",
  ecosystemIntegration: "Ecosystem Integration",
  educationResources: "User Education Resources",
  APIAccess: "API Access"
}

export const Dex223Params: Parameters = {
  supportsERC223: true,
  supportsERC20: false,
  yieldFarming: true,
  swap: true,
  nativeToken: true,
  supportsEthereum: true,
  requiresKYC: false,
  lowGasFee: true,
  crossChainTrading: true,
  decentralized: true,
  securityAudits: true,
  limitOrders: true,
  rewardsProgram: true,
  ecosystemIntegration: true,
  educationResources: true,
  APIAccess: true
}

export const oneInchParams: Parameters = {
  supportsERC223: true,
  supportsERC20: false,
  yieldFarming: true,
  swap: true,
  nativeToken: true,
  supportsEthereum: true,
  requiresKYC: false,
  lowGasFee: false,
  crossChainTrading: true,
  decentralized: true,
  securityAudits: true,
  limitOrders: true,
  rewardsProgram: false,
  ecosystemIntegration: true,
  educationResources: true,
  APIAccess: true
}

export const pancakeParams: Parameters = {
  supportsERC223: true,
  supportsERC20: false,
  yieldFarming: false,
  swap: true,
  nativeToken: true,
  supportsEthereum: true,
  requiresKYC: true,
  lowGasFee: false,
  crossChainTrading: true,
  decentralized: true,
  securityAudits: false,
  limitOrders: true,
  rewardsProgram: false,
  ecosystemIntegration: true,
  educationResources: true,
  APIAccess: true
}

export const uniswapParams: Parameters = {
  supportsERC223: false,
  supportsERC20: false,
  yieldFarming: false,
  swap: true,
  nativeToken: true,
  supportsEthereum: true,
  requiresKYC: true,
  lowGasFee: false,
  crossChainTrading: false,
  decentralized: true,
  securityAudits: true,
  limitOrders: true,
  rewardsProgram: false,
  ecosystemIntegration: false,
  educationResources: true,
  APIAccess: true
}
