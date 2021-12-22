import { ReRollOptions, RollDie } from 'types'

function reroll(num: number, { above, below, on, maxReroll }: ReRollOptions, rollDie: RollDie, index: number): number {
  if (maxReroll === index) {
    return num
  }
  if (99 === index) {
    console.warn('You have rerolled 99 times, stopping reroll.')
    return num
  }

  switch (true) {
    case above && num > above:
    case below && num < below:
    case on && Array.isArray(on) ? on.includes(num) : on === num:
      return reroll(rollDie(), { above, below, on, maxReroll }, rollDie, index + 1)
    default:
      return num
  }
}

export function rerollDigester(rollTotals: number[], opts: ReRollOptions, rollDie: RollDie) {
  return rollTotals.map(num => reroll(num, opts, rollDie, 0))
}
