import type { ModifierOptions } from '~types'

export function isValidModifier(
  modifiers: ModifierOptions | undefined
): modifiers is ModifierOptions {
  return (
    modifiers !== undefined &&
    Object.keys(modifiers).length > 0 &&
    Object.values(modifiers).every((modifier) => modifier !== undefined)
  )
}
