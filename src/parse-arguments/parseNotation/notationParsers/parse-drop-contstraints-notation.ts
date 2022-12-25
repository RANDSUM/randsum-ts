import { DropConstraintsMatch, DropModifier, DropOptions } from 'types'

export default function parseDropConstraintsNotation({
  dropConstraintsMatch: notationString
}: DropConstraintsMatch): DropModifier<number> {
  let dropConstraintParameters: Pick<
    DropOptions<number>,
    'exact' | 'greaterThan' | 'lessThan'
  > = { exact: [] }
  const constraints = notationString
    .split('d')[1]
    .replace(/{/g, '')
    .replace(/}/g, '')
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

      exact: [...(dropConstraintParameters?.exact || []), Number(constraint)]
    }
  })
  return { drop: dropConstraintParameters }
}
