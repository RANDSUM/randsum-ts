import {
  DropOptions,
  GreaterLessOptions,
  ReplaceOptions,
  RerollOptions,
  TypeOrArrayOfType,
  UniqueOptions
} from '~types'

export const capNotation = (cap: GreaterLessOptions) => {
  const capList = formatGreaterLess(cap)
  return capList.map((str) => `C{${str}}`)
}

export const dropNotation = (drop: DropOptions) => {
  const dropList: string[] = []
  formatGreaterLess(drop).forEach((str) => dropList.push(str))
  if (drop.exact) {
    drop.exact.forEach((roll) => {
      dropList.push(String(roll))
    })
  }

  return `D{${dropList.map((str) => str).join(',')}}`
}

export const replaceNotation = (replace: TypeOrArrayOfType<ReplaceOptions>) => {
  const args = (
    Array.isArray(replace)
      ? replace.map(singleReplaceNotation).flat()
      : [singleReplaceNotation(replace)]
  ).join(',')
  return `V{${args}}`
}

export const rerollNotation = (reroll: TypeOrArrayOfType<RerollOptions>) => {
  const args = (
    Array.isArray(reroll)
      ? reroll.map(singleRerollNotation).flat()
      : [singleRerollNotation(reroll)]
  ).join(',')
  return `R{${args}}`
}

export const explodeNotation = () => '!'
export const plusNotation = (plus: number) => `+${plus}`
export const minusNotation = (minus: number) => `-${minus}`
export const uniqueNotation = (unique: boolean | UniqueOptions) => {
  if (typeof unique === 'boolean') return 'U'
  return `U{${unique.notUnique.join(',')}})`
}

const formatGreaterLess = (
  options: GreaterLessOptions,
  list: string[] = []
) => {
  if (options.greaterThan) {
    list.push(`>[${options.greaterThan}]`)
  }
  if (options.lessThan) {
    list.push(`<[${options.lessThan}]`)
  }

  return list
}

const singleReplaceNotation = (replace: ReplaceOptions) => {
  const fromValue =
    typeof replace.from === 'number'
      ? replace.from
      : formatGreaterLess(replace.from).join(',')
  return `${fromValue}=${replace.to}`
}

const singleRerollNotation = (reroll: RerollOptions) => {
  const rerollList = []

  if (reroll.exact) {
    if (Array.isArray(reroll.exact)) {
      reroll.exact.forEach((roll) => {
        rerollList.push(String(roll))
      })
    }
    rerollList.push(String(reroll.exact))
  }
  const greaterLess = `${formatGreaterLess(reroll).join(',')}`
  rerollList.push(greaterLess)

  const maxNotation = reroll.maxReroll ? reroll.maxReroll : ''

  return `R{${rerollList.join(',')}}${maxNotation}`
}
