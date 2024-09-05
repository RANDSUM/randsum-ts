import {
  DiceParameters,
  DropOptions,
  GreaterLessOptions,
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

const parseCapNotation = (notations: string[]): Pick<Modifiers, 'cap'> => {
  return notations.reduce(
    (acc, notationString) => {
      const capString = notationString
        .split(/[Cc]/)[1]
        .replaceAll(/{|}/g, '')
        .split(',')

      const capOptions = capString.reduce((innerAcc, note) => {
        if (note.includes('<')) {
          return {
            ...innerAcc,
            lessThan: Number(note.replaceAll('<', ''))
          }
        }
        return {
          ...innerAcc,
          greaterThan: Number(note.replaceAll('>', ''))
        }
      }, {} as GreaterLessOptions)

      return {
        cap: {
          ...acc.cap,
          ...capOptions
        }
      }
    },
    { cap: {} } as Pick<Modifiers, 'cap'>
  )
}

const parseUniqueNotation = (
  notations: string[]
): Pick<Modifiers, 'unique'> => {
  return notations.reduce(
    (acc, notationString) => {
      if (notationString === 'u' || notationString === 'U') {
        if (typeof acc.unique === 'object') {
          return acc
        }
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
    },
    { unique: true } as Pick<Modifiers, 'unique'>
  )
}

const parseDropConstraintsNotation = (
  notations: string[]
): Pick<Modifiers, 'drop'> => {
  const dropConstraintParameters: Pick<
    DropOptions,
    'greaterThan' | 'lessThan'
  > & { exact: number[] } = { exact: [] }

  return notations.reduce(
    (acc, notationString) => {
      const constraints = notationString
        .split(/[Dd]/)[1]
        .replaceAll('{', '')
        .replaceAll('}', '')
        .split(',')
      const parsedConstraints = constraints.reduce((innerAcc, constraint) => {
        if (constraint.includes('<')) {
          return {
            ...innerAcc,
            lessThan: Number(constraint.split('<')[1])
          }
        }

        if (constraint.includes('>')) {
          return {
            ...innerAcc,
            greaterThan: Number(constraint.split('>')[1])
          }
        }

        return {
          ...innerAcc,
          exact: [...innerAcc.exact, Number(constraint)]
        }
      }, dropConstraintParameters)

      return {
        drop: {
          ...acc.drop,
          ...parsedConstraints
        }
      }
    },
    { drop: dropConstraintParameters }
  )
}

const parseDropHighNotation = (
  notations: string[]
): Pick<Modifiers, 'drop'> => {
  const notationString = notations[notations.length - 1]
  const highestCount = notationString.split(/[Hh]/)[1]

  return {
    drop: { highest: highestCount === '' ? 1 : Number(highestCount) }
  }
}

const parseDropLowNotation = (notations: string[]): Pick<Modifiers, 'drop'> => {
  const notationString = notations[notations.length - 1]
  const lowestCount = notationString.split(/[Ll]/)[1]

  return {
    drop: {
      lowest: lowestCount === '' ? 1 : Number(lowestCount)
    }
  }
}

const parseRerollNotation = (
  notations: string[]
): Pick<Modifiers, 'reroll'> => {
  return notations.reduce(
    (acc, notationString) => {
      const parsedString = notationString
        .split(/[Rr]/)[1]
        .replaceAll('{', '')
        .replaceAll('}', ',!')
        .split(',')

      const rerollOptions = parsedString.reduce((innerAcc, notation) => {
        if (notation === '!') {
          return innerAcc
        }
        if (notation.includes('<')) {
          return {
            ...innerAcc,
            lessThan: Number(notation.split('<')[1])
          }
        }
        if (notation.includes('>')) {
          return {
            ...innerAcc,
            greaterThan: Number(notation.split('>')[1])
          }
        }
        if (notation.includes('!')) {
          return {
            ...innerAcc,
            maxReroll: Number(notation.split('!')[1])
          }
        }
        return {
          ...innerAcc,
          exact: [
            ...(Array.isArray(innerAcc?.exact) ? innerAcc.exact : []),
            Number(notation)
          ]
        }
      }, {} as RerollOptions)

      return {
        reroll: {
          ...acc.reroll,
          ...rerollOptions
        }
      }
    },
    { reroll: {} }
  )
}

const parseExplodeNotation = (
  notations: string[]
): Pick<Modifiers, 'explode'> => ({
  explode: Boolean(notations.length > 0)
})

const parseMinusNotation = (notations: string[]): Pick<Modifiers, 'minus'> => {
  const minus = notations
    .map((notationString) => Number(notationString.split('-')[1]))
    .reduce((acc, num) => acc - num, 0)

  return {
    minus: minus
  }
}

const parsePlusNotation = (notations: string[]): Pick<Modifiers, 'plus'> => {
  const plus = notations
    .map((notationString) => Number(notationString.split('+')[1]))
    .reduce((acc, num) => acc + num, 0)

  return {
    plus
  }
}

const parseReplaceNotation = (
  notations: string[]
): Pick<Modifiers, 'replace'> => {
  const replace = notations.map((notationString) => {
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

    return replaceOptions.length === 1
      ? replaceOptions[0]
      : replaceOptions.filter(Boolean)
  }) as ReplaceOptions[]
  return { replace }
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
      ...parseDropHighNotation(dropHighMatch).drop,
      ...parseDropLowNotation(dropLowMatch).drop,
      ...parseDropConstraintsNotation(dropConstraintsMatch).drop
    }
  }
  return {
    ...dropModifiers,
    ...parseExplodeNotation(explodeMatch),
    ...parseUniqueNotation(uniqueMatch),
    ...parseReplaceNotation(replaceMatch),
    ...parseRerollNotation(rerollMatch),
    ...parseCapNotation(capMatch),
    ...parsePlusNotation(plusMatch),
    ...parseMinusNotation(minusMatch)
  }
}
