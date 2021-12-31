import { RerollOptions } from '../../types'
import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'

export function convertRerollOptionsToParameters({
  exact,
  maxReroll,
  ...restOptions
}: RerollOptions): RerollOptions<number> {
  return {
    ...convertCapOptionsToParameters(restOptions),
    ...(exact !== undefined
      ? Array.isArray(exact)
        ? { exact: exact.map(number => Number(number)) }
        : { exact: [Number(exact)] }
      : {}),
    maxReroll: maxReroll !== undefined ? Number(maxReroll) : undefined,
  }
}
