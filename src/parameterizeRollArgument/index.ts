import { CoreRollArgument, DicePool } from '~types'
import { dieFactory } from '~src/Die'
import { formatDescription } from '~utils/formatDescription'
import { formatNotation } from '~utils/formatNotation'
import { parseDiceOptions } from './parseDiceOptions'

function parameterizeRollArgument(
  argument: CoreRollArgument | undefined
): DicePool {
  const options = parseDiceOptions(argument)
  const die = dieFactory(options.sides)
  return {
    options,
    argument,
    die,
    notation: formatNotation(options),
    description: formatDescription(options)
  } as DicePool
}

export { parameterizeRollArgument }
