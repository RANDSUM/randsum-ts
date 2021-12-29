import { RerollOptions } from '../../types'

function rerollRoll(
  roll: number,
  { greaterThan, lessThan, exact, maxReroll }: RerollOptions<number>,
  rollOne: () => number,
  index = 0,
): number {
  if (maxReroll === index) {
    return roll
  }
  if (index === 99) {
    console.warn('You have rerolled 99 times, stopping reroll.')
    return roll
  }

  switch (true) {
    case greaterThan !== undefined && roll > greaterThan:
    case lessThan !== undefined && roll < lessThan:
    case exact !== undefined && Array.isArray(exact) ? exact.includes(roll) : exact === roll:
      return rerollRoll(rollOne(), { greaterThan, lessThan, exact, maxReroll }, rollOne, index + 1)
    default:
      return roll
  }
}

export function applyReroll(
  rolls: number[],
  reroll: RerollOptions<number> | Array<RerollOptions<number>>,
  rollOne: () => number,
): number[] {
  const parameters = Array.isArray(reroll) ? reroll : [reroll]

  let rerollRolls = rolls
  for (const rerollModifier of parameters) {
    rerollRolls = rerollRolls.map(roll => {
      return rerollRoll(roll, rerollModifier, rollOne)
    })
  }
  return rerollRolls
}
