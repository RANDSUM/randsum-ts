import { ReplaceOptions, RollTotals } from 'types'

import { parseSingleCap } from './shared/parse-single-cap'

export function parseReplaceFactory(replace: ReplaceOptions<'parameters'> | ReplaceOptions<'parameters'>[]) {
  return function parseReplace(rollTotals: RollTotals) {
    const parameters = Array.isArray(replace) ? replace : [replace]

    let replaceRolls = rollTotals
    for (const { from, to } of parameters) {
      replaceRolls = replaceRolls.map(roll => {
        if (from) {
          if (typeof from === 'object') {
            return parseSingleCap(from, to)(roll)
          } else {
            if (roll === from) {
              return to
            }
          }
        }
        return roll
      })
    }

    return replaceRolls
  }
}
