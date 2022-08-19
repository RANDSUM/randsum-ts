export function makeRolls (quantity: number, rollOne: () => number) {
  const rolls = new Array<number>(quantity)
  for (let index = 0; index < quantity; index += 1) {
    rolls[index] = rollOne()
  }
  return rolls
}
