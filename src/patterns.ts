const digitPattern = /\d*/.source

export const coreNotationPattern: RegExp = /^\d+[Dd](\d+|{.*})/
export const dropHighestPattern: RegExp = /[Hh]\d*/g
export const dropLowestPattern: RegExp = /[Ll]\d*/g
export const uniquePattern: RegExp = /[Uu]({(\d+,)*(\d+)})?/g
export const plusPattern: RegExp = /\+\d+/g
export const minusPattern: RegExp = /-\d+/g
export const explodePattern: RegExp = /!/g

const coreGreaterLessThan: RegExp = /[<>]?\d+/
const coreGreaterLessThanEquals: RegExp = new RegExp(
  coreGreaterLessThan.source + /=?\d+/.source
)

function createRepeatedPattern(core: RegExp) {
  return new RegExp(`{(${core.source},)*(${core.source})}`, 'g')
}

const greaterThanLessEqualityThanMatcher: RegExp = createRepeatedPattern(
  coreGreaterLessThanEquals
)
export const replacePattern: RegExp = new RegExp(
  /[Vv]/.source + greaterThanLessEqualityThanMatcher.source,
  'g'
)

const greaterThanLessThanMatcher: RegExp =
  createRepeatedPattern(coreGreaterLessThan)
export const dropConstraintsPattern: RegExp = new RegExp(
  /[Dd]/.source + greaterThanLessThanMatcher.source,
  'g'
)

export const rerollPattern: RegExp = new RegExp(
  `${/[Rr]/.source}${greaterThanLessThanMatcher.source}${digitPattern}`,
  'g'
)

export const capPattern: RegExp = new RegExp(
  `${/[Cc]/.source}${greaterThanLessThanMatcher.source}`,
  'g'
)

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
