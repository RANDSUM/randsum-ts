import roll from '../roll'
import { RollResult } from '../types'
import Die from './abstract'

export default class StandardDie extends Die<'standard'> {
  roll(): RollResult<'standard'> {
    return roll({ sides: this.sides })
  }
}
