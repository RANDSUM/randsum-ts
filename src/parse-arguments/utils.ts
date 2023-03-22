import { DiceNotation, RollOptions } from '../types'
import { coreNotationPattern } from './regexp'

export const isRollOptions = (argument: unknown): argument is RollOptions =>
  typeof argument === 'object' && (argument as RollOptions).sides !== undefined

export const isDiceNotation = (argument: unknown): argument is DiceNotation =>
  !!coreNotationPattern.test(String(argument))
