import { ReplaceOptions, RollTotals } from 'types'

import { parseSingleCap } from './shared/parse-single-cap'

export function parseReplaceFactory(replace: ReplaceOptions | ReplaceOptions[]) {
  return function parseReplace(rollTotals: RollTotals) {
    const parameters = Array.isArray(replace) ? replace : [replace]

    let replaceRolls = rollTotals
    for (const { from, to } of parameters) {
      replaceRolls = rollTotals.map(roll => {
        if (from) {
          if (typeof from === 'number') {
            if (roll === from) {
              return to
            }
          } else {
            return parseSingleCap(from, to)(roll)
          }
        }
        return roll
      })
    }

    return replaceRolls
  }
}
