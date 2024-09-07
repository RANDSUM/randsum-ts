export const coreNotationPattern = /^\d+[Dd](\d+|{.*})/
export const dropHighestPattern = /[Hh]\d*/g
export const dropLowestPattern = /[Ll]\d*/g
export const uniquePattern = /[Uu]({(\d+,)*(\d+)})?/g
export const replacePattern = /[Vv]{([<>]?\d+=?\d+,)*([<>]?\d+=?\d+)}/g

const greaterThanLessThanMatcher = /{([<>]?\d+,)*([<>]?\d+)}/

const coreDropConstraints = /[Dd]/
export const dropConstraintsPattern = new RegExp(
  coreDropConstraints.source + greaterThanLessThanMatcher.source,
  'g'
)

const coreReroll = /[Rr]/
export const rerollPattern = new RegExp(
  coreReroll.source + greaterThanLessThanMatcher.source + /\d*/.source,
  'g'
)

const coreCap = /[Cc]/
export const capPattern = new RegExp(
  coreCap.source + greaterThanLessThanMatcher.source,
  'g'
)

export const plusPattern = /\+\d+/g
export const minusPattern = /-\d+/g
export const explodePattern = /!/g
