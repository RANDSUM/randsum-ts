import { DicePoolType, RandsumNotationValidationResult } from '~types'
import { isDiceNotationArg } from '~guards'
import NotationModel from '~models/NotationModel'
import OptionsModel from '~models/OptionsModel'

function validateDiceNotation(
  notation: string
): RandsumNotationValidationResult {
  if (!isDiceNotationArg(notation)) {
    return {
      valid: false,
      description: []
    }
  }

  const digested = NotationModel.toOptions(notation)
  const description = OptionsModel.toDescription(digested)
  const parsedNotation = OptionsModel.toNotation(digested)
  const type = Array.isArray(digested.sides)
    ? DicePoolType.custom
    : DicePoolType.numerical

  return {
    valid: true,
    notation: parsedNotation,
    type,
    digested,
    description
  }
}

export { validateDiceNotation }
