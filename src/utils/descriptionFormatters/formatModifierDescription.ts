import { isValidModifier } from '~src/guards/isValidModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollOptions } from '~types'
import { capString } from './capString'
import { dropString } from './dropString'
import { minusString } from './minusString'
import { replaceString } from './replaceString'
import { rerollString } from './rerollString'

export function formatModifierDescriptions({
  modifiers
}: RollOptions): string[] {
  if (!isValidModifier(modifiers)) return []

  return [
    modifiers.cap && capString(modifiers.cap),
    modifiers.drop && dropString(modifiers.drop),
    modifiers.replace && replaceString(modifiers.replace),
    modifiers.reroll && rerollString(modifiers.reroll),
    modifiers.explode && new ExplodeModifier(modifiers.explode).toDescription(),
    modifiers.unique && new UniqueModifier(modifiers.unique).toDescription(),
    modifiers.plus && new PlusModifier(modifiers.plus).toDescription(),
    modifiers.minus && minusString(modifiers.minus)
  ]
    .flat()
    .filter((i) => typeof i === 'string')
}
