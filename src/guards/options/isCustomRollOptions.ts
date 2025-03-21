import type { CustomRollOptions, RollOptions } from '~types'
import { isCustomSides } from '../sides/isCustomSides'

export function isCustomRollOptions(
  options: RollOptions
): options is CustomRollOptions {
  return isCustomSides(options.sides)
}