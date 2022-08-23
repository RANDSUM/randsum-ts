import {
  Detailed,
  InternalRollParameters,
  RandsumOptions,
  RandsumOptionsWithoutSides,
  UserOptions
} from 'types'

import { normalizeModifiers } from './normalize-modifiers'

const defaultRollParameters: InternalRollParameters = {
  quantity: 1,
  sides: 20,
  modifiers: [],
  randomizer: undefined
}

export function convertOptionsToParameters<D extends boolean>({
  detailed,
  ...restOptions
}: RandsumOptions<D> | RandsumOptionsWithoutSides<D> | UserOptions<D>): {
  detailed: Detailed<D>
} & InternalRollParameters {
  const { quantity, sides, modifiers, ...restParsedOptions } = {
    ...defaultRollParameters,
    ...restOptions
  }

  if (detailed === undefined) {
    detailed = false as Detailed<D>
  }

  return {
    detailed: detailed === undefined ? (false as Detailed<D>) : detailed,
    sides: Number(sides),
    quantity: Number(quantity),
    modifiers: normalizeModifiers(modifiers),
    ...restParsedOptions
  }
}
