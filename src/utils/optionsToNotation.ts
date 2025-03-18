import type { Notation, RollOptions } from '~types'
import { formatCoreNotation } from './notationFormatters/formatCoreNotation'
import { formatModifierNotation } from './notationFormatters/formatModifierNotation'

export function optionsToNotation(options: RollOptions): Notation {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as Notation
}
