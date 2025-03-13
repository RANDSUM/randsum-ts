import type { Notation, RollOptions } from '~types'
import {
  formatCoreNotation,
  formatModifierNotation
} from './notationFormatters'
import {
  formatCoreDescriptions,
  formatModifierDescriptions
} from './stringFormatters'

function toNotation<Sides extends string | number>(
  options: RollOptions<Sides>
): Notation<Sides> {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as Notation<Sides>
}

function toDescription(options: RollOptions<number | string>) {
  return [
    formatCoreDescriptions(options),
    ...formatModifierDescriptions(options)
  ]
}

export default { toNotation, toDescription }
