import { isValidModifier } from '~src/guards/isValidModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollOptions } from '~types'
import { capNotation } from './capNotation'
import { dropNotation } from './dropNotation'

export function formatModifierNotation({ modifiers }: RollOptions): string {
  if (!isValidModifier(modifiers)) return ''

  return [
    modifiers.cap && capNotation(modifiers.cap),
    modifiers.drop && dropNotation(modifiers.drop),
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
