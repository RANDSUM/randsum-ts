import { SingleDie } from '../Die'
import { RollArgument } from './argument'
import { DicePoolOptions } from './options'
import { Concrete } from './primitives'

export type DiceParameters<D extends string | number = number> = Concrete<
  Omit<DicePoolOptions<D>, 'modifiers'>
>

export interface DicePoolParameters<D extends string | number> {
  argument: RollArgument
  options: DicePoolOptions<D>
  die: SingleDie<D>
}

export interface RollParameters {
  dicePools: {
    [key: string]: DicePoolParameters<string> | DicePoolParameters<number>
  }
}
