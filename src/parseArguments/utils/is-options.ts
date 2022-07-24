import { DiceNotation, NumberString, RandsumOptions, RandsumOptionsWithoutSides, UserOptions } from '../../types'

export function isRandsumOptions(argument: NumberString | RandsumOptions | DiceNotation): argument is RandsumOptions {
  return typeof argument === 'object'
}

export function isUserOptions(argument: RandsumOptionsWithoutSides | UserOptions): argument is UserOptions {
  return typeof argument === 'object' && ('detailed' in argument || 'randomizer' in argument)
}

export function isRandsumOptionsWithoutSides(
  argument: RandsumOptionsWithoutSides | UserOptions,
): argument is RandsumOptionsWithoutSides {
  return typeof argument === 'object' && ('quantity' in argument || 'modifiers' in argument)
}
