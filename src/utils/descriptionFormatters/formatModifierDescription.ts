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

export function formatModifierDescriptions({
  modifiers
}: RollOptions): string[] {
  if (!isValidModifier(modifiers)) return []

  return [
    new CapModifier(modifiers.cap).toDescription(),
    new DropModifier(modifiers.drop).toDescription(),
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
