import type { BaseD, CustomRollOptions } from '~types'
import { coreSpreadRolls } from '~utils/coreSpreadRolls'

export class CustomD implements BaseD<string[]> {
  readonly sides: number
  readonly faces: string[]
  readonly type = 'custom'
  readonly isCustom = true

  constructor(faces: string[]) {
    if (!faces.length) {
      throw new Error('Custom die must have at least one face')
    }

    this.sides = faces.length
    this.faces = [...faces]
  }

  roll(quantity = 1): string {
    const rolls = this.rollSpread(quantity)
    return rolls.join(', ')
  }

  rollSpread(quantity = 1): string[] {
    return coreSpreadRolls(quantity, this.sides, this.faces)
  }

  get toOptions(): CustomRollOptions {
    return {
      quantity: 1,
      sides: [...this.faces]
    }
  }
}
