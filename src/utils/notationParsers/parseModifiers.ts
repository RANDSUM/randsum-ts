import { DropModifier } from '~src/modifiers/DropModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { ModifierOptions } from '~types'
import { parseCapNotation } from './parseCapNotation'

export function parseModifiers(
  modifiersString: string
): ModifierOptions | Record<never, never> {
  return {
    modifiers: {
      ...DropModifier.parse(modifiersString),
      ...ExplodeModifier.parse(modifiersString),
      ...UniqueModifier.parse(modifiersString),
      ...ReplaceModifier.parse(modifiersString),
      ...RerollModifier.parse(modifiersString),
      ...parseCapNotation(modifiersString),
      ...PlusModifier.parse(modifiersString),
      ...MinusModifier.parse(modifiersString)
    }
  }
}
