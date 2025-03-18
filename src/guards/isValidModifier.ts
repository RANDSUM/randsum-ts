import type { ModifierOptions } from '~types'

export function isValidModifier(
  modifiers: unknown | ModifierOptions | undefined
): modifiers is ModifierOptions {
  return Object.keys(modifiers || {}).length > 0
}
