import { RandsumRollArgument, DicePools } from '~types'
import { uuidv7 as uuid } from 'uuidv7'
import { parameterizeRollArgument } from '~src/parameterizeRollArgument'

function formDicePools(args: RandsumRollArgument[]): DicePools {
  return {
    dicePools: args.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: parameterizeRollArgument(arg) }),
      {}
    )
  }
}

export { formDicePools }
