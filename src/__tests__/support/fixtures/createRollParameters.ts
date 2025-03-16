import { D } from '~src/D'
import type { Notation, RollArgument, RollParameters } from '~types'

export function createRollParameters<S extends string | number>(
  overrides: Partial<RollParameters<S>> = {}
): RollParameters<S> {
  return {
    die: new D(4) as S extends string ? D<string[]> : D<number>,
    argument: 1 as RollArgument<S>,
    notation: '1d4' as Notation<S>,
    description: ['Roll 1d4'],
    options: {
      sides: 4 as S extends number ? number : string[],
      quantity: 1,
      ...overrides.options
    },
    ...overrides
  }
}
