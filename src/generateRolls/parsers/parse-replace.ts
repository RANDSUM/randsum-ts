import { ReplaceOptions, RollTotals } from 'types'

import { parseSingleCap } from './shared/parse-single-cap'

export function parseReplaceFactory(replace: ReplaceOptions | ReplaceOptions[]) {
  return function parseReplace(rollTotals: RollTotals) {
    const parameters = Array.isArray(replace) ? replace : [replace]

    let replaceRolls = rollTotals.map(roll => Number(roll))
    for (const { from, to } of parameters) {
      replaceRolls = replaceRolls.map(roll => {
        if (from) {
          if (typeof from === 'object') {
            return parseSingleCap(from, Number(to))(roll)
          } else {
            if (roll === Number(from)) {
              return Number(to)
            }
          }
        }
        return roll
      })
    }

    return replaceRolls
  }
}
