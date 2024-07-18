import { CoreRollArgument, RollArgument, RollParameters } from '~types'
import { isCustomSides } from './guards.ts'
import parameterizeRollArgument from './parameterizeRollArguments.ts'
import { uuidv7 as uuid } from 'uuidv7'

const normalizeArguments = (
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

function parseRollArguments(argument: RollArgument): RollParameters {
  return {
    dicePools: normalizeArguments(argument).reduce(
      (acc, arg) => ({ ...acc, [uuid()]: parameterizeRollArgument(arg) }),
      {}
    )
  }
}

export default parseRollArguments
