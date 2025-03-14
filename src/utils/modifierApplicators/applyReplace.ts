import type { ReplaceOptions } from '~types'
import { applySingleCap } from './applySingleCap'

export function applyReplace(
  rolls: number[],
  replace: ReplaceOptions | ReplaceOptions[]
): number[] {
  let replaceRolls = rolls
  const parameters = [replace].flat()

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
