import { CoreRollArgument, RollArgument, RollParameters } from '~types'
import { isCustomSides } from './guards.ts'
import parameterizeRollArgument from './parameterizeRollArguments.ts'
import { uuidv7 as uuid } from 'uuidv7'

function parseRollArguments(argument: RollArgument): RollParameters {
  const normalizedArgs = normalizeArgumentsIntoFlatArray(argument)
  return {
    dicePools: normalizedArgs.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: parameterizeRollArgument(arg) }),
      {}
    )
  }
}

const normalizeArgumentsIntoFlatArray = (
  argument: RollArgument | undefined
): CoreRollArgument[] | undefined[] => {
  if (!argument) {
    return [undefined]
  }

  if (isCustomSides(argument)) {
    return [argument]
  }

  if (Array.isArray(argument)) {
    return argument
  }

  return [argument].flat()
}

export default parseRollArguments
