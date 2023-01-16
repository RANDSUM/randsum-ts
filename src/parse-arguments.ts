import normalizeModifiers from 'normalize-modifiers'
import parseModifiers, { parseCoreNotation } from 'parsers'
import {
  coreNotationPattern,
  DetailedType,
  DiceNotation,
  DieType,
  InternalRollParameters,
  isCoreNotationMatch,
  isDiceNotation,
  isRandsumOptions,
  Match,
  RandsumArguments,
  RandsumOptions,
  SecondaryRandsumOptions,
  UserOptions
} from 'types'

const modifierRollPatterns =
  /(?<dropHighMatch>[Hh]\d*)|(?<dropLowMatch>[Ll]\d*)|(?<dropConstraintsMatch>[Dd]{?([<>|]?\d+,?)*}?)|(?<explodeMatch>!+{?([<>|]?\d+,?)*}?)|(?<uniqueMatch>[Uu]({(\d+,?)+})?)|(?<replaceMatch>[Vv]{?([<>|]?\d+=?\d+,?)*}?)|(?<rerollMatch>[Rr]{?([<>|]?\d,?)*}\d*)|(?<capMatch>[Cc]([<>|]?\d+)*)|(?<plusMatch>\+\d+)|(?<minusMatch>-\d+)/
const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${modifierRollPatterns.source}`,
  'g'
)

function defaultRandomizer(max: number): number {
  return Math.floor(Math.random() * Number(max)) + 1
}

export function convertOptionsToParameters(
  options:
    | RandsumOptions<DieType, DetailedType>
    | SecondaryRandsumOptions<DieType, DetailedType>
    | UserOptions<DetailedType>
): InternalRollParameters {
  const { sides, quantity, modifiers, randomizer, faces } = {
    sides: undefined,
    quantity: undefined,
    modifiers: undefined,
    faces: undefined,
    ...options
  }

  const isCustomSides = Array.isArray(sides)
  const providedFaces = faces !== undefined
  const normalizedModifiers = providedFaces
    ? []
    : isCustomSides
    ? []
    : normalizeModifiers(modifiers || [])

  return {
    ...options,
    randomizer: randomizer || defaultRandomizer,
    faces: providedFaces ? faces : isCustomSides ? sides : undefined,
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
): Omit<InternalRollParameters, 'randomizer'> {
  const rollParameters: Omit<InternalRollParameters, 'randomizer'> = {
    sides: 1,
    quantity: 1,
    faces: undefined,
    modifiers: []
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return findMatches(notationString).reduce((accumulator, match) => {
    const { modifiers = [], ...restParameters } = accumulator

    if (isCoreNotationMatch(match)) {
      const newRollParameters = {
        ...accumulator,
        ...parseCoreNotation(match)
      }
      if (newRollParameters.faces !== undefined) {
        return { ...newRollParameters, modifiers: [] }
      }
      return newRollParameters
    }

    return {
      ...restParameters,
      modifiers: [...modifiers, parseModifiers(match)]
    }
  }, rollParameters)
}

export default function parseArguments(
  primeArgument: RandsumArguments['primeArgument'],
  secondArgument: RandsumArguments['secondArgument'] = {}
): InternalRollParameters {
  if (isRandsumOptions(primeArgument)) {
    return convertOptionsToParameters(primeArgument)
  }

  return {
    ...convertOptionsToParameters(secondArgument),
    ...(isDiceNotation(primeArgument)
      ? parseNotation(primeArgument)
      : { sides: Number(primeArgument) })
  }
}
