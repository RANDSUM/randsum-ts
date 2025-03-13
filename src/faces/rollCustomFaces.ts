import { v4 as uuid } from 'uuid'

import { rollDicePools } from '~src/utils/rollDicePools'
import {
  CustomFacesDicePools,
  CustomFacesRollArgument,
  CustomFacesRollResult
} from './types'
import { argumentToCustomFacesRollParameters } from './utils/argumentToCustomFacesRollParameters'

export function rollCustomFaces(
  ...args: CustomFacesRollArgument[]
): CustomFacesRollResult {
  const dicePools = args.reduce(
    (acc, arg) => ({
      ...acc,
      [uuid()]: argumentToCustomFacesRollParameters(arg)
    }),
    {} as CustomFacesDicePools
  )

  const rawRolls = rollDicePools(dicePools)

  return {
    dicePools,
    rawRolls,
    result: Object.values(rawRolls).flat()
  }
}
