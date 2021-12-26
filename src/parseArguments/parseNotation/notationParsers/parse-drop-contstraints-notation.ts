import { DropOptions } from 'types'

export function parseDropConstraintsNotation(notationString: string) {
  let dropConstraintParameters: Pick<DropOptions<'parameters'>, 'exact' | 'greaterThan' | 'lessThan'> = { exact: [] }
  const constraints = notationString.split('d')[2].replace(/{/g, '').replace(/}/g, '').split(',')
  for (const constraint of constraints) {
    if (constraint.includes('<')) {
      dropConstraintParameters = { ...dropConstraintParameters, lessThan: Number(constraint.split('<')[1]) }
      continue
    }
    if (constraint.includes('>')) {
      dropConstraintParameters = { ...dropConstraintParameters, greaterThan: Number(constraint.split('>')[1]) }
      continue
    }
    dropConstraintParameters = {
      ...dropConstraintParameters,
      exact: [
        ...(Array.isArray(dropConstraintParameters?.exact) ? dropConstraintParameters.exact : []),
        Number(constraint),
      ],
    }
  }
  return dropConstraintParameters
}
