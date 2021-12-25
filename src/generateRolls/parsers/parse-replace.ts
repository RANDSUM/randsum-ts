import { ReplaceOptions, RollTotals } from 'types'

import { parseSingleCap } from './shared/parse-single-cap'

export function parseReplaceFactory(replace: ReplaceOptions | ReplaceOptions[]) {
  return function parseReplace(rollTotals: RollTotals) {
    const parameters = Array.isArray(replace) ? replace : [replace]

    let replaceRolls = rollTotals
    for (const { from, to } of parameters) {
      replaceRolls = replaceRolls.map(roll => {
        if (from) {
          if (typeof from === 'number') {
            if (Number(roll) === from) {
              return to
            }
          } else {
            return parseSingleCap(from, to)(roll)
          }
        }
        return Number(roll)
      })
    }

    return replaceRolls
  }
}
