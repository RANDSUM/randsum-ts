import { RollModifier } from './types'

export class RollLog {
  public readonly total: number
  public readonly results: number[]
  public readonly modifier?: RollModifier
  public readonly dateRolled: Date

  constructor(total: number, results: number[], modifier?: RollModifier) {
    this.total = total
    this.results = results
    this.modifier = modifier
    this.dateRolled = new Date(Date.now())
  }
}
