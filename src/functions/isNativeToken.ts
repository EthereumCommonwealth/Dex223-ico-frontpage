import { TokenInfo } from "@/constants/tokens";

export function isNativeToken(token: TokenInfo) {
  return token.id === 1 || token.id === 11;
}
