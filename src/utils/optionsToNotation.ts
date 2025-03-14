import type { Notation, RollOptions } from '~types'
import { formatCoreNotation } from './notationFormatters/formatCoreNotation'
import { formatModifierNotation } from './notationFormatters/formatModifierNotation'

export function optionsToNotation<S extends string | number>(
  options: RollOptions<S>
): Notation<S> {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as Notation<S>
}
