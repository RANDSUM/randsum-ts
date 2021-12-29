import { RerollOptions } from '../../types'
import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'

export function convertRerollOptionsToParameters({
  exact,
  maxReroll,
  ...restOptions
}: RerollOptions): RerollOptions<number> {
  return {
    ...convertCapOptionsToParameters(restOptions),
    exact:
      exact !== undefined ? (Array.isArray(exact) ? exact.map(number => Number(number)) : Number(exact)) : undefined,
    maxReroll: maxReroll !== undefined ? Number(maxReroll) : undefined,
  }
}
