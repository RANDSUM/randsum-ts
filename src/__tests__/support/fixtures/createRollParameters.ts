import { D } from '~src/D'
import type { RollParams } from '~types'

export function createRollParameters(
  overrides: Partial<RollParams> = {}
): RollParams {
  return {
    die: new D(4),
    argument: 1,
    notation: '1d4',
    description: ['Roll 1d4'],
    options: {
      sides: 4,
      quantity: 1,
      ...overrides.options
    },
    ...overrides
  } as RollParams
}
