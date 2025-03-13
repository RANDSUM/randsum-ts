import { isCustomSidesStringArg, isDiceNotationArg } from '~guards'
import { OptionsModel } from '~models'
import { coreNotationPattern } from '~patterns'
import type { Notation, NotationValidationResult, RollOptions } from '~types'
import { parseCoreNotation, parseModifiers } from './optionsParsers'

function toOptions<Sides extends string | number>(
  notationString: Notation<Sides>
): RollOptions<Sides> {
  const coreNotationMatch = notationString.match(coreNotationPattern)!.at(0)
  const modifiersString = notationString.replace(coreNotationMatch!, '')

  return {
    ...parseCoreNotation(coreNotationMatch!),
    ...parseModifiers(modifiersString)
  } as RollOptions<Sides>
}

function validate(notation: string): NotationValidationResult {
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
    type: isCustomSidesStringArg(digested.sides) ? 'custom' : 'numerical',
    description: OptionsModel.toDescription(digested)
  }
}

export default { toOptions, validate }
