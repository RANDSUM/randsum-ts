export function makeRolls(quantity: number, rollOne: () => number) {
  return [...new Array(quantity)].map(() => rollOne())
}
