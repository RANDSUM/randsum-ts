import { DiceOptions } from '../types/options'
import { DieType } from '../types/primitives'
import { CustomSidesDie, dieFactory, StandardDie } from './single-die'

abstract class DicePool<T extends DieType = DieType> {
  public dice: T extends 'standard' ? StandardDie[] : CustomSidesDie[]

  constructor(
    diceOptions: T extends 'standard'
      ? DiceOptions[]
      : DiceOptions<'customSides'>[]
  ) {
    const dice = diceOptions.flatMap((die) => {
      const quantity = Number(die.quantity || 1)

      return [...Array(quantity).keys()].map(() => dieFactory(die.sides))
    })

    this.dice = dice as T extends 'standard' ? StandardDie[] : CustomSidesDie[]
  }

  roll(): T extends 'standard' ? number[] : (number | string)[] {
    return this.dice.map((die) => die.roll()) as T extends 'standard'
      ? number[]
      : (number | string)[]
  }
}

export class StandardDicePool extends DicePool<'standard'> {}
export class CustomSidesDicePool extends DicePool<'customSides'> {}

const isCustomSidesDiceOptions = (
  options: (DiceOptions | DiceOptions<'customSides'>)[]
): options is DiceOptions<'customSides'>[] =>
  options.every(({ sides }) => Array.isArray(sides))

function dicePoolFactory(options: DiceOptions[]): StandardDicePool
function dicePoolFactory(
  options: DiceOptions<'customSides'>[]
): CustomSidesDicePool
function dicePoolFactory<T extends DieType>(
  options: T extends 'standard' ? DiceOptions[] : DiceOptions<'customSides'>[]
): T extends 'standard' ? StandardDicePool : CustomSidesDicePool
function dicePoolFactory(
  options: DiceOptions[] | DiceOptions<'customSides'>[]
): StandardDicePool | CustomSidesDicePool {
  if (isCustomSidesDiceOptions(options)) {
    return new CustomSidesDicePool(options)
  }
  return new StandardDicePool(options)
}

export { dicePoolFactory }
