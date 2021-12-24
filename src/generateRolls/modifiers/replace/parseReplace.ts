import { RollParameters, RollTotals } from 'types'

import { replaceDigester } from './replaceDigester'

export function parseReplaceFactory(replace: RollParameters['replace']) {
  return function parseReplace(rollTotals: RollTotals) {
    if (!replace) {
      return rollTotals
    }
    const parameters = Array.isArray(replace) ? replace : [replace]

    return parameters.reduce((newTotals, replaceModifier) => {
      return replaceDigester(newTotals, replaceModifier)
    }, rollTotals)
  }
}
