export const diceNotationPattern = /(\d+)[Dd](\d+)/

export const dropHigh = /[Hh](\d*)/
export const dropLow = /[Ll](\d*)/
export const dropConstraintsPartial = /[Dd]{?([<>|]?\d+,?)*}?/
export const dropConstraints = new RegExp(`${diceNotationPattern.source}.*${dropConstraintsPartial.source}`)
export const explode = /!+{?([<>|]?\d+,?)*}?/
export const unique = /[Uu]({(\d+,?)+})?/
export const replace = /[Vv]{?([<>|]?\d+=?\d+,?)*}?/
export const reroll = /[Rr]{?([<>|]?\d,?)*}\d*/
export const cap = /[Cc]([<>|]?\d+)*/
export const plus = /\+\d+/
export const minus = /-\d+/
