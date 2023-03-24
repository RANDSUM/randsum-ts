import { dicePoolFactory } from '../../Die'
import { isCustomSidesRollOptions } from '../../types/guards'
import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import normalizeModifiers from './normalize-modifiers'

const parseOptions = (
  options: RollOptions | RollOptions<string>
): RollParameters | RollParameters<string> => {
  const quantity = Number(options.quantity) || 1

  if (isCustomSidesRollOptions(options)) {
    const diceOptions = [{ quantity, sides: options.sides.map(String) }]
    const dice = dicePoolFactory(diceOptions)
    const initialRolls = dice.map((die) => die.roll())
    return {
      diceOptions,
      dice,
      argument: options,
      modifiers: [],
      initialRolls
    }
  }

  const diceOptions = [{ quantity, sides: Number(options.sides) }]
  const dice = dicePoolFactory(diceOptions)
  const initialRolls = dice.map((die) => die.roll())
  return {
    diceOptions,
    dice,
    argument: options,
    modifiers: normalizeModifiers(options.modifiers || []),
    initialRolls
  }
}

export default parseOptions
