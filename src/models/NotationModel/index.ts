import { coreNotationPattern } from '~patterns'
import {
  DicePoolType,
  RandsumNotation,
  RandsumNotationValidationResult,
  RandsumRollOptions
} from '~types'
import { parseCoreNotation, parseModifiers } from './optionsParsers'
import { isDiceNotationArg, isCustomSidesStringArg } from '~guards'
import { OptionsModel } from '~models'

function toOptions<Sides extends string | number>(
  notationString: RandsumNotation<Sides>
): RandsumRollOptions<Sides> {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')

  return {
    ...parseCoreNotation(coreNotationMatch!),
    ...parseModifiers(modifiersString)
  } as RandsumRollOptions<Sides>
}

function validate(notation: string): RandsumNotationValidationResult {
  if (!isDiceNotationArg(notation)) {
    return {
      valid: false,
      description: []
    }
  }

  const digested = toOptions(notation)

  return {
    valid: true,
    digested,
    notation: OptionsModel.toNotation(digested),
    type: isCustomSidesStringArg(digested.sides)
      ? DicePoolType.custom
      : DicePoolType.numerical,
    description: OptionsModel.toDescription(digested)
  }
}

export default { toOptions, validate }
