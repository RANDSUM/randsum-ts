import {
  DropOptions,
  GreaterLessOptions,
  isCapModifier,
  isDropModifier,
  isExplodeModifier,
  isPlusModifier,
  isReplaceModifier,
  isRerollModifier,
  isUniqueModifier,
  Modifier,
  ReplaceOptions,
  RerollOptions
} from '../../types/options'

export const convertGreaterLessOptionsToParameters = ({
  greaterThan,
  lessThan
}: GreaterLessOptions): GreaterLessOptions<number> => ({
  greaterThan: greaterThan === undefined ? undefined : Number(greaterThan),
  lessThan: lessThan === undefined ? undefined : Number(lessThan)
})

export const convertDropOptionsToParameters = ({
  highest,
  lowest,
  exact,
  ...greaterThanLessThan
}: DropOptions): DropOptions<number> => ({
  ...convertGreaterLessOptionsToParameters(greaterThanLessThan),
  highest: highest === undefined ? undefined : Number(highest),
  lowest: lowest === undefined ? undefined : Number(lowest),
  exact: exact === undefined ? undefined : exact.map(Number)
})

export const convertReplaceOptionsToParameters = ({
  from,
  to
}: ReplaceOptions): ReplaceOptions<number> => ({
  from:
    typeof from === 'object'
      ? convertGreaterLessOptionsToParameters(from)
      : Number(from),
  to: Number(to)
})

export const convertRerollOptionsToParameters = ({
  exact,
  maxReroll,
  ...restOptions
}: RerollOptions): RerollOptions<number> => {
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

const normalizeModifiers = (
  modifiers: Array<Modifier<'inclusive' | number>>
): Array<Modifier<number>> =>
  modifiers.map((modifier) => {
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

export default normalizeModifiers
