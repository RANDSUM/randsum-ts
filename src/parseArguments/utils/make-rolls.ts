export function makeRolls(quantity: number, rollOne: () => number) {
  return Array.from({ length: quantity }).map(() => rollOne())
}
