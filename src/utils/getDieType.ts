import type { DiceType } from '~types'
import { isCustomSides } from '../guards/sides/isCustomSides'

export function getDieType(sides: number | string[]): DiceType {
  return isCustomSides(sides) ? 'custom' : 'numerical'
}
