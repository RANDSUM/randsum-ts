import { capPattern, dropConstraintsPattern, dropHighestPattern, dropLowestPattern, explodePattern, minusPattern, plusPattern, replacePattern, rerollPattern, uniquePattern } from "@randsum/core"

export const coreNotationPattern: RegExp = /^\d+[Dd](\d+|{.*})/
export const completeRollPattern: RegExp = new RegExp(
  [
    coreNotationPattern.source,
    dropHighestPattern.source,
    dropLowestPattern.source,
    dropConstraintsPattern.source,
    explodePattern.source,
    uniquePattern.source,
    replacePattern.source,
    rerollPattern.source,
    capPattern.source,
    plusPattern.source,
    minusPattern.source
  ].join('|'),
  'g'
)
