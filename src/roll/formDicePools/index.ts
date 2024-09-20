import { CoreRollArgument, RollArgument, RollParameters } from '~types'
import { isCustomSides } from '~guards'
import { uuidv7 as uuid } from 'uuidv7'
import { parameterizeRollArgument } from '~src/parameterizeRollArgument'

function formDicePools(argument: RollArgument): RollParameters {
  const arrayArgs = argsToArray(argument)
  return {
    dicePools: arrayArgs.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: parameterizeRollArgument(arg) }),
      {}
    )
  }
}

function argsToArray(
  argument: RollArgument | undefined
): CoreRollArgument[] | undefined[] {
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

export { formDicePools }
