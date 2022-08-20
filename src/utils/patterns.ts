export const coreNotationPattern = /(?<coreNotationMatch>\d+[Dd]\d+)/
const dropHighPattern = /(?<dropHighMatch>[Hh]\d*)/
const dropLowPattern = /(?<dropLowMatch>[Ll]\d*)/
const dropConstraintsPattern = /(?<dropConstraintsMatch>[Dd]{?([<>|]?\d+,?)*}?)/
const explodePattern = /(?<explodeMatch>!+{?([<>|]?\d+,?)*}?)/
const uniquePattern = /(?<uniqueMatch>[Uu]({(\d+,?)+})?)/
const replacePattern = /(?<replaceMatch>[Vv]{?([<>|]?\d+=?\d+,?)*}?)/
const rerollPattern = /(?<rerollMatch>[Rr]{?([<>|]?\d,?)*}\d*)/
const capPattern = /(?<capMatch>[Cc]([<>|]?\d+)*)/
const plusPattern = /(?<plusMatch>\+\d+)/
const minusPattern = /(?<minusMatch>-\d+)/

const allPatterns = [
  coreNotationPattern,
  dropHighPattern,
  dropLowPattern,
  dropConstraintsPattern,
  explodePattern,
  uniquePattern,
  replacePattern,
  rerollPattern,
  capPattern,
  plusPattern,
  minusPattern
]
export const completeRollPattern = new RegExp(`${allPatterns.map(pattern => pattern.source).join('|')}`, 'g')
