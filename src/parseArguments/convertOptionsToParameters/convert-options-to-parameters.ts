import {
  InternalRollParameters,
  RandsumOptions,
  RandsumOptionsWithCustomSides,
  SecondArgument,
  UserOptions
} from 'types'

import { normalizeModifiers } from './normalize-modifiers'

const defaultRollParameters = {
  quantity: 1,
  sides: 20,
  modifiers: [],
  faces: undefined,
  randomizer: undefined
}

export function convertOptionsToParameters<D extends boolean>({
  detailed,
  ...restOptions
}:
  | RandsumOptions<D>
  | RandsumOptionsWithCustomSides<D>
  | SecondArgument<D>): Pick<UserOptions<D>, 'detailed'> &
  InternalRollParameters {
  const { quantity, sides, modifiers, faces, ...restParsedOptions } = {
    ...defaultRollParameters,
    ...restOptions
  }

  return {
    detailed,
    sides: Array.isArray(faces) ? faces.length : Number(sides),
    quantity: Number(quantity),
    modifiers: normalizeModifiers(modifiers),
    faces,
    ...restParsedOptions
  }
}
