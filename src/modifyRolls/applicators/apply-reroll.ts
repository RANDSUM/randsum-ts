import { RerollOptions } from '../../types'

function rerollRoll(
  roll: number,
  { above, below, on, maxReroll }: RerollOptions<number>,
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
    case above !== undefined && roll > above:
    case below !== undefined && roll < below:
    case on !== undefined && Array.isArray(on) ? on.includes(roll) : on === roll:
      return rerollRoll(rollOne(), { above, below, on, maxReroll }, rollOne, index + 1)
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
