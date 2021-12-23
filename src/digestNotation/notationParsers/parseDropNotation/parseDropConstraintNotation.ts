import { dropConstraints } from 'digestNotation/matchers'
import { DropOptions } from 'types'

export function parseDropConstrainNotation(modifierString: string) {
  const match = modifierString.match(dropConstraints)

  if (!match) {
    return {}
  }

  const constraints = match[0].toLowerCase().split('d')[1].replace('{', '').replace('}', '').split(',')
  return constraints.reduce<DropOptions & { exact: number[] }>(
    (params, constraint) => {
      switch (true) {
        case constraint.includes('<'):
          return { ...params, lessThan: Number(constraint.split('<')[1]) }
        case constraint.includes('>'):
          return { ...params, greaterThan: Number(constraint.split('>')[1]) }
        default:
          return { ...params, exact: [...params.exact, Number(constraint)] }
      }
    },
    { exact: [] },
  )
}
