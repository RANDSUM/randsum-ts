import { RerollOptions, RollDie, RollTotals } from 'types'

function rerollRoll(roll: number, { above, below, on, maxReroll }: RerollOptions, rollDie: RollDie, index = 0): number {
  if (Number(maxReroll) === index) {
    return roll
  }
  if (index === 99) {
    console.warn('You have rerolled 99 times, stopping reroll.')
    return roll
  }

  switch (true) {
    case above && roll > Number(above):
    case below && roll < Number(below):
    case on && Array.isArray(on) ? on.map(number => Number(number)).includes(roll) : Number(on) === roll:
      return rerollRoll(rollDie(), { above, below, on, maxReroll }, rollDie, index + 1)
    default:
      return roll
  }
}

export function parseRerollFactory(reroll: RerollOptions | RerollOptions[], rollDie: RollDie) {
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
