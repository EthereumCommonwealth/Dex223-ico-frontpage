export function addBigIntPercent(value: bigint, percentage: number) {
  return value * (BigInt(percentage) + BigInt(100)) / BigInt(100);
}
