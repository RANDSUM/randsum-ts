import { completeRollPattern, coreNotationPattern } from '~matchPattern'
import { DiceNotation, DicePoolOptions, Modifiers, RollArgument } from '~types'

export const isDiceNotation = (argument: unknown): argument is DiceNotation => {
  const basicTest = !!coreNotationPattern.test(String(argument))
  if (!basicTest || !(typeof argument === 'string')) return false

  const cleanArg = argument.replace(/\s/g, '')

  const matches = []

  let parsed: RegExpExecArray | null
  while ((parsed = completeRollPattern.exec(cleanArg))) {
    if (parsed && parsed.groups) {
      matches.push(Object.values(parsed.groups))
    }
  }

  const remaining = matches.flat().reduce((acc, curr) => {
    return acc.replace(curr, '')
  }, cleanArg)

  return remaining.length === 0
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
