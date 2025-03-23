import { isValidModifier } from '~src/guards/isValidModifier'
import { CapModifier } from '~src/modifiers/CapModifier'
import { DropModifier } from '~src/modifiers/DropModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollOptions } from '~types'

export function formatModifierNotation({ modifiers }: RollOptions): string {
  if (!isValidModifier(modifiers)) return ''

  return [
    new CapModifier(modifiers.cap).toNotation(),
    new DropModifier(modifiers.drop).toNotation(),
    new ReplaceModifier(modifiers.replace).toNotation(),
    new RerollModifier(modifiers.reroll).toNotation(),
    new ExplodeModifier(modifiers.explode).toNotation(),
    new UniqueModifier(modifiers.unique).toNotation(),
    new PlusModifier(modifiers.plus).toNotation(),
    new MinusModifier(modifiers.minus).toNotation()
  ]
    .flat()
    .filter((i) => typeof i === 'string')
    .join('')
}
