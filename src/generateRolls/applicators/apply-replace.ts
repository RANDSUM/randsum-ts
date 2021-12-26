import { ReplaceOptions } from 'types'

import { applySingleCap } from '.'

export function applyReplace(rollTotals: number[], replace: ReplaceOptions<'strict'> | ReplaceOptions<'strict'>[]) {
  const parameters = Array.isArray(replace) ? replace : [replace]

  let replaceRolls = rollTotals
  for (const { from, to } of parameters) {
    replaceRolls = replaceRolls.map(roll => {
      if (from) {
        if (typeof from === 'object') {
          return applySingleCap(from, to)(roll)
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
