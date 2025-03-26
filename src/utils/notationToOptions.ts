import { coreNotationPattern } from '~patterns'
import type { DiceNotation, RollOptions } from '~types'
import { CapModifier } from '../../packages/notation/src/modifiers/CapModifier'
import { DropModifier } from '../../packages/notation/src/modifiers/DropModifier'
import { ExplodeModifier } from '../../packages/notation/src/modifiers/ExplodeModifier'
import { MinusModifier } from '../../packages/notation/src/modifiers/MinusModifier'
import { PlusModifier } from '../../packages/notation/src/modifiers/PlusModifier'
import { ReplaceModifier } from '../../packages/notation/src/modifiers/ReplaceModifier'
import { RerollModifier } from '../../packages/notation/src/modifiers/RerollModifier'
import { UniqueModifier } from '../../packages/notation/src/modifiers/UniqueModifier'

export function notationToOptions(notationString: DiceNotation): RollOptions {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')
  const [quantity, sides] = coreNotationMatch!.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    sides: parseCoreSides(sides),
    ...{
      modifiers: {
        ...DropModifier.parse(modifiersString),
        ...ExplodeModifier.parse(modifiersString),
        ...UniqueModifier.parse(modifiersString),
        ...ReplaceModifier.parse(modifiersString),
        ...RerollModifier.parse(modifiersString),
        ...CapModifier.parse(modifiersString),
        ...PlusModifier.parse(modifiersString),
        ...MinusModifier.parse(modifiersString)
      }
    }
  } as RollOptions
}

function parseCoreSides(notationString: string): number | string[] {
  if (notationString.includes('{')) {
    return [...notationString.replaceAll(/{|}/g, '')]
  }
  return Number(notationString)
}
