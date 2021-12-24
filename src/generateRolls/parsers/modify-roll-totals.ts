import { RollDie, RollParameters, RollTotals } from 'types'

import { rollParsers } from './roll-parsers'

export function modifyRollTotals(rollTotals: RollTotals, rollParameters: RollParameters, rollDie: RollDie) {
  let parsedRollTotals: number[] = rollTotals

  for (const parser of rollParsers(rollParameters, rollDie)) {
    parsedRollTotals = parser([...parsedRollTotals])
  }

  return parsedRollTotals
}
