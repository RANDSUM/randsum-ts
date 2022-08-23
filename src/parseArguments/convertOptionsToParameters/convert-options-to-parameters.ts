import { InternalRollParameters, SecondArgument, UserOptions } from 'types'

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
}: SecondArgument<D>): Pick<UserOptions<D>, 'detailed'> &
  InternalRollParameters {
  const { quantity, sides, modifiers, ...restParsedOptions } = {
    ...defaultRollParameters,
    ...restOptions
  }

  return {
    detailed,
    sides: Number(sides),
    quantity: Number(quantity),
    modifiers: normalizeModifiers(modifiers),
    ...restParsedOptions
  }
}
