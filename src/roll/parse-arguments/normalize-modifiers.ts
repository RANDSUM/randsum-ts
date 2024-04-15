import {
  DropOptions,
  GreaterLessOptions,
  Modifiers,
  ReplaceOptions,
  RerollOptions
} from '../../types/options'

export const convertGreaterLessOptionsToParameters = ({
  greaterThan,
  lessThan
}: GreaterLessOptions): GreaterLessOptions => {
  const converted: GreaterLessOptions = {}

  if (greaterThan !== undefined) {
    converted.greaterThan = Number(greaterThan)
  }

  if (lessThan !== undefined) {
    converted.lessThan = Number(lessThan)
  }
  return converted
}

export const convertDropOptionsToParameters = ({
  highest,
  lowest,
  exact,
  ...greaterThanLessThan
}: DropOptions): DropOptions => ({
  ...convertGreaterLessOptionsToParameters(greaterThanLessThan),
  highest: highest === undefined ? undefined : Number(highest),
  lowest: lowest === undefined ? undefined : Number(lowest),
  exact: exact === undefined ? undefined : exact.map(Number)
})

export const convertReplaceOptionsToParameters = ({
  from,
  to
}: ReplaceOptions): ReplaceOptions => ({
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
}: RerollOptions): RerollOptions => {
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

const normalizeModifiers = (modifiers: Modifiers): Modifiers => ({
  cap: modifiers.cap && convertGreaterLessOptionsToParameters(modifiers.cap),
  drop: modifiers.drop && convertDropOptionsToParameters(modifiers.drop),
  reroll:
    modifiers.reroll &&
    (Array.isArray(modifiers.reroll)
      ? modifiers.reroll.map((option) =>
          convertRerollOptionsToParameters(option)
        )
      : convertRerollOptionsToParameters(modifiers.reroll)),
  replace:
    modifiers.replace &&
    (Array.isArray(modifiers.replace)
      ? modifiers.replace.map((option) =>
          convertReplaceOptionsToParameters(option)
        )
      : convertReplaceOptionsToParameters(modifiers.replace)),
  unique:
    modifiers.unique &&
    (typeof modifiers.unique === 'object'
      ? { notUnique: modifiers.unique.notUnique.map(Number) }
      : modifiers.unique),
  explode: !!modifiers.explode,
  plus: Number(modifiers.plus || 0),
  minus: Number(modifiers.minus || 0)
})

export default normalizeModifiers
