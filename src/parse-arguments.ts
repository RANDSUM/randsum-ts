import normalizeModifiers from './normalize-modifiers'
import parseModifiers, { isCoreNotationMatch, Match, parseCoreNotation } from './parsers'
import {
  coreNotationPattern,
  DiceNotation,
  InternalRollParameters,
  isDiceNotation,
  isRandsumOptions,
  NumberString,
  RandsumOptions
} from './types'

const modifierRollPatterns =
  // eslint-disable-next-line security/detect-unsafe-regex
  /(?<dropHighMatch>[Hh]\d*)|(?<dropLowMatch>[Ll]\d*)|(?<dropConstraintsMatch>[Dd]{?([<>|]?\d+,?)*}?)|(?<explodeMatch>!+{?([<>|]?\d+,?)*}?)|(?<uniqueMatch>[Uu]({(\d+,?)+})?)|(?<replaceMatch>[Vv]{?([<>|]?\d+=?\d+,?)*}?)|(?<rerollMatch>[Rr]{?([<>|]?\d,?)*}\d*)|(?<capMatch>[Cc]([<>|]?\d+)*)|(?<plusMatch>\+\d+)|(?<minusMatch>-\d+)/
// eslint-disable-next-line security/detect-non-literal-regexp
const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${modifierRollPatterns.source}`,
  'g'
)

export function parseOptions(options: RandsumOptions): InternalRollParameters {
  const { sides, quantity, modifiers } = {
    quantity: undefined,
    modifiers: undefined,
    ...options
  }

  const isCustomSides = Array.isArray(sides)
  const normalizedModifiers = isCustomSides
    ? []
    : normalizeModifiers(modifiers || [])

  return {
    ...options,
    faces: isCustomSides ? sides : undefined,
    sides: isCustomSides ? sides.length : Number(sides),
    quantity: Number(quantity || 1),
    modifiers: normalizedModifiers
  }
}

function findMatches(notations: string): Match[] {
  return [...notations.matchAll(completeRollPattern)].map<Match>(
    ({ groups: match }) => match as Match
  )
}

export function parseNotation(
  notationString: DiceNotation
): InternalRollParameters {
  let rollParameters: InternalRollParameters = {
    sides: 1,
    quantity: 1,
    faces: undefined,
    modifiers: []
  }

  findMatches(notationString).forEach((match) => {
    const { modifiers = [], ...restParameters } = rollParameters

    if (isCoreNotationMatch(match)) {
      const newRollParameters = {
        ...rollParameters,
        ...parseCoreNotation(match)
      }
      if (newRollParameters.faces !== undefined) {
        rollParameters = { ...newRollParameters, modifiers: [] }
      }
      rollParameters = newRollParameters
      return
    }

    rollParameters = {
      ...restParameters,
      modifiers: [...modifiers, parseModifiers(match)]
    }
  })

  return rollParameters
}

export default function parseArguments(
  primeArgument: RandsumOptions | DiceNotation | NumberString | undefined
): InternalRollParameters {
  if (isRandsumOptions(primeArgument)) {
    return parseOptions(primeArgument)
  }

  if (isDiceNotation(primeArgument)) {
    return { ...parseNotation(primeArgument) }
  }

  return {
    sides: primeArgument === undefined ? 20 : Number(primeArgument),
    modifiers: [],
    quantity: 1
  }
}
