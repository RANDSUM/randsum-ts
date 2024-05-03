import {
  GreaterLessOptions,
  DropOptions,
  TypeOrArrayOfType,
  ReplaceOptions,
  RerollOptions,
  UniqueOptions
} from '~types'

const formatHumanList = (list: (string | number)[]) => {
  return list
    .map((num, index, list) => {
      if (list.length === 1) return `[${num}]`

      if (index === list.length - 1) return `and [${num}]`

      return `[${num}] `
    })
    .join('')
}

export const capString = (cap: GreaterLessOptions) => {
  return formatGreaterLess(cap).map((str) => `No Rolls ${str}`)
}

export const dropString = (drop: DropOptions) => {
  const dropList = []

  if (drop.highest)
    dropList.push(`Drop highest${drop.highest > 1 ? ` ${drop.highest}` : ''}`)

  if (drop.lowest)
    dropList.push(`Drop lowest${drop.lowest > 1 ? ` ${drop.lowest}` : ''}`)

  if (drop.exact) {
    const exact = formatHumanList(drop.exact)
    dropList.push(`Drop ${exact}`)
  }

  formatGreaterLess(drop).forEach((str) => dropList.push(`Drop ${str}`))

  return dropList
}

export const replaceString = (replace: TypeOrArrayOfType<ReplaceOptions>) => {
  if (Array.isArray(replace)) return replace.map(singleReplaceString)

  return [singleReplaceString(replace)]
}

export const rerollString = (reroll: RerollOptions) => {
  const rerollList: string[] = []

  if (reroll.exact) {
    reroll.exact.forEach((roll) => {
      rerollList.push(String(roll))
    })
  }
  const greaterLess = `${formatGreaterLess(reroll).join(' and ')}`

  const maxString = reroll.maxReroll ? ` (up to ${reroll.maxReroll} times)` : ''
  const exactList = formatHumanList(rerollList)

  const exactString = [exactList, greaterLess]
    .filter((i) => i !== '')
    .join(', ')

  if (exactString === '') return []
  return [`Reroll ${exactString}${maxString}`]
}

export const explodeString = () => 'Exploding Dice'

export const plusString = (plus: number) => `Add ${plus}`

export const minusString = (minus: number) => `Subtract ${minus}`

export const uniqueString = (unique: boolean | UniqueOptions) => {
  if (typeof unique === 'boolean') return 'No Duplicate Rolls'
  return `No Duplicates (except ${formatHumanList(unique.notUnique)})`
}

const formatGreaterLess = (
  options: GreaterLessOptions,
  list: string[] = []
) => {
  if (options.greaterThan) {
    list.push(`greater than [${options.greaterThan}]`)
  }
  if (options.lessThan) {
    list.push(`less than [${options.lessThan}]`)
  }

  return list
}

const extractFromValue = (from: number | GreaterLessOptions) => {
  if (typeof from === 'number') return `[${from}]`

  return formatGreaterLess(from).join(' and ')
}

const singleReplaceString = (replace: ReplaceOptions) => {
  return `Replace ${extractFromValue(replace.from)} with [${replace.to}]`
}
