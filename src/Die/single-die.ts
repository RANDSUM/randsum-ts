const generateStandardSides = (sides: number): number[] =>
  Array.from({ length: Number(sides) }, (_, index) => index + 1)

export default abstract class SingleDie<D extends string | number> {
  sides: number

  faces: D[]

  constructor(sides: D extends number ? number : (number | string)[]) {
    const isCustom = Array.isArray(sides)
    this.sides = isCustom ? sides.length : Number(sides)
    this.faces = (isCustom ? sides : generateStandardSides(sides)) as D[]
  }

  roll(): D {
    return this.faces[this.rawRoll()]
  }

  protected rawRoll(): number {
    return Math.floor(Math.random() * Number(this.sides))
  }
}
