export const coreNotationPattern = /(?<coreNotationMatch>^\d+[Dd](\d+|{.*}))/
export const modifierRollPatterns =
  // eslint-disable-next-line security/detect-unsafe-regex
  /(?<dropHighMatch>[Hh]\d*)|(?<dropLowMatch>[Ll]\d*)|(?<dropConstraintsMatch>[Dd]{?([<>|]?\d+,?)*}?)|(?<explodeMatch>!+{?([<>|]?\d+,?)*}?)|(?<uniqueMatch>[Uu]({(\d+,?)+})?)|(?<replaceMatch>[Vv]{?([<>|]?\d+=?\d+,?)*}?)|(?<rerollMatch>[Rr]{?([<>|]?\d,?)*}\d*)|(?<capMatch>[Cc]([<>|]?\d+)*)|(?<plusMatch>\+\d+)|(?<minusMatch>-\d+)/
// eslint-disable-next-line security/detect-non-literal-regexp
export const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${modifierRollPatterns.source}`,
  'g'
)
