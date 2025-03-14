export function extractExactValue(
  exact: number[] | undefined,
  roll: number
): boolean {
  if (exact === undefined) {
    return false
  }
  return exact.includes(roll)
}
