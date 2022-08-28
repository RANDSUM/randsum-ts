import {
  DropOptions,
  GreaterLessOptions,
  Modifier,
  ReplaceOptions,
  RerollOptions
} from 'types'

export function convertDropOptionsToParameters({
  highest,
  lowest,
  greaterThan,
  lessThan,
  exact
}: DropOptions): DropOptions<number> {
  return {
    highest: highest !== undefined ? Number(highest) : undefined,
    lowest: lowest !== undefined ? Number(lowest) : undefined,
    greaterThan: greaterThan !== undefined ? Number(greaterThan) : undefined,
    lessThan: lessThan !== undefined ? Number(lessThan) : undefined,
    exact: exact !== undefined ? exact.map(Number) : undefined
  }
}

export function convertGreaterLessOptionsToParameters({
  greaterThan,
  lessThan
}: GreaterLessOptions): GreaterLessOptions<number> {
  return {
    greaterThan: greaterThan !== undefined ? Number(greaterThan) : undefined,
    lessThan: lessThan !== undefined ? Number(lessThan) : undefined
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
    exact !== undefined
      ? { exact: Array.isArray(exact) ? exact.map(Number) : [Number(exact)] }
      : {}
  return {
    ...convertGreaterLessOptionsToParameters(restOptions),
    ...convertedExact,
    maxReroll: maxReroll !== undefined ? Number(maxReroll) : undefined
  }
}

export function normalizeModifiers(
  modifiers: Array<Modifier<'inclusive' | number>> = []
): Array<Modifier<number>> {
  const newModifiers: Array<Modifier<number>> = []
  for (const modifier of modifiers) {
    const [key] = Object.keys(modifier)
    const [value] = Object.values(modifier)

    key === 'cap' &&
      newModifiers.push({ cap: convertGreaterLessOptionsToParameters(value) })
    key === 'drop' &&
      newModifiers.push({ drop: convertDropOptionsToParameters(value) })
    key === 'reroll' &&
      newModifiers.push({
        reroll: Array.isArray(value)
          ? value.map((option) => convertRerollOptionsToParameters(option))
          : convertRerollOptionsToParameters(value)
      })
    key === 'replace' &&
      newModifiers.push({
        replace: Array.isArray(value)
          ? value.map((option) => convertReplaceOptionsToParameters(option))
          : convertReplaceOptionsToParameters(value)
      })
    key === 'unique' &&
      newModifiers.push({
        unique:
          typeof value === 'object'
            ? { notUnique: value.notUnique.map(Number) }
            : value
      })
    key === 'explode' && newModifiers.push({ explode: value })
    key === 'plus' && newModifiers.push({ plus: Number(value) })
    key === 'minus' && newModifiers.push({ minus: Number(value) })
  }
  return newModifiers
}
