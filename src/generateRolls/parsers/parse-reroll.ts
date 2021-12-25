import { ReRollOptions, RollDie, RollTotals } from 'types'

function rerollRoll(roll: number, { above, below, on, maxReroll }: ReRollOptions, rollDie: RollDie, index = 0): number {
  if (maxReroll === index) {
    return roll
  }
  if (index === 99) {
    console.warn('You have rerolled 99 times, stopping reroll.')
    return roll
  }

  switch (true) {
    case above && roll > above:
    case below && roll < below:
    case on && Array.isArray(on) ? on.includes(roll) : on === roll:
      return rerollRoll(rollDie(), { above, below, on, maxReroll }, rollDie, index + 1)
    default:
      return roll
  }
}

export function parseRerollFactory(reroll: ReRollOptions | ReRollOptions[], rollDie: RollDie) {
  return function parseReroll(rollTotals: RollTotals) {
    const parameters = Array.isArray(reroll) ? reroll : [reroll]

    let rerollRolls = rollTotals
    for (const rerollModifier of parameters) {
      rerollRolls = rerollRolls.map(roll => {
        return rerollRoll(Number(roll), rerollModifier, rollDie, 0)
      })
    }
    return rerollRolls
  }
}
