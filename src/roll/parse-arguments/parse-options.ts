import { dicePoolFactory } from '../../Die'
import { DicePoolOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'

const isCustomSidesDicePoolOptions = (
  argument: DicePoolOptions<number> | DicePoolOptions<string>
): argument is DicePoolOptions<string> =>
  Array.isArray((argument as DicePoolOptions<string>).sides)

const parseOptions = (
  options: DicePoolOptions<number> | DicePoolOptions<string>
):
  | Omit<RollParameters<number>, 'generateInitialRolls'>
  | Omit<RollParameters<string>, 'generateInitialRolls'> => {
  const quantity = Number(options.quantity) || 1

  if (isCustomSidesDicePoolOptions(options)) {
    const diceOptions = [{ quantity, sides: options.sides.map(String) }]
    const dice = dicePoolFactory(diceOptions)
    return {
      diceOptions,
      dice,
      argument: options,
      modifiers: {}
    }
  }

  const diceOptions = [{ quantity, sides: Number(options.sides) }]
  const dice = dicePoolFactory(diceOptions)
  return {
    diceOptions,
    dice,
    argument: options,
    modifiers: options.modifiers || {}
  }
}

export default parseOptions
