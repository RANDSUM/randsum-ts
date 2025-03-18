import type { DiceNotation, RollOptions } from '~types'
import { formatCoreNotation } from './notationFormatters/formatCoreNotation'
import { formatModifierNotation } from './notationFormatters/formatModifierNotation'

export function optionsToNotation(options: RollOptions): DiceNotation {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as DiceNotation
}
