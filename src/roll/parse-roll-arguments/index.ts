import { CoreRollArgument, RollArgument, RollParameters } from '~types'
import { isCustomSides } from './guards.ts'
import parameterizeRollArgument from './parameterize-roll-argument.ts'
import { v4 as uuid } from 'uuid'

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
