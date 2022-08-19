import { ReplaceOptions } from 'types'

import { applySingleCap } from './apply-single-cap'

export function applyReplace (
  rolls: number[],
  replace: ReplaceOptions<number> | Array<ReplaceOptions<number>>
): number[] {
  const parameters = Array.isArray(replace) ? replace : [replace]

  let replaceRolls = rolls
  for (const { from, to } of parameters) {
    replaceRolls = replaceRolls.map(roll => {
      if (from !== undefined) {
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
