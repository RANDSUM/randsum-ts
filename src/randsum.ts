import { digestArgs } from 'calculators'
import { RollOptions, RollResult } from 'types'


export function randsum(
  firstArg: string | number,
  modifier?: RollOptions
): number | RollResult {
  const rollParams = digestArgs(firstArg, modifier)

  // convert into InternalRoll
  //Roll InternalRoll

  return 2
}
