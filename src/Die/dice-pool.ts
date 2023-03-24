import { DiceOptions } from '../types/options'
import { DieSides } from '../types/primitives'
import { CustomSidesDie, dieFactory, StandardDie } from './single-die'

abstract class DicePool<T extends DieSides> {
  public dice: T extends number ? StandardDie[] : CustomSidesDie[]

  constructor(
    diceOptions: T extends number ? DiceOptions[] : DiceOptions<string>[]
  ) {
    const dice = diceOptions.flatMap((die) => {
      const quantity = Number(die.quantity || 1)

      return [...Array(quantity).keys()].map(() => dieFactory(die.sides))
    })

    this.dice = dice as T extends number ? StandardDie[] : CustomSidesDie[]
  }

  roll(): T[] {
    return this.dice.map((die) => die.roll()) as T[]
  }
}

export class StandardDicePool extends DicePool<number> {}
export class CustomSidesDicePool extends DicePool<string> {}

const isCustomSidesDiceOptions = (
  options: (DiceOptions | DiceOptions<string>)[]
): options is DiceOptions<string>[] =>
  options.every(({ sides }) => Array.isArray(sides))

function dicePoolFactory(options: DiceOptions[]): StandardDicePool
function dicePoolFactory(options: DiceOptions<string>[]): CustomSidesDicePool
function dicePoolFactory<T extends DieSides>(
  options: T extends number ? DiceOptions[] : DiceOptions<string>[]
): T extends number ? StandardDicePool : CustomSidesDicePool
function dicePoolFactory(
  options: DiceOptions[] | DiceOptions<string>[]
): StandardDicePool | CustomSidesDicePool {
  if (isCustomSidesDiceOptions(options)) {
    return new CustomSidesDicePool(options)
  }
  return new StandardDicePool(options)
}

export { dicePoolFactory }
