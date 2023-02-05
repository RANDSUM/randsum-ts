export const makeRolls = (quantity: number, rollOne: () => number): number[] =>
  Array.from({ length: quantity }, rollOne)

export const coreRandomFactory = (sides: number) => () =>
  Math.floor(Math.random() * Number(sides)) + 1
