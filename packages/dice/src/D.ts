import type {
  CustomRollOptions,
  ModifierOptions,
  NumericRollOptions
} from '@randsum/core'
import { roll } from './roll'
import type { BaseD, CustomRollResult, NumericRollResult } from './types'
import { coreSpreadRolls } from './utils/coreSpreadRolls'
import { generateNumericalFaces } from './utils/generateNumericalFaces'

export class D<T extends number | string[]> implements BaseD<T> {
  readonly sides: number
  readonly faces: T extends number ? number[] : string[]
  readonly type: T extends number ? 'numerical' : 'custom'
  readonly isCustom: T extends number ? false : true

  constructor(arg: T) {
    if (typeof arg === 'number') {
      if (!Number.isInteger(arg) || arg < 1) {
        throw new Error(
          'Die must have at least one side with a positive integer value'
        )
      }
      this.sides = arg
      this.faces = generateNumericalFaces(arg) as T extends number
        ? number[]
        : string[]
      this.type = 'numerical' as T extends number ? 'numerical' : 'custom'
      this.isCustom = false as T extends number ? false : true
    } else {
      if (!arg.length) {
        throw new Error('Custom die must have at least one face')
      }
      this.sides = arg.length
      this.faces = [...(arg as string[])] as T extends number
        ? number[]
        : string[]
      this.type = 'custom' as T extends number ? 'numerical' : 'custom'
      this.isCustom = true as T extends number ? false : true
    }
  }

  roll(quantity = 1): T extends number ? number : string {
    const rolls = this.rollSpread(quantity)
    if (this.type === 'numerical') {
      return (rolls as number[]).reduce(
        (acc, roll) => acc + roll,
        0
      ) as T extends number ? number : string
    }
    return (rolls as string[]).join(', ') as T extends number ? number : string
  }

  rollSpread(quantity = 1): T extends number ? number[] : string[] {
    return coreSpreadRolls<string | number>(
      quantity,
      this.sides,
      this.faces
    ) as T extends number ? number[] : string[]
  }

  rollModified(
    quantity: number,
    modifiers: ModifierOptions = {}
  ): T extends number ? NumericRollResult : CustomRollResult {
    return roll({
      ...this.toOptions,
      quantity,
      modifiers
    } as NumericRollOptions) as T extends number
      ? NumericRollResult
      : CustomRollResult
  }

  get toOptions(): T extends number ? NumericRollOptions : CustomRollOptions {
    if (this.type === 'numerical') {
      return {
        quantity: 1,
        sides: this.sides
      } as T extends number ? NumericRollOptions : CustomRollOptions
    }
    return {
      quantity: 1,
      sides: [...this.faces] as string[]
    } as T extends number ? NumericRollOptions : CustomRollOptions
  }
}
