export const coreNotationPattern = /(?<coreNotationMatch>^\d+[Dd](\d+|{.*}))/

const dropHighestMatch = /(?<dropHighMatch>[Hh]\d*)/
const dropLowestMatch = /(?<dropLowMatch>[Ll]\d*)/
const dropConstraintsMatch =
  /(?<dropConstraintsMatch>[Dd]{([<>]?\d+,)*([<>]?\d+)})/

const explodeMatch = /(?<explodeMatch>!+{?([<>]?\d+,?)*}?)/
const uniqueMatch = /(?<uniqueMatch>[Uu]({(\d+,)*(\d+)})?)/

const replaceMatch = /(?<replaceMatch>[Vv]{([<>]?\d+=?\d+,)*([<>]?\d+=?\d+)})/

const rerollMatch = /(?<rerollMatch>[Rr]{([<>]?\d,)*([<>]?\d)}\d*)/

const capMatch = /(?<capMatch>[Cc]([<>]?\d+)*)/
const plusMatch = /(?<plusMatch>\+\d+)/
const minusMatch = /(?<minusMatch>-\d+)/

export const modifierRollPatterns = new RegExp(
  `${dropHighestMatch.source}|${dropLowestMatch.source}|${dropConstraintsMatch.source}|${explodeMatch.source}|${uniqueMatch.source}|${replaceMatch.source}|${rerollMatch.source}|${capMatch.source}|${plusMatch.source}|${minusMatch.source}`
)

export const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${modifierRollPatterns.source}`,
  'g'
)
