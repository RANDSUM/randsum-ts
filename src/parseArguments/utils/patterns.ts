export const coreNotationPattern = /(?<coreNotationMatch>\d+[Dd]\d+)/

export const dropHighPattern = /(?<dropHighMatch>[Hh]\d*)/
export const dropLowPattern = /(?<dropLowMatch>[Ll]\d*)/
export const dropConstraintsPattern = /(?<dropConstraintsMatch>[Dd]{?([<>|]?\d+,?)*}?)/
export const explodePattern = /(?<explodeMatch>!+{?([<>|]?\d+,?)*}?)/
export const uniquePattern = /(?<uniqueMatch>[Uu]({(\d+,?)+})?)/
export const replacePattern = /(?<replaceMatch>[Vv]{?([<>|]?\d+=?\d+,?)*}?)/
export const rerollPattern = /(?<rerollMatch>[Rr]{?([<>|]?\d,?)*}\d*)/
export const capPattern = /(?<capMatch>[Cc]([<>|]?\d+)*)/
export const plusPattern = /(?<plusMatch>\+\d+)/
export const minusPattern = /(?<minusMatch>-\d+)/

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
  minusPattern,
]
export const completeRollPattern = new RegExp(`${allPatterns.map(pattern => pattern.source).join('|')}`, 'g')
