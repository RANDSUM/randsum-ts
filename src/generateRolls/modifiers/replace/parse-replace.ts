import { RollParameters, RollTotals } from 'types'

import { replaceDigester } from './replace-digester'

export function parseReplaceFactory(replace: RollParameters['replace']) {
  return function parseReplace(rollTotals: RollTotals) {
    if (!replace) {
      return rollTotals
    }
    const parameters = Array.isArray(replace) ? replace : [replace]

    let replaceRolls = rollTotals
    for (const replaceModifier of parameters) {
      replaceRolls = replaceDigester(replaceRolls, replaceModifier)
    }

    return replaceRolls
  }
}
