import type { DropOptions, Modifiers } from '~types'

export function parseDropConstraintsNotation(
  notations: string[]
): Pick<Modifiers, 'drop'> {
  if (notations.length === 0) {
    return {}
  }
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

        const exact = [...(innerAcc?.exact || []), Number(constraint)]

        if (exact.length <= 0) {
          return innerAcc
        }

        return {
          ...innerAcc,
          exact
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
