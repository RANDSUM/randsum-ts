export function isNumber(num: unknown): num is number {
  return Number.isInteger(num)
}
