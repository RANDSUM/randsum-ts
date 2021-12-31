import { RerollOptions } from '../../types'
import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'

export function convertRerollOptionsToParameters({
  exact,
  maxReroll,
  ...restOptions
}: RerollOptions): RerollOptions<number> {
  const convertedExact =
    exact !== undefined ? { exact: Array.isArray(exact) ? exact.map(number => Number(number)) : [Number(exact)] } : {}
  return {
    ...convertCapOptionsToParameters(restOptions),
    ...convertedExact,
    maxReroll: maxReroll !== undefined ? Number(maxReroll) : undefined,
  }
}
