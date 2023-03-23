import roll from '../roll'
import { RollResult } from '../types'
import Die from './abstract'

export default class CustomDie extends Die<'customSides'> {
  roll(): RollResult<'customSides'> {
    return roll({ sides: this.sides })
  }
}
