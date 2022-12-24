import { ReplaceOptions } from 'types'

import applySingleCap from './apply-single-cap'

export default function applyReplace(
  rolls: number[],
  replace: ReplaceOptions<number> | Array<ReplaceOptions<number>>
): number[] {
  const parameters = Array.isArray(replace) ? replace : [replace]

  let replaceRolls = rolls

  parameters.forEach(({ from, to }) => {
    replaceRolls = replaceRolls.map((roll) => {
      if (from !== undefined) {
        if (typeof from === 'object') {
          return applySingleCap(from, to)(roll)
        }
        if (roll === from) {
          return to
        }
      }
      return roll
    })
  })

  return replaceRolls
}
