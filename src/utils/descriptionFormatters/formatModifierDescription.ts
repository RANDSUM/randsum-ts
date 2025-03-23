import { isValidModifier } from '~src/guards/isValidModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollOptions } from '~types'
import { capString } from './capString'
import { dropString } from './dropString'
import { replaceString } from './replaceString'

export function formatModifierDescriptions({
  modifiers
}: RollOptions): string[] {
  if (!isValidModifier(modifiers)) return []

  return [
    modifiers.cap && capString(modifiers.cap),
    modifiers.drop && dropString(modifiers.drop),
    modifiers.replace && replaceString(modifiers.replace),
    modifiers.reroll && new RerollModifier(modifiers.reroll).toDescription(),
    modifiers.explode && new ExplodeModifier(modifiers.explode).toDescription(),
    modifiers.unique && new UniqueModifier(modifiers.unique).toDescription(),
    modifiers.plus && new PlusModifier(modifiers.plus).toDescription(),
    modifiers.minus && new MinusModifier(modifiers.minus).toDescription()
  ]
    .flat()
    .filter((i) => typeof i === 'string')
    .filter((i) => i.length > 0)
}
