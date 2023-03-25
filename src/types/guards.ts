import { coreNotationPattern } from '../constants/regexp'
import {
  CapModifier,
  DropModifier,
  ExplodeModifier,
  MinusModifier,
  Modifier,
  PlusModifier,
  ReplaceModifier,
  RerollModifier,
  RollOptions,
  UniqueModifier
} from './options'
import { RollParameters } from './parameters'
import { DiceNotation } from './primitives'
import { RollResult } from './results'

export const isRollOptions = (
  argument: unknown
): argument is RollOptions | RollOptions<string> =>
  typeof argument === 'object' &&
  (argument as RollOptions | RollOptions<string>).sides !== undefined

export const isCustomSidesRollOptions = (
  argument: RollOptions | RollOptions<string>
): argument is RollOptions<string> =>
  Array.isArray((argument as RollOptions<string>).sides)

export const isCustomSidesRollParameters = (
  argument: RollParameters | RollParameters<string>
): argument is RollParameters<string> =>
  (argument as RollParameters<string>).diceOptions.every(({ sides }) =>
    Array.isArray(sides)
  )

export const isCustomSidesRollResult = (
  argument: RollResult | RollResult<string>
): argument is RollResult<string> => typeof argument.total === 'string'

export const isDiceNotation = (
  argument: unknown
): argument is DiceNotation | DiceNotation<string> =>
  !!coreNotationPattern.test(String(argument))

const isModifierType = <M extends Modifier<number | 'inclusive'>>(
  argument: Modifier<number | 'inclusive'>,
  key: keyof M
): argument is M => (argument as M)[key] !== undefined

export const isCapModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is CapModifier<N> => isModifierType<CapModifier<N>>(modifier, 'cap')

export const isDropModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is DropModifier<N> =>
  isModifierType<DropModifier<N>>(modifier, 'drop')

export const isRerollModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is RerollModifier<N> =>
  isModifierType<RerollModifier<N>>(modifier, 'reroll')

export const isReplaceModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is ReplaceModifier<N> =>
  isModifierType<ReplaceModifier<N>>(modifier, 'replace')

export const isUniqueModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is UniqueModifier<N> =>
  isModifierType<UniqueModifier<N>>(modifier, 'unique')

export const isExplodeModifier = (
  modifier: Modifier<number | 'inclusive'>
): modifier is ExplodeModifier =>
  isModifierType<ExplodeModifier>(modifier, 'explode')

export const isPlusModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is PlusModifier<N> =>
  isModifierType<PlusModifier<N>>(modifier, 'plus')

export const isMinusModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is MinusModifier<N> =>
  isModifierType<MinusModifier<N>>(modifier, 'minus')
