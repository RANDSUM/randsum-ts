import { isCustomSidesD } from '~src/guards/isCustomSidesD'
import { isCustomSidesStringArg } from '~src/guards/isCustomSidesStringArg'
import type { Die, Faces, Result, RollOptions, Type } from '~types'
import { coreSpreadRolls } from '~utils/coreSpreadRolls'
import { generateNumericalFaces } from '~utils/generateNumericalFaces'

export class D<Sides extends string[] | number> implements Die<Sides> {
  sides: number
  faces: Faces<Sides>
  type: Type<Sides>

  constructor(sides: Sides) {
    if (isCustomSidesStringArg(sides)) {
      this.sides = sides.length
      this.type = 'custom' as Type<Sides>
      this.faces = sides as Faces<Sides>
      return
    }
    this.sides = sides
    this.type = 'numerical' as Type<Sides>
    this.faces = generateNumericalFaces(sides) as Faces<Sides>
  }

  roll(quantity = 1): Result<Faces<Sides>> {
    const rolls = this.rollSpread(quantity)
    if (this.isCustom) return rolls.join(', ') as Result<Faces<Sides>>
    return rolls.reduce<number>(
      (acc, roll) => acc + (roll as number),
      0
    ) as Result<Faces<Sides>>
  }

  rollSpread(quantity = 1): Result<Faces<Sides>>[] {
    return coreSpreadRolls<string | number>(
      quantity,
      this.sides,
      this.faces
    ) as Result<Faces<Sides>>[]
  }

  get toOptions(): RollOptions<Result<Faces<Sides>>> {
    return {
      quantity: 1,
      sides: this.sidesForOptions()
    }
  }

  private sidesForOptions(): RollOptions<Result<Faces<Sides>>>['sides'] {
    if (this.isCustom)
      return this.faces as RollOptions<Result<Faces<Sides>>>['sides']
    return this.sides as RollOptions<Result<Faces<Sides>>>['sides']
  }

  get isCustom(): boolean {
    return isCustomSidesD(this)
  }
}
