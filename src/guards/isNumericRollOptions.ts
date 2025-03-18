import type { CustomRollOptions, NumericRollOptions } from '~types'

export function isNumericRollOptions(
  options: NumericRollOptions | CustomRollOptions
): options is NumericRollOptions {
  return typeof (options as NumericRollOptions).sides === 'number'
}
