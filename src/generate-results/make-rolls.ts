export default function makeRolls(
  quantity: number,
  rollOne: () => number
): number[] {
  return Array.from({ length: quantity }, rollOne)
}
