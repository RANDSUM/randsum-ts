import { CapModifier, DropModifier, ExplodeModifier, MinusModifier, optionsConverter, PlusModifier, ReplaceModifier, RerollModifier, UniqueModifier } from "@randsum/core"
import { coreNotationPattern, isDiceNotation } from "@randsum/notation"
import { D } from "../D"
import { isD } from "../guards/isD"
import { isDicePoolOptions } from "../guards/isDicePoolOptions"
import type { RollArgument, RollOptions, RollParams } from "../types"

export function normalizeArgument(argument: RollArgument): RollParams {
  const options = optionsFromArgument(argument)
  return {
    argument,
    options,
    die: dieForArgument(argument),
    notation: optionsConverter.toNotation(options),
    description: optionsConverter.toDescription(options)
  } as RollParams
}

function optionsFromArgument(argument: RollArgument): RollParams['options'] {
  if (isDicePoolOptions(argument)) {
    return argument
  }

  if (argument instanceof D) {
    return argument.toOptions
  }

  if (isDiceNotation(argument)) {
    const coreNotationMatch = argument.match(coreNotationPattern)

    const coreMatch = coreNotationMatch![0]
    const modifiersString = argument.replace(coreMatch, '')
    const [quantity, sides] = coreMatch.split(/[Dd]/)

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


  if (Array.isArray(argument)) {
    return { quantity: 1, sides: argument.map(String) }
  }

  return { quantity: 1, sides: Number(argument) }
}



function parseCoreSides(notationString: string): number | string[] {

  if (notationString.includes('{')) {
    return [...notationString.replaceAll(/{|}/g, '')]
  }
  return Number(notationString)
}

function dieForArgument(argument: RollArgument): RollParams['die'] {
  if (isD(argument)) {
    return argument
  }
  const options = optionsFromArgument(argument)
  return new D(options.sides) as RollParams['die']
}
