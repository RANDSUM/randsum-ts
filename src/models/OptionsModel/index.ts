import { RandsumNotation, RandsumRollOptions } from '~types'
import {
  formatCoreNotation,
  formatModifierNotation
} from './notationFormatters'
import {
  formatCoreDescriptions,
  formatModifierDescriptions
} from './stringFormatters'

function toNotation<Sides extends string | number = string | number>(
  options: RandsumRollOptions<Sides>
): RandsumNotation<Sides> {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as RandsumNotation<Sides>
}

function toDescription(options: RandsumRollOptions<number | string>) {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

export default { toNotation, toDescription }
