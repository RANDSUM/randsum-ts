import { SingleDie } from '../Die'
import { CustomSides, DiceOptions, DicePoolOptions } from './options'
import { Concrete, DiceNotation } from './primitives'

export type DiceParameters<D extends string | number = number> = Concrete<
  Omit<DiceOptions<D>, 'modifiers'>
>
// Refactor

export interface DicePoolParameters<D extends string | number = number> {
  argument:
    | number
    | undefined
    | DicePoolOptions<number | string>
    | DiceNotation<number | string>
    | CustomSides
  diceOptions: DiceOptions<D>
  die: SingleDie<D>
}

export interface RollParameters<D extends string | number = number> {
  dicePools: {
    [key: string]: DicePoolParameters<D>
  }
}
