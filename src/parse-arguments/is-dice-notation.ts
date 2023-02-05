import { DiceNotation } from '../types'
import { coreNotationPattern } from './regexp'

const isDiceNotation = (argument: unknown): argument is DiceNotation =>
  !!coreNotationPattern.test(String(argument))

export default isDiceNotation
