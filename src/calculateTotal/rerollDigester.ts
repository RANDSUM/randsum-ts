import { ReRollOptions } from 'types'

function shouldReroll(num: number, { above, below, on }: Omit<ReRollOptions, 'maxReroll'>) {
  switch (true) {
    case above && num > above:
    case below && num < below:
    case on && Array.isArray(on) ? on.includes(num) : on === num:
      return true
    default:
      return false
  }
}

export function rerollDigester(rollTotals: number[], opts: ReRollOptions, rollDie: () => number) {
  return rollTotals.map(num => {
    if (shouldReroll(num, opts)) {
      let roll
      let index = 0
      do {
        ;(roll = rollDie()) && index++
      } while (shouldReroll(roll, opts) && (opts.maxReroll ? opts.maxReroll > index : true))
      return roll
    }
    return num
  })
}
