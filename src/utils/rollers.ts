import { Randomizer } from 'types'

export function makeRolls(quantity: number, rollOne: () => number) {
  const rolls = new Array<number>(quantity)
  for (let index = 0; index < quantity; index += 1) {
    rolls[index] = rollOne()
  }
  return rolls
}

export function defaultRandomizer(max: number): number {
  return Math.floor(Math.random() * Number(max)) + 1
}

export function rollOneFactory(sides: number, randomizer: Randomizer) {
  return function rollOne() {
    return randomizer(sides)
  }
}
