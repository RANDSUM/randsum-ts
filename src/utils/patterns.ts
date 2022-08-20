export const coreNotationPattern = /(?<coreNotationMatch>^\d{1,99}[Dd]\d{1,99})/
const dropHighPattern = /(?<dropHighMatch>[Hh]\d{0,99})/
const dropLowPattern = /(?<dropLowMatch>[Ll]\d{0,99})/
const dropConstraintsPattern = /(?<dropConstraintsMatch>[Dd]{?([<>|]?\d{1,99},?)*}?)/
const explodePattern = /(?<explodeMatch>!+{?([<>|]?\d{1,99},?)*}?)/
const uniquePattern = /(?<uniqueMatch>[Uu]({(\d{0,99},?)+})?)/
const replacePattern = /(?<replaceMatch>[Vv]{?([<>|]?\d{0,99}=?\d+,?)*}?)/
const rerollPattern = /(?<rerollMatch>[Rr]{?([<>|]?\d{1,99},?)*}\d*)/
const capPattern = /(?<capMatch>[Cc]([<>|]?\d{1,99})*)/
const plusPattern = /(?<plusMatch>\+\d{1,99})/
const minusPattern = /(?<minusMatch>-\d{1,99})/

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
