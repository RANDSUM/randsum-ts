import {
  formatCoreNotation,
  formatModifierNotation
} from './notationFormatters'
import { DiceNotation, RollConfig } from '~src/types'

export function configToNotation(options: RollConfig): DiceNotation {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}`
}

export * from './notationFormatters'
