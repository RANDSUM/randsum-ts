import { DiceNotation, NumberString, RollOptions, UserOptions } from 'types'

export function isOptions(argument: NumberString | RollOptions | DiceNotation): argument is RollOptions & UserOptions {
  return typeof argument === 'object'
}
