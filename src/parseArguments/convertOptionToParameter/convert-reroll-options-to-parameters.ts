import { RerollOptions } from 'types'

import { convertCapOptionsToParameters } from './convert-cap-options-to-parameters'

export function convertRerollOptionsToParameters({
  on,
  maxReroll,
  ...restOptions
}: RerollOptions<'options'>): RerollOptions<'parameters'> {
  return {
    ...convertCapOptionsToParameters(restOptions),
    on: on ? (Array.isArray(on) ? on.map(number => Number(number)) : Number(on)) : undefined,
    maxReroll: maxReroll ? Number(maxReroll) : undefined,
  }
}
