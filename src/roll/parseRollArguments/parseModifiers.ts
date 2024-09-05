import {
  DiceParameters,
  DropOptions,
  Modifiers,
  ReplaceOptions,
  RerollOptions
} from '~types'

const isMatcherType = <M extends Match>(
  argument: Match,
  key: keyof M
): argument is M => ((argument || {}) as M)[key] !== undefined

export type MatchObject = {
  coreNotationMatch: CoreNotationMatch
  dropHighMatch: string[]
  dropLowMatch: string[]
  dropConstraintsMatch: string[]
  explodeMatch: string[]
  uniqueMatch: string[]
  replaceMatch: string[]
  rerollMatch: string[]
  capMatch: string[]
  plusMatch: string[]
  minusMatch: string[]
}

export type CoreNotationMatch = { coreNotationMatch: string }
export const isCoreNotationMatch = (match: Match): match is CoreNotationMatch =>
  isMatcherType<CoreNotationMatch>(match, 'coreNotationMatch')

export type DropHighMatch = { dropHighMatch: string }
export const isDropHighMatch = (match: Match): match is DropHighMatch =>
  isMatcherType<DropHighMatch>(match, 'dropHighMatch')

export type DropLowMatch = { dropLowMatch: string }
export const isDropLowMatch = (match: Match): match is DropLowMatch =>
  isMatcherType<DropLowMatch>(match, 'dropLowMatch')

export type DropConstraintsMatch = { dropConstraintsMatch: string }
export const isDropConstraintsMatch = (
  match: Match
): match is DropConstraintsMatch =>
  isMatcherType<DropConstraintsMatch>(match, 'dropConstraintsMatch')

export type ExplodeMatch = { explodeMatch: string }
export const isExplodeMatch = (match: Match): match is ExplodeMatch =>
  isMatcherType<ExplodeMatch>(match, 'explodeMatch')

export type UniqueMatch = { uniqueMatch: string }
export const isUniqueMatch = (match: Match): match is UniqueMatch =>
  isMatcherType<UniqueMatch>(match, 'uniqueMatch')

export type ReplaceMatch = { replaceMatch: string }
export const isReplaceMatch = (match: Match): match is ReplaceMatch =>
  isMatcherType<ReplaceMatch>(match, 'replaceMatch')

export type RerollMatch = { rerollMatch: string }
export const isRerollMatch = (match: Match): match is RerollMatch =>
  isMatcherType<RerollMatch>(match, 'rerollMatch')

export type CapMatch = { capMatch: string }
export const isCapMatch = (match: Match): match is CapMatch =>
  isMatcherType<CapMatch>(match, 'capMatch')

export type PlusMatch = { plusMatch: string }
export const isPlusMatch = (match: Match): match is PlusMatch =>
  isMatcherType<PlusMatch>(match, 'plusMatch')

export type MinusMatch = { minusMatch: string }

export type Match =
  | CoreNotationMatch
  | DropHighMatch
  | DropLowMatch
  | DropConstraintsMatch
  | ExplodeMatch
  | UniqueMatch
  | ReplaceMatch
  | RerollMatch
  | CapMatch
  | PlusMatch
  | MinusMatch

export const parseCoreNotation = (notationString: string): DiceParameters => {
  const [quantity, sides] = notationString.split(/[Dd]/)

  return {
    quantity: Number(quantity),
    sides: sides.includes('{')
      ? [...sides.replaceAll(/{|}/g, '')]
      : Number(sides)
  } as DiceParameters
}

const parseCapNotation = ({
  capMatch: notationString
}: CapMatch): Pick<Modifiers, 'cap'> => {
  let capParameters = {}
  const capString = notationString
    .split(/[Cc]/)[1]
    .replaceAll(/{|}/g, '')
    .split(',')
  capString.forEach((note) => {
    if (note.includes('<')) {
      capParameters = {
        ...capParameters,
        lessThan: Number(note.replaceAll('<', ''))
      }
      return
    }
    capParameters = {
      ...capParameters,
      greaterThan: Number(note.replaceAll('>', ''))
    }
  })
  return { cap: capParameters }
}

const parseUniqueNotation = ({
  uniqueMatch: notationString
}: UniqueMatch): Pick<Modifiers, 'unique'> => {
  if (notationString === 'u' || notationString === 'U') {
    return { unique: true }
  }

  const notUnique = notationString
    .replaceAll(/[Uu]{/g, '')
    .replaceAll('}', '')
    .split(',')

  return {
    unique: {
      notUnique: notUnique.map(Number)
    }
  }
}

const parseDropConstraintsNotation = ({
  dropConstraintsMatch: notationString
}: DropConstraintsMatch): Pick<Modifiers, 'drop'> => {
  let dropConstraintParameters: Pick<
    DropOptions,
    'greaterThan' | 'lessThan'
  > & { exact: number[] } = { exact: [] }
  const constraints = notationString
    .split(/[Dd]/)[1]
    .replaceAll('{', '')
    .replaceAll('}', '')
    .split(',')
  constraints.forEach((constraint) => {
    if (constraint.includes('<')) {
      dropConstraintParameters = {
        ...dropConstraintParameters,
        lessThan: Number(constraint.split('<')[1])
      }
      return
    }

    if (constraint.includes('>')) {
      dropConstraintParameters = {
        ...dropConstraintParameters,
        greaterThan: Number(constraint.split('>')[1])
      }
      return
    }

    dropConstraintParameters = {
      ...dropConstraintParameters,
      exact: [...dropConstraintParameters.exact, Number(constraint)]
    }
  })
  return { drop: dropConstraintParameters }
}

const parseDropHighNotation = (
  notations: string[]
): Pick<Modifiers, 'drop'> => {
  const notationString = notations[notations.length -1]
  const highestCount = notationString.split(/[Hh]/)[1]

  return {
    drop: { highest: highestCount === '' ? 1 : Number(highestCount) }
  }
}

const parseDropLowNotation = (notations: ): Pick<Modifiers, 'drop'> => {
  const lowestCount = notationString.split(/[Ll]/)[1]

  return {
    drop: {
      lowest: lowestCount === '' ? 1 : Number(lowestCount)
    }
  }
}

const parseRerollNotation = ({
  rerollMatch: notationString
}: RerollMatch): Pick<Modifiers, 'reroll'> => {
  const parsedString = notationString
    .split(/[Rr]/)[1]
    .replaceAll('{', '')
    .replaceAll('}', ',!')
    .split(',')
  let rerollParameters: RerollOptions = {}
  parsedString.forEach((notation) => {
    if (notation === '!') {
      return
    }
    if (notation.includes('<')) {
      rerollParameters = {
        ...rerollParameters,
        lessThan: Number(notation.split('<')[1])
      }
      return
    }
    if (notation.includes('>')) {
      rerollParameters = {
        ...rerollParameters,
        greaterThan: Number(notation.split('>')[1])
      }
      return
    }
    if (notation.includes('!')) {
      rerollParameters = {
        ...rerollParameters,
        maxReroll: Number(notation.split('!')[1])
      }
      return
    }
    rerollParameters = {
      ...rerollParameters,
      exact: [
        ...(Array.isArray(rerollParameters?.exact)
          ? rerollParameters.exact
          : []),
        Number(notation)
      ]
    }
  })

  return { reroll: rerollParameters }
}

const parseExplodeNotation = ({
  explodeMatch: notationString
}: ExplodeMatch): Pick<Modifiers, 'explode'> => ({
  explode: Boolean(notationString)
})

const parseMinusNotation = ({
  minusMatch: notationString
}: MinusMatch): Pick<Modifiers, 'minus'> => ({
  minus: Number(notationString.split('-')[1])
})

const parsePlusNotation = ({
  plusMatch: notationString
}: PlusMatch): Pick<Modifiers, 'plus'> => ({
  plus: Number(notationString.split('+')[1])
})

const parseReplaceNotation = ({
  replaceMatch: notationString
}: ReplaceMatch): Pick<Modifiers, 'replace'> => {
  const replaceOptions = notationString
    .split(/[Vv]/)[1]
    .replaceAll('{', '')
    .replaceAll('}', '')
    .split(',')
    .map((replacement) => {
      const [noteFrom, noteTo] = replacement.split('=')

      const coreReplacement = { to: Number(noteTo) }
      if (noteFrom.includes('>')) {
        return {
          ...coreReplacement,
          from: { greaterThan: Number(noteFrom.replaceAll('>', '')) }
        }
      }
      if (noteFrom.includes('<')) {
        return {
          ...coreReplacement,
          from: { lessThan: Number(noteFrom.replaceAll('<', '')) }
        }
      }
      return { ...coreReplacement, from: Number(noteFrom) }
    })

  const replace =
    replaceOptions.length === 1
      ? replaceOptions[0]
      : replaceOptions.filter(Boolean)

  return { replace }
}

export const mergeModifiers = (
  oldModifiers: Modifiers,
  newModifiers: Modifiers
): Modifiers => {
  const newUniqueArg =
    typeof newModifiers.unique === 'object'
      ? {
          ...(typeof oldModifiers?.unique === 'object'
            ? oldModifiers?.unique
            : {}),
          ...newModifiers.unique
        }
      : newModifiers.unique

  const cap =
    'cap' in newModifiers
      ? { cap: { ...oldModifiers?.cap, ...newModifiers.cap } }
      : {}
  const drop =
    'drop' in newModifiers
      ? { drop: { ...oldModifiers?.drop, ...newModifiers.drop } }
      : {}
  const explode =
    'explode' in newModifiers ? { explode: newModifiers.explode } : {}
  const unique = 'unique' in newModifiers ? { unique: newUniqueArg } : {}
  const plus =
    'plus' in newModifiers
      ? { plus: (newModifiers.plus || 0) + (oldModifiers.plus || 0) }
      : {}
  const minus =
    'minus' in newModifiers
      ? {
          minus:
            Math.abs(newModifiers.minus || 0) -
            Math.abs(oldModifiers.minus || 0)
        }
      : {}

  const reroll =
    'reroll' in newModifiers
      ? {
          reroll: {
            ...(oldModifiers.reroll || {}),
            ...(newModifiers.reroll || {})
          } as RerollOptions
        }
      : {}
  const replace =
    'replace' in newModifiers
      ? {
          replace:
            Array.isArray(oldModifiers.replace) ||
            Array.isArray(newModifiers.replace)
              ? (
                  [
                    ...[oldModifiers.replace],
                    ...[newModifiers.replace]
                  ] as ReplaceOptions[]
                )
                  .flat()
                  .filter(Boolean)
              : {
                  ...oldModifiers.replace,
                  ...((newModifiers.replace || {}) as ReplaceOptions)
                }
        }
      : {}

  return {
    ...cap,
    ...drop,
    ...explode,
    ...unique,
    ...plus,
    ...minus,
    ...reroll,
    ...replace
  }
}

export const parseModifiers = ({
  dropConstraintsMatch,
  dropHighMatch,
  dropLowMatch,
  explodeMatch,
  uniqueMatch,
  replaceMatch,
  rerollMatch,
  capMatch,
  plusMatch,
  minusMatch
}: Exclude<MatchObject, 'coreNotationMatch'>): Modifiers => {
  const dropModifiers = {
    drop: {
      ...parseDropHighNotation(dropHighMatch)
      ...parseDropLowNotation(dropLowMatch),
      ...parseDropConstraintsNotation(dropConstraintsMatch),
    }
  }
  return {
    ...parseExplodeNotation(explodeMatch),
    ...parseUniqueNotation(uniqueMatch),
    ...parseReplaceNotation(replaceMatch),
    ...parseRerollNotation(rerollMatch),
    ...parseCapNotation(capMatch),
    ...parsePlusNotation(plusMatch),
    ...parseMinusNotation(minusMatch)
  }
}
