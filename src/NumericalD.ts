import type { NumericDie, NumericRollOptions } from '~types'
import { coreSpreadRolls } from '~utils/coreSpreadRolls'
import { generateNumericalFaces } from '~utils/generateNumericalFaces'

export class NumericalD implements NumericDie {
  readonly sides: number
  readonly faces: number[]
  readonly type = 'numerical'
  readonly isCustom = false

  constructor(sides: number) {
    this.sides = sides
    this.faces = generateNumericalFaces(sides)
  }

  roll(quantity = 1): number {
    const rolls = this.rollSpread(quantity)
    return rolls.reduce((acc, roll) => acc + roll, 0)
  }

  rollSpread(quantity = 1): number[] {
    return coreSpreadRolls(quantity, this.sides, this.faces)
  }

  get toOptions(): NumericRollOptions {
    return {
      quantity: 1,
      sides: this.sides
    }
  }
}
