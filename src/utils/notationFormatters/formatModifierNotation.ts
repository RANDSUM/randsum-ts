import { isValidModifier } from '~src/guards/isValidModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollOptions } from '~types'
import { capNotation } from './capNotation'
import { dropNotation } from './dropNotation'
import { minusNotation } from './minusNotation'
import { replaceNotation } from './replaceNotation'
import { rerollNotation } from './rerollNotation'

export function formatModifierNotation({ modifiers }: RollOptions): string {
  if (!isValidModifier(modifiers)) return ''

  return [
    modifiers.cap && capNotation(modifiers.cap),
    modifiers.drop && dropNotation(modifiers.drop),
    modifiers.replace && replaceNotation(modifiers.replace),
    modifiers.reroll && rerollNotation(modifiers.reroll),
    modifiers.explode && new ExplodeModifier(modifiers.explode).toNotation(),
    modifiers.unique && new UniqueModifier(modifiers.unique).toNotation(),
    modifiers.plus && new PlusModifier(modifiers.plus).toNotation(),
    modifiers.minus && minusNotation(modifiers.minus)
  ]
    .flat()
    .filter((i) => typeof i === 'string')
    .join('')
}
