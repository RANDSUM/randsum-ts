import { DropOptions } from 'types'

export function parseDropConstrainNotation(notationString: string) {
  const constraints = notationString.split('d')[2].replace(/{/g, '').replace(/}/g, '').split(',')
  return constraints.reduce<DropOptions & { exact: number[] }>(
    (parameters, constraint) => {
      switch (true) {
        case constraint.includes('<'):
          return { ...parameters, lessThan: Number(constraint.split('<')[1]) }
        case constraint.includes('>'):
          return { ...parameters, greaterThan: Number(constraint.split('>')[1]) }
        default:
          return { ...parameters, exact: [...parameters.exact, Number(constraint)] }
      }
    },
    { exact: [] },
  )
}
