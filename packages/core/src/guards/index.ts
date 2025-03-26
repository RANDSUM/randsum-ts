import type { ModifierOptions, NumericRollOptions, RollOptions } from '../types'

export function isNumericRollOptions(
  options: RollOptions
): options is NumericRollOptions {
  return typeof options.sides === 'number'
}

export function hasModifiers(options: ModifierOptions): boolean {
  return Object.keys(options).length > 0
}

export function isValidSides(sides: number): boolean {
  return sides >= 2 && Number.isInteger(sides)
}

export function isValidQuantity(quantity: number): boolean {
  return quantity > 0 && Number.isInteger(quantity)
}
