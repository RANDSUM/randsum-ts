import { v4 as uuid } from 'uuid'

import { rollDicePools } from '~src/utils/rollDicePools'
import { DicePools, RollArgument, RollResult } from './types'
import { applyModifiers, calculateTotal } from './utils/applyModifiers'
import { argumentToRollParameters } from './utils/argumentToRollParameters'

export function roll(...args: RollArgument[]): RollResult {
  const dicePools = args.reduce(
    (acc, arg) => ({ ...acc, [uuid()]: argumentToRollParameters(arg) }),
    {} as DicePools
  )

  const rawRolls = rollDicePools(dicePools)

  const modifiedRolls = Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const modified = applyModifiers(dicePools[key], rawRolls[key])
      return [
        key,
        {
          rolls: modified.rolls,
          total: calculateTotal(modified.rolls, modified.simpleMathModifier)
        }
      ]
    })
  )

  return {
    dicePools,
    rawRolls,
    modifiedRolls,
    rawResult: Object.values(rawRolls).flat(),
    result: calculateTotal(
      Object.values(modifiedRolls).map((pool) => pool.total)
    )
  }
}
