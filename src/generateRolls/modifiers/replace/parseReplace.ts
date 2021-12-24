import { RollParameters, RollTotals } from 'types'

import { replaceDigester } from './replaceDigester'

export function parseReplaceFactory(replace: RollParameters['replace']) {
  return function parseReplace(rollTotals: RollTotals) {
    if (!replace) {
      return rollTotals
    }
    const params = Array.isArray(replace) ? replace : [replace]

    return params.reduce((newTotals, replaceModifier) => {
      return replaceDigester(newTotals, replaceModifier)
    }, rollTotals)
  }
}
