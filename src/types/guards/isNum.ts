export function isNum(num: unknown): num is number {
  return Number.isInteger(num)
}
