import { isValidModifier } from '~src/guards/isValidModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollOptions } from '~types'
import { capNotation } from './capNotation'
import { dropNotation } from './dropNotation'
import { replaceNotation } from './replaceNotation'

export function formatModifierNotation({ modifiers }: RollOptions): string {
  if (!isValidModifier(modifiers)) return ''

  return [
    modifiers.cap && capNotation(modifiers.cap),
    modifiers.drop && dropNotation(modifiers.drop),
    modifiers.replace && replaceNotation(modifiers.replace),
    modifiers.reroll && new RerollModifier(modifiers.reroll).toNotation(),
    modifiers.explode && new ExplodeModifier(modifiers.explode).toNotation(),
    modifiers.unique && new UniqueModifier(modifiers.unique).toNotation(),
    modifiers.plus && new PlusModifier(modifiers.plus).toNotation(),
    modifiers.minus && new MinusModifier(modifiers.minus).toNotation()
  ]
    .flat()
    .filter((i) => typeof i === 'string')
    .join('')
}
