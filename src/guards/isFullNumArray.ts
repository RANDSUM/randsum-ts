export function isFullNumArray(arr: unknown[]): arr is number[] {
  return arr.every((item) => typeof item === 'number')
}
