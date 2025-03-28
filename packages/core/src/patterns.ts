export const dropHighestPattern = /[Hh]\d*/g
export const dropLowestPattern = /[Ll]\d*/g
export const uniquePattern = /[Uu]({(\d+,)*(\d+)})?/g
export const plusPattern = /\+\d+/g
export const minusPattern = /-\d+/g
export const explodePattern = /!/g

const coreGreaterLessThan = /[<>]?\d+/
const coreGreaterLessThanEquals = new RegExp(
  coreGreaterLessThan.source + /=?\d+/.source
)

function createRepeatedPattern(core: RegExp) {
  return new RegExp(`{(${core.source},)*(${core.source})}`, 'g')
}

const greaterThanLessEqualityThanMatcher: RegExp = createRepeatedPattern(
  coreGreaterLessThanEquals
)
export const replacePattern = new RegExp(
  /[Vv]/.source + greaterThanLessEqualityThanMatcher.source,
  'g'
)

const greaterThanLessThanMatcher: RegExp =
  createRepeatedPattern(coreGreaterLessThan)
export const dropConstraintsPattern = new RegExp(
  /[Dd]/.source + greaterThanLessThanMatcher.source,
  'g'
)

export const rerollPattern = new RegExp(
  `${/[Rr]/.source}${greaterThanLessThanMatcher.source}${/\d*/.source}`,
  'g'
)

export const capPattern = new RegExp(
  `${/[Cc]/.source}${greaterThanLessThanMatcher.source}`,
  'g'
)
