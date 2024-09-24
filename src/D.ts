import { isCustomSidesD, isCustomSidesStringArg } from '~guards'
import { DicePoolType, RandsumRollOptions } from '~types'

type Type<T> = T extends string[] ? DicePoolType.custom : DicePoolType.numerical
type Faces<T> = T extends string[] ? T : number[]
type Result<F> = F extends number[] ? number : string

class D<Sides extends string[] | number> {
  sides: number
  faces: Faces<Sides>
  type: Type<Sides>

  constructor(sides: Sides) {
    if (isCustomSidesStringArg(sides)) {
      this.sides = sides.length
      this.type = DicePoolType.custom as Type<Sides>
      this.faces = sides as Faces<Sides>
      return
    }
    this.sides = sides
    this.type = DicePoolType.numerical as Type<Sides>
    this.faces = Array.from(
      { length: Number(sides) },
      (_, index) => index + 1
    ) as Faces<Sides>
  }

  roll(): Result<Faces<Sides>> {
    return this._rawRollResult()
  }

  rollMany(quantity: number): Result<Faces<Sides>>[] {
    return Array.from({ length: quantity }, () => this._rawRollResult())
  }

  toOptions(): RandsumRollOptions<Result<Faces<Sides>>> {
    return {
      quantity: 1,
      sides: isCustomSidesD(this) ? this.faces : this.sides
    } as RandsumRollOptions<Result<Faces<Sides>>>
  }

  protected _rawRollResult(): Result<Faces<Sides>> {
    return this.faces[this._rawRoll()] as Result<Faces<Sides>>
  }

  protected _rawRoll(): number {
    return Math.floor(Math.random() * Number(this.sides))
  }
}

const D4 = new D(4)
const D6 = new D(6)
const D8 = new D(8)
const D10 = new D(10)
const D12 = new D(12)
const D20 = new D(20)
const D100 = new D(100)
const FudgeDice = new D(['+', '+', '+', '-', '0', '0'])

export { D, D4, D6, D8, D10, D12, D20, D100, FudgeDice }
