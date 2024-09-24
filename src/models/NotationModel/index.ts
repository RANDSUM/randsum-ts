import { coreNotationPattern } from '~patterns'
import {
  DicePoolType,
  RandsumCustomDiceNotation,
  RandsumNotation,
  RandsumNotationValidationResult,
  RandsumNumericDiceNotation,
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

function validate(
  notation: RandsumNumericDiceNotation
): RandsumNotationValidationResult<DicePoolType.numerical>
function validate(
  notation: RandsumCustomDiceNotation
): RandsumNotationValidationResult<DicePoolType.custom>
function validate(notation: string): {
  valid: false
  description: []
}
function validate<Sides extends string | number = string | number>(
  notation: string
): RandsumNotationValidationResult<DicePoolType, Sides> {
  if (!isDiceNotationArg(notation)) {
    return {
      valid: false,
      description: []
    }
  }

  const digested = toOptions(notation as RandsumNotation<Sides>)

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
