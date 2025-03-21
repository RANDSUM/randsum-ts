import { isNumeric } from '../primitives/isNumeric'

export function isNumericSides(sides: unknown): sides is number {
  return isNumeric(sides)
}