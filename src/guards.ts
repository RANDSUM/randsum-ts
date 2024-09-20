import { completeRollPattern, coreNotationPattern } from '~patterns'
import {
  RandsumNotation,
  RandsumRollOptions,
  RandsumRollParameters,
  Modifiers,
  RandsumRollArgument,
  DicePoolType
} from '~types'
import { D } from './D'

export function isDiceNotationArg(
  argument: unknown
): argument is RandsumNotation {
  const notAString = typeof argument !== 'string'
  const basicTest = !!coreNotationPattern.test(String(argument))
  if (!basicTest || notAString) return false

  const cleanArg = argument.replace(/\s/g, '')

  return cleanArg.replace(completeRollPattern, '').length === 0
}

export function isCustomSidesArg(
  argument: RandsumRollArgument
): argument is string[] {
  return (
    Array.isArray(argument) && argument.every((arg) => typeof arg === 'string')
  )
}

export function isDicePoolOptions(
  argument: unknown
): argument is RandsumRollOptions {
  return (
    typeof argument === 'object' &&
    (argument as RandsumRollOptions).sides !== undefined
  )
}

export function isValidModifier(
  modifiers: unknown | Modifiers | undefined
): modifiers is Modifiers {
  return Object.keys(modifiers || {}).length > 0
}

export function isCustomParameters(
  poolParameters: RandsumRollParameters
): poolParameters is RandsumRollParameters<string> {
  return Array.isArray(poolParameters.options.sides)
}

export function isFullNumArray(arr: unknown[]): arr is number[] {
  return arr.every((item) => typeof item === 'number')
}

export function isD(arg: unknown): arg is D<number | string[]> {
  return arg instanceof D
}

export function isCustomSidesD(arg: D<number | string[]>): arg is D<string[]> {
  return arg.type === DicePoolType.custom
}
