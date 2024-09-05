import {
  DiceParameters,
  DropOptions,
  GreaterLessOptions,
  Modifiers,
  RerollOptions
} from '~types'

export type MatchObject = {
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
    { unique: false } as Pick<Modifiers, 'unique'>
  )
}

const parseDropConstraintsNotation = (
  notations: string[]
): Pick<Modifiers, 'drop'> => {
  const dropConstraintParameters: DropOptions = {}

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
          exact: [...(innerAcc?.exact || []), Number(constraint)]
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
  if (!notationString) {
    return { drop: {} }
  }

  const highestCount = notationString.split(/[Hh]/)[1]

  return {
    drop: { highest: highestCount === '' ? 1 : Number(highestCount) }
  }
}

const parseDropLowNotation = (notations: string[]): Pick<Modifiers, 'drop'> => {
  const notationString = notations[notations.length - 1]
  if (!notationString) {
    return { drop: {} }
  }
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
    minus: Math.abs(minus)
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
  const replace = notations
    .map((notationString) => {
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
    })
    .flat()
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
}: Exclude<MatchObject, 'coreNotationMatch'>):
  | Modifiers
  | Record<never, never> => {
  const dropHighModifiers = dropHighMatch.length
    ? parseDropHighNotation(dropHighMatch)
    : {}
  const dropLowModifiers = dropLowMatch.length
    ? parseDropLowNotation(dropLowMatch)
    : {}
  const dropConstraintsModifiers = dropConstraintsMatch
    ? parseDropConstraintsNotation(dropConstraintsMatch)
    : {}

  const dropModifiers =
    dropHighModifiers.drop ||
    dropLowModifiers.drop ||
    dropConstraintsModifiers.drop
      ? {
          drop: {
            ...dropHighModifiers.drop,
            ...dropLowModifiers.drop,
            ...dropConstraintsModifiers.drop
          }
        }
      : {}
  const explodeModifiers = explodeMatch.length
    ? parseExplodeNotation(explodeMatch)
    : {}
  const uniqueModifiers = uniqueMatch.length
    ? parseUniqueNotation(uniqueMatch)
    : {}
  const replaceModifiers = replaceMatch.length
    ? parseReplaceNotation(replaceMatch)
    : {}
  const rerollModifiers = rerollMatch.length
    ? parseRerollNotation(rerollMatch)
    : {}
  const capModifiers = capMatch.length ? parseCapNotation(capMatch) : {}
  const plusModifiers = plusMatch.length ? parsePlusNotation(plusMatch) : {}
  const minusModifiers = minusMatch.length ? parseMinusNotation(minusMatch) : {}

  const modifiers = {
    ...dropModifiers,
    ...minusModifiers,
    ...plusModifiers,
    ...capModifiers,
    ...explodeModifiers,
    ...replaceModifiers,
    ...rerollModifiers,
    ...uniqueModifiers
  }

  return Object.keys(modifiers).length ? { modifiers } : {}
}
