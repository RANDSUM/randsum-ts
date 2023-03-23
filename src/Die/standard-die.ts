import Die from './abstract'

export default class StandardDie extends Die<'standard'> {
  roll(): number {
    return this.rawRoll()
  }
}
