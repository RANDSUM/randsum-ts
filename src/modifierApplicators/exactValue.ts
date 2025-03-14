export function exactValue(
  exact: number | number[] | undefined,
  roll: number
): boolean {
  if (exact === undefined) {
    return false
  }
  if (Array.isArray(exact)) {
    return exact.includes(roll)
  }
  return exact === roll
}
