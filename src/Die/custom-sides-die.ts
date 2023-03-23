import Die from './abstract'

export default class CustomSidesDie extends Die<'customSides'> {
  roll(): string | number {
    return this.sides[this.rawRoll()]
  }
}
