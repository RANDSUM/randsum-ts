export function makeRolls(quantity: number, rollOne: () => number) {
  let index = 0
  const rolls = []
  while (index < quantity) {
    rolls.push(rollOne())
    index++
  }
  return rolls
}
