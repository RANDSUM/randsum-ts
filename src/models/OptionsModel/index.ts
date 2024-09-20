import { RandsumNotation, RandsumRollOptions } from '~types'
import {
  formatCoreNotation,
  formatModifierNotation
} from './notationFormatters'
import {
  formatCoreDescriptions,
  formatModifierDescriptions
} from './stringFormatters'

function toNotation(options: RandsumRollOptions): RandsumNotation {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as RandsumNotation
}

function toDescription(options: RandsumRollOptions<number | string>) {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

export default { toNotation, toDescription }
