import type { Notation, RollOptions } from '~types'
import {
  formatCoreNotation,
  formatModifierNotation
} from './notationGenerators'

export function optionsToNotation<Sides extends string | number>(
  options: RollOptions<Sides>
): Notation<Sides> {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as Notation<Sides>
}
