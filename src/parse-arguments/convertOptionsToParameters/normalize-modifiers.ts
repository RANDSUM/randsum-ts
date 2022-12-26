import {
  DropOptions,
  GreaterLessOptions,
  Modifier,
  ReplaceOptions,
  RerollOptions
} from 'types'
import {
  isCapModifier,
  isDropModifier,
  isExplodeModifier,
  isPlusModifier,
  isReplaceModifier,
  isRerollModifier,
  isUniqueModifier
} from 'utils'

export function convertDropOptionsToParameters({
  highest,
  lowest,
  greaterThan,
  lessThan,
  exact
}: DropOptions): DropOptions<number> {
  return {
    highest: highest === undefined ? undefined : Number(highest),
    lowest: lowest === undefined ? undefined : Number(lowest),
    greaterThan: greaterThan === undefined ? undefined : Number(greaterThan),
    lessThan: lessThan === undefined ? undefined : Number(lessThan),
    exact: exact === undefined ? undefined : exact.map(Number)
  }
}

export function convertGreaterLessOptionsToParameters({
  greaterThan,
  lessThan
}: GreaterLessOptions): GreaterLessOptions<number> {
  return {
    greaterThan: greaterThan === undefined ? undefined : Number(greaterThan),
    lessThan: lessThan === undefined ? undefined : Number(lessThan)
  }
}

export function convertReplaceOptionsToParameters({
  from,
  to
}: ReplaceOptions): ReplaceOptions<number> {
  return {
    from:
      typeof from === 'object'
        ? convertGreaterLessOptionsToParameters(from)
        : Number(from),
    to: Number(to)
  }
}

export function convertRerollOptionsToParameters({
  exact,
  maxReroll,
  ...restOptions
}: RerollOptions): RerollOptions<number> {
  const convertedExact =
    exact === undefined
      ? {}
      : { exact: Array.isArray(exact) ? exact.map(Number) : [Number(exact)] }
  return {
    ...convertGreaterLessOptionsToParameters(restOptions),
    ...convertedExact,
    maxReroll: maxReroll === undefined ? undefined : Number(maxReroll)
  }
}

export default function normalizeModifiers(
  modifiers: Array<Modifier<'inclusive' | number>> = []
): Array<Modifier<number>> {
  return modifiers.map((modifier) => {
    if (isCapModifier(modifier)) {
      return {
        cap: convertGreaterLessOptionsToParameters(modifier.cap)
      }
    }

    if (isDropModifier(modifier)) {
      return { drop: convertDropOptionsToParameters(modifier.drop) }
    }
    if (isRerollModifier(modifier)) {
      return {
        reroll: Array.isArray(modifier.reroll)
          ? modifier.reroll.map((option) =>
              convertRerollOptionsToParameters(option)
            )
          : convertRerollOptionsToParameters(modifier.reroll)
      }
    }
    if (isReplaceModifier(modifier)) {
      return {
        replace: Array.isArray(modifier.replace)
          ? modifier.replace.map((option) =>
              convertReplaceOptionsToParameters(option)
            )
          : convertReplaceOptionsToParameters(modifier.replace)
      }
    }
    if (isUniqueModifier(modifier)) {
      return {
        unique:
          typeof modifier.unique === 'object'
            ? { notUnique: modifier.unique.notUnique.map(Number) }
            : modifier.unique
      }
    }
    if (isExplodeModifier(modifier)) {
      return { explode: modifier.explode }
    }
    if (isPlusModifier(modifier)) {
      return { plus: Number(modifier.plus) }
    }
    return { minus: Number(modifier.minus) }
  })
}
