import {
  CapModifier,
  DropModifier,
  ExplodeModifier,
  MinusModifier,
  PlusModifier,
  ReplaceModifier,
  RerollModifier,
  UniqueModifier
} from '@randsum/core'
import { coreNotationPattern } from '../patterns'
import type { DiceNotation, RollOptions } from '../types'

export function notationToOptions(notationString: DiceNotation): RollOptions {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')
  const [quantity, sides = ''] = coreNotationMatch!.split(/[Dd]/)

  if (sides.includes('{')) {
    return {
      quantity: Number(quantity),
      sides: [...sides.replaceAll(/{|}/g, '')]
    }
  }

  return {
    quantity: Number(quantity),
    sides: Number(sides),
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
  }
}
