import { isValidModifier } from '~src/guards/isValidModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollOptions } from '~types'
import { capString } from './capString'
import { dropString } from './dropString'

export function formatModifierDescriptions({
  modifiers
}: RollOptions): string[] {
  if (!isValidModifier(modifiers)) return []

  return [
    modifiers.cap && capString(modifiers.cap),
    modifiers.drop && dropString(modifiers.drop),
    new ReplaceModifier(modifiers.replace).toDescription(),
    new RerollModifier(modifiers.reroll).toDescription(),
    new ExplodeModifier(modifiers.explode).toDescription(),
    new UniqueModifier(modifiers.unique).toDescription(),
    new PlusModifier(modifiers.plus).toDescription(),
    new MinusModifier(modifiers.minus).toDescription()
  ]
    .flat()
    .filter((i) => typeof i === 'string')
    .filter((i) => i.length > 0)
}
