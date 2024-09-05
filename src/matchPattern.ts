export const coreNotationPattern = /^\d+[Dd]\d+|{.*}/

export const dropHighestPattern = /[Hh]\d*/
export const dropLowestPattern = /[Ll]\d*/
export const dropConstraintsPattern = /[Dd]{([<>]?\d+,)*([<>]?\d+)}/

export const explodePattern = /!/
export const uniquePattern = /[Uu]({(\d+,)*(\d+)})?/

export const replacePattern = /[Vv]{([<>]?\d+=?\d+,)*([<>]?\d+=?\d+)}/

export const rerollPattern = /[Rr]{([<>]?\d,)*([<>]?\d)}\d*/

export const capPattern = /[Cc]{([<>]?\d+,)*([<>]?\d+)}/
export const plusPattern = /\+\d+/
export const minusPattern = /-\d+/

export const modifierRollPatterns = new RegExp(
  `${dropHighestPattern.source}|${dropLowestPattern.source}|${dropConstraintsPattern.source}|${explodePattern.source}|${uniquePattern.source}|${replacePattern.source}|${rerollPattern.source}|${capPattern.source}|${plusPattern.source}|${minusPattern.source}`
)

export const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${modifierRollPatterns.source}`,
  'g'
)
