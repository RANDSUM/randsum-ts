import {
  capPattern,
  coreNotationPattern,
  dropConstraintsPattern,
  dropHighestPattern,
  dropLowestPattern,
  explodePattern,
  minusPattern,
  plusPattern,
  replacePattern,
  rerollPattern,
  uniquePattern
} from '~matchPattern'
import { DiceNotation, DicePoolOptions, Modifiers, RollArgument } from '~types'

const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${dropHighestPattern.source}|${dropLowestPattern.source}|${dropConstraintsPattern.source}|${explodePattern.source}|${uniquePattern.source}|${replacePattern.source}|${rerollPattern.source}|${capPattern.source}|${plusPattern.source}|${minusPattern.source}`,
  'g'
)

export const isDiceNotation = (argument: unknown): argument is DiceNotation => {
  const basicTest = !!coreNotationPattern.test(String(argument))
  if (!basicTest || !(typeof argument === 'string')) return false

  const cleanArg = argument.replace(/\s/g, '')

  return cleanArg.replace(completeRollPattern, '').length === 0
}

export const isCustomSides = (
  argument: RollArgument | undefined
): argument is string[] =>
  Array.isArray(argument) && argument.every((arg) => typeof arg === 'string')

export const isDicePoolOptions = (
  argument: unknown
): argument is DicePoolOptions =>
  typeof argument === 'object' &&
  (argument as DicePoolOptions).sides !== undefined

export const isValidModifier = (
  modifiers: unknown | Modifiers | undefined
): modifiers is Modifiers => Object.keys(modifiers || {}).length > 0
