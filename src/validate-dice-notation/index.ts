import { DiceNotation, DicePoolOptions, DicePoolType } from '~types'
import { isDiceNotation } from '../roll/parse-roll-arguments/guards'
import parseNotation from '../roll/parse-roll-arguments/parse-notation'
import formatDescription from '../roll/parse-roll-arguments/format-description.ts'
import formatNotation from '../roll/parse-roll-arguments/format-notation'

interface NotationValidationResult<D extends string | number> {
  valid: boolean
  type?: D extends string ? DicePoolType.custom : DicePoolType.standard
  digested?: DicePoolOptions<D>
  notation?: DiceNotation<D>
  description: string[]
}

function validateDiceNotation(
  notation: string
): NotationValidationResult<string> | NotationValidationResult<number> {
  if (!isDiceNotation(notation)) {
    return {
      valid: false,
      description: []
    }
  }

  const options = parseNotation(notation)
  const description = formatDescription(options)
  if (Array.isArray(options.sides)) {
    const typedOptions = options as DicePoolOptions<string>
    const parsedNotation = formatNotation(typedOptions)

    return {
      valid: true,
      notation: parsedNotation,
      type: DicePoolType.custom,
      digested: typedOptions,
      description
    } as NotationValidationResult<string>
  }
  const typedOptions = options as DicePoolOptions<number>
  const parsedNotation = formatNotation(typedOptions)

  return {
    valid: true,
    notation: parsedNotation,
    type: DicePoolType.standard,
    digested: typedOptions,
    description
  } as NotationValidationResult<number>
}

export default validateDiceNotation
