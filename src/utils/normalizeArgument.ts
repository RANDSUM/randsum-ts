import { isD, isDiceNotationArg, isDicePoolOptions } from '~guards'
import { D } from '~src/D'
import type { RollArgument, RollOptions, RollParameters } from '~types'
import { notationToOptions } from './notationToOptions'
import { optionsToDescription } from './optionsToDescription'
import { optionsToNotation } from './optionsToNotation'

function toOptions(argument: RollArgument): RollOptions {
  switch (true) {
    case isDicePoolOptions(argument):
      return argument
    case isD(argument):
      return argument.toOptions()
    case isDiceNotationArg(argument):
      return notationToOptions(argument)
    default:
      if (Array.isArray(argument)) {
        return { quantity: 1, sides: argument.map(String) }
      }
      return { quantity: 1, sides: Number(argument) }
  }
}

function normalizeArgument(
  argument: RollArgument<number>
): RollParameters<number>
function normalizeArgument(
  argument: RollArgument<string>
): RollParameters<string>
function normalizeArgument(
  argument: RollArgument<string | number>
): RollParameters<string | number>
function normalizeArgument<S extends string | number>(
  argument: RollArgument<S>
): RollParameters<S> {
  const options = toOptions(argument)
  return {
    argument,
    options,
    die: findDie(argument),
    notation: optionsToNotation(options),
    description: optionsToDescription(options)
  } as RollParameters<S>
}

function findDie<S extends string | number>(
  argument: RollArgument<S>
): RollParameters<S>['die'] {
  if (isD(argument)) {
    return argument as RollParameters<S>['die']
  }
  return new D(toOptions(argument).sides) as RollParameters<S>['die']
}

export { normalizeArgument }
