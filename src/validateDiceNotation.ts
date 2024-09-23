import { DicePoolType, RandsumNotationValidationResult } from '~types'
import { isCustomSidesArg, isDiceNotationArg } from '~guards'
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

  return {
    valid: true,
    digested,
    notation: OptionsModel.toNotation(digested),
    type: isCustomSidesArg(digested.sides)
      ? DicePoolType.custom
      : DicePoolType.numerical,
    description: OptionsModel.toDescription(digested)
  }
}

export { validateDiceNotation }
