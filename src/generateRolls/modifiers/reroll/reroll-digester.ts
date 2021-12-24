import { ReRollOptions, RollDie } from 'types'

function reroll(
  number_: number,
  { above, below, on, maxReroll }: ReRollOptions,
  rollDie: RollDie,
  index: number,
): number {
  if (maxReroll === index) {
    return number_
  }
  if (index === 99) {
    console.warn('You have rerolled 99 times, stopping reroll.')
    return number_
  }

  switch (true) {
    case above && number_ > above:
    case below && number_ < below:
    case on && Array.isArray(on) ? on.includes(number_) : on === number_:
      return reroll(rollDie(), { above, below, on, maxReroll }, rollDie, index + 1)
    default:
      return number_
  }
}

export function rerollDigester(rollTotals: number[], options: ReRollOptions, rollDie: RollDie) {
  return rollTotals.map(number_ => reroll(number_, options, rollDie, 0))
}
