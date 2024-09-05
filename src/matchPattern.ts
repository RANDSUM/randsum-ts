export const coreNotationPattern = /^\d+[Dd](\d+|{.*})/
export const dropHighestPattern = /[Hh]\d*/g
export const dropLowestPattern = /[Ll]\d*/g
export const dropConstraintsPattern = /[Dd]{([<>]?\d+,)*([<>]?\d+)}/g
export const explodePattern = /!/g
export const uniquePattern = /[Uu]({(\d+,)*(\d+)})?/g
export const replacePattern = /[Vv]{([<>]?\d+=?\d+,)*([<>]?\d+=?\d+)}/g
export const rerollPattern = /[Rr]{([<>]?\d,)*([<>]?\d)}\d*/g
export const capPattern = /[Cc]{([<>]?\d+,)*([<>]?\d+)}/g
export const plusPattern = /\+\d+/g
export const minusPattern = /-\d+/g

export const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${dropHighestPattern.source}|${dropLowestPattern.source}|${dropConstraintsPattern.source}|${explodePattern.source}|${uniquePattern.source}|${replacePattern.source}|${rerollPattern.source}|${capPattern.source}|${plusPattern.source}|${minusPattern.source}`,
  'g'
)
