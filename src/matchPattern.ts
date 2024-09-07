export const coreNotationPattern = /^\d+[Dd](\d+|{.*})/
export const dropHighestPattern = /[Hh]\d*/g
export const dropLowestPattern = /[Ll]\d*/g
export const uniquePattern = /[Uu]({(\d+,)*(\d+)})?/g
export const plusPattern = /\+\d+/g
export const minusPattern = /-\d+/g
export const explodePattern = /!/g

const greaterThanLessThanMatcher = /{([<>]?\d+,)*([<>]?\d+)}/
const greaterThanLessEqualityThanMatcher = /{([<>]?\d+=?\d+,)*([<>]?\d+=?\d+)}/

export const replacePattern = new RegExp(
  /[Vv]/.source + greaterThanLessEqualityThanMatcher.source,
  'g'
)
export const dropConstraintsPattern = new RegExp(
  /[Dd]/.source + greaterThanLessThanMatcher.source,
  'g'
)

export const rerollPattern = new RegExp(
  /[Rr]/.source + greaterThanLessThanMatcher.source + /\d*/.source,
  'g'
)

export const capPattern = new RegExp(
  /[Cc]/.source + greaterThanLessThanMatcher.source,
  'g'
)
