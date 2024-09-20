import {
  DropOptions,
  GreaterLessOptions,
  ReplaceOptions,
  RerollOptions,
  UniqueOptions
} from '~types'

export function capNotation(cap: GreaterLessOptions) {
  const capList = formatGreaterLess(cap)
  return `C{${capList.join(',')}}`
}

export function dropNotation(drop: DropOptions) {
  const dropList: string[] = []
  const greaterLess = formatGreaterLess(drop)
  greaterLess.forEach((str) => dropList.push(str))
  if (drop.exact) {
    drop.exact.forEach((roll) => {
      dropList.push(String(roll))
    })
  }

  const finalList = []

  if (drop.highest) {
    finalList.push(`H${drop.highest > 1 ? drop.highest : ''}`)
  }

  if (drop.lowest) {
    finalList.push(`L${drop.lowest > 1 ? drop.lowest : ''}`)
  }

  if (dropList.length > 0) {
    finalList.push(`D{${dropList.map((str) => str).join(',')}}`)
  }

  return finalList.join('')
}

export function replaceNotation(replace: ReplaceOptions | ReplaceOptions[]) {
  const args = (
    Array.isArray(replace)
      ? replace.map(singleReplaceNotation).flat()
      : [singleReplaceNotation(replace)]
  ).join(',')
  return `V{${args}}`
}

export function rerollNotation(reroll: RerollOptions) {
  const rerollList = []

  if (reroll.exact) {
    reroll.exact.forEach((roll) => {
      rerollList.push(String(roll))
    })
  }
  const greaterLess = formatGreaterLess(reroll)
  if (greaterLess.length > 0) {
    rerollList.push(greaterLess.join(','))
  }

  const maxNotation = reroll.maxReroll ? reroll.maxReroll : ''

  if (rerollList.length === 0) return ''
  return `R{${rerollList.join(',')}}${maxNotation}`
}

export function explodeNotation() {
  return '!'
}
export function plusNotation(plus: number) {
  return `+${plus}`
}

export function minusNotation(minus: number) {
  return `-${minus}`
}

export function uniqueNotation(unique: boolean | UniqueOptions) {
  if (typeof unique === 'boolean') return 'U'
  return `U{${unique.notUnique.join(',')}}`
}

function formatGreaterLess(options: GreaterLessOptions, list: string[] = []) {
  if (options.greaterThan) {
    list.push(`>${options.greaterThan}`)
  }
  if (options.lessThan) {
    list.push(`<${options.lessThan}`)
  }

  return list
}

function singleReplaceNotation(replace: ReplaceOptions) {
  const fromValue =
    typeof replace.from === 'number'
      ? replace.from
      : formatGreaterLess(replace.from).join(',')
  return `${fromValue}=${replace.to}`
}
