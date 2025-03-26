import {
  CapModifier,
  DropModifier,
  ExplodeModifier,
  MinusModifier,
  PlusModifier,
  ReplaceModifier,
  RerollModifier,
  type RollOptions,
  UniqueModifier
} from '@randsum/core'
import { type DiceNotation, coreNotationPattern } from '@randsum/notation'

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
