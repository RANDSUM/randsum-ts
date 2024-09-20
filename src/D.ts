import { isCustomSides } from '~guards'

type Faces<T> = T extends string[] ? T : number[]
type Result<T> = T extends number[] ? number : string

class D<Sides extends string[] | number> {
  sides: number
  faces: Faces<Sides>

  constructor(sides: Sides) {
    if (isCustomSides(sides)) {
      this.sides = sides.length
      this.faces = sides as Faces<Sides>
      return
    }
    this.sides = sides
    this.faces = Array.from(
      { length: Number(sides) },
      (_, index) => index + 1
    ) as Faces<Sides>
  }

  roll(): Result<Faces<Sides>> {
    return this.faces[this.rawRoll()] as Result<Faces<Sides>>
  }

  protected rawRoll(): number {
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
