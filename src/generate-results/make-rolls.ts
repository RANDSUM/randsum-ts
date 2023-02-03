const makeRolls = (quantity: number, rollOne: () => number): number[] =>
  Array.from({ length: quantity }, rollOne)

export default makeRolls
