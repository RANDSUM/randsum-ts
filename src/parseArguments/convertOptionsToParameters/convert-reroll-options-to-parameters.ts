import { RerollOptions } from 'types'

import { convertGreaterLessOptionsToParameters } from './convert-greater-less-options-to-parameters'

export function convertRerollOptionsToParameters({
  exact,
  maxReroll,
  ...restOptions
}: RerollOptions): RerollOptions<number> {
  const convertedExact =
    exact !== undefined
      ? { exact: Array.isArray(exact) ? exact.map(Number) : [Number(exact)] }
      : {}
  return {
    ...convertGreaterLessOptionsToParameters(restOptions),
    ...convertedExact,
    maxReroll: maxReroll !== undefined ? Number(maxReroll) : undefined,
  }
}
