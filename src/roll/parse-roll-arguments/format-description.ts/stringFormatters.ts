import {
  DropOptions,
  GreaterLessOptions,
  ReplaceOptions,
  RerollOptions,
  TypeOrArrayOfType,
  UniqueOptions,
} from 'randsum'

const formatHumanList = (list: (string | number)[]) => {
  return list
    .map((num, index, list) => {
      if (list.length === 1) return `[${num}]`
      if (index === list.length - 1) return `and [${num}]`
      if (index === list.length - 2) return `[${num}] `
      return `[${num}] `
    })
    .join('')
}

export const capString = (cap: GreaterLessOptions) => {
  const capList = formatGreaterLess(cap)
  return capList.map((str) => `No Rolls ${str}`)
}

export const dropString = (drop: DropOptions) => {
  const dropList = []
  if (drop.highest)
    dropList.push(`Drop highest${drop.highest > 1 ? ` ${drop.highest}` : ''}`)
  if (drop.lowest)
    dropList.push(`Drop lowest${drop.lowest > 1 ? ` ${drop.lowest}` : ''}`)
  formatGreaterLess(drop).forEach((str) => dropList.push(`Drop ${str}`))
  if (drop.exact) {
    const exact = formatHumanList(drop.exact)
    dropList.push(`Drop ${exact}`)
  }

  return dropList
}

export const replaceString = (replace: TypeOrArrayOfType<ReplaceOptions>) => {
  if (Array.isArray(replace)) return replace.map(singleReplaceString)

  return [singleReplaceString(replace)]
}

export const rerollString = (reroll: TypeOrArrayOfType<RerollOptions>) => {
  if (Array.isArray(reroll)) return reroll.map(singleRerollString).flat()

  return singleRerollString(reroll)
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

const singleReplaceString = (replace: ReplaceOptions) => {
  const fromValue =
    typeof replace.from === 'number'
      ? `[${replace.from}]`
      : formatGreaterLess(replace.from).join(' and ')
  return `Replace ${fromValue} with [${replace.to}]`
}

const singleRerollString = (reroll: RerollOptions) => {
  const rerollList = []

  if (reroll.exact) {
    if (Array.isArray(reroll.exact)) {
      reroll.exact.forEach((roll) => {
        rerollList.push(String(roll))
      })
    }
    rerollList.push(String(reroll.exact))
  }
  const greaterLess = `${formatGreaterLess(reroll).join(' and ')}`

  const maxString = reroll.maxReroll ? ` (up to ${reroll.maxReroll} times)` : ''
  const exactList = formatHumanList(rerollList)

  const exactString = [exactList, greaterLess].filter((i) => i !== '').join(',')

  if (exactString === '') return []
  return [`Reroll ${exactString}${maxString}`]
}
