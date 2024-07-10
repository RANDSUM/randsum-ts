import { completeRollPattern, coreNotationPattern } from '~constants'
import { DiceNotation, DicePoolOptions, Modifiers, RollArgument } from '~types'

export const isDiceNotation = (
  argument: unknown
): argument is DiceNotation<number> | DiceNotation<string> => {
  const basicTest = !!coreNotationPattern.test(String(argument))
  if (!basicTest || !(typeof argument === 'string')) return false

  const matches = [...argument.matchAll(completeRollPattern)].map(
    (arr) => arr[0]
  )

  const remaining = matches
    .reduce((acc, curr) => {
      return acc.replace(curr, '')
    }, argument)
    .replace(/\s/g, '')
    .replace(/\+|\-|\<|\>|\=/g, '')

  return remaining.length === 0
}

export const isCustomSides = (
  argument: RollArgument | undefined
): argument is string[] =>
  Array.isArray(argument) && argument.every((arg) => typeof arg === 'string')

export const isDicePoolOptions = (
  argument: unknown
): argument is DicePoolOptions<number> | DicePoolOptions<string> =>
  typeof argument === 'object' &&
  (argument as DicePoolOptions<number> | DicePoolOptions<string>).sides !==
    undefined

export const isValidModifier = (
  modifiers: {} | Modifiers | undefined
): modifiers is Modifiers => Object.keys(modifiers || {}).length > 0
