import { SingleDie } from '../Die'
import { CustomSides, DiceOptions, DicePoolOptions } from './options'
import { Concrete, DiceNotation } from './primitives'

export type DiceParameters<D extends string | number = number> = Concrete<
  Omit<DiceOptions<D>, 'modifiers'>
>

export interface DicePoolParameters<D extends string | number> {
  argument:
    | number
    | undefined
    | DicePoolOptions<number | string>
    | DiceNotation<number | string>
    | CustomSides
  options: DiceOptions<D>
  die: SingleDie<D>
}

export interface RollParameters {
  dicePools: {
    [key: string]: DicePoolParameters<string | number>
  }
}
