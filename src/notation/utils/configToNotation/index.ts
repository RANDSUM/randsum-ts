import {
  formatCoreNotation,
  formatModifierNotation
} from './notationFormatters'
import type { DiceNotation } from '../../types'
import { RollConfig } from '~src/types'

export function configToNotation(options: RollConfig): DiceNotation {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}`
}

export * from './notationFormatters'
