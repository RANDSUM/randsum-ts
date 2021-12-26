import { RerollOptions } from 'types'

import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'

export function convertRerollOptionsToParameters({
  on,
  maxReroll,
  ...restOptions
}: RerollOptions): RerollOptions<number> {
  return {
    ...convertCapOptionsToParameters(restOptions),
    on: on !== undefined ? (Array.isArray(on) ? on.map(number => Number(number)) : Number(on)) : undefined,
    maxReroll: maxReroll !== undefined ? Number(maxReroll) : undefined,
  }
}
