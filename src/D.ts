import { isCustomSidesD } from '~src/guards/isCustomSidesD'
import { isCustomSidesStringArg } from '~src/guards/isCustomSidesStringArg'
import { isD } from '~src/guards/isD'
import type { RollArgument, RollOptions, RollParameters } from '~types'
import { argumentToOptions } from '~utils/argumentToOptions'

type Type<T> = T extends string[] ? 'custom' : 'numerical'
type Faces<T> = T extends string[] ? T : number[]
type Result<F> = F extends number[] ? number : string

export class D<Sides extends string[] | number> {
  sides: number
  faces: Faces<Sides>
  type: Type<Sides>

  static forArgument<A extends string | number>(
    argument: RollArgument<A>
  ): RollParameters<A>['die'] {
    if (isD(argument)) {
      return argument as RollParameters<A>['die']
    }
    return new D(argumentToOptions(argument).sides) as RollParameters<A>['die']
  }

  constructor(sides: Sides) {
    if (isCustomSidesStringArg(sides)) {
      this.sides = sides.length
      this.type = 'custom' as Type<Sides>
      this.faces = sides as Faces<Sides>
      return
    }
    this.sides = sides
    this.type = 'numerical' as Type<Sides>
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

  toOptions(): RollOptions<Result<Faces<Sides>>> {
    return {
      quantity: 1,
      sides: this.sidesForOptions()
    }
  }

  protected _rawRollResult(): Result<Faces<Sides>> {
    return this.faces[this._rawRoll()] as Result<Faces<Sides>>
  }

  protected _rawRoll(): number {
    return Math.floor(Math.random() * Number(this.sides))
  }
  private sidesForOptions(): RollOptions<Result<Faces<Sides>>>['sides'] {
    if (this.isCustom)
      return this.faces as RollOptions<Result<Faces<Sides>>>['sides']
    return this.sides as RollOptions<Result<Faces<Sides>>>['sides']
  }

  private get isCustom(): boolean {
    return isCustomSidesD(this)
  }
}
