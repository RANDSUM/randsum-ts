import type { CustomRollOptions, NumericRollOptions } from '~types'
import { isNumericSides } from '../sides/isNumericSides'

export function isNumericRollOptions(
  options: NumericRollOptions | CustomRollOptions
): options is NumericRollOptions {
  return isNumericSides(options.sides)
}