import { CoreRollArgument, RandsumRollArgument, DicePools } from '~types'
import { isCustomSides } from '~guards'
import { uuidv7 as uuid } from 'uuidv7'
import { parameterizeRollArgument } from '~src/parameterizeRollArgument'

function formDicePools(argument: RandsumRollArgument): DicePools {
  const arrayArgs = argsToArray(argument)
  return {
    dicePools: arrayArgs.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: parameterizeRollArgument(arg) }),
      {}
    )
  }
}

function argsToArray(
  argument: RandsumRollArgument | undefined
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
