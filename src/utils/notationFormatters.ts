import { isValidModifier } from '~guards'
import type {
  DropOptions,
  GreaterLessOptions,
  Notation,
  ReplaceOptions,
  RerollOptions,
  RollOptions,
  UniqueOptions
} from '~types'

function capNotation(cap: GreaterLessOptions) {
  const capList = formatGreaterLess(cap)
  return `C{${capList.join(',')}}`
}

function dropNotation(drop: DropOptions) {
  const dropList: string[] = []
  const greaterLess = formatGreaterLess(drop)
  greaterLess.forEach((str) => dropList.push(str))
  if (drop.exact) {
    drop.exact.forEach((roll) => {
      dropList.push(String(roll))
    })
  }

  const finalList = []

  if (drop.highest && drop.highest > 1) {
    finalList.push(`H${drop.highest}`)
  }

  if (drop.highest && drop.highest <= 1) {
    finalList.push(`H`)
  }

  if (drop.lowest && drop.lowest > 1) {
    finalList.push(`L${drop.lowest}`)
  }

  if (drop.lowest && drop.lowest <= 1) {
    finalList.push(`L`)
  }

  if (dropList.length > 0) {
    finalList.push(`D{${dropList.map((str) => str).join(',')}}`)
  }

  return finalList.join('')
}

function replaceNotation(replace: ReplaceOptions | ReplaceOptions[]) {
  return `V{${replaceArgs(replace).join(',')}}`
}

function replaceArgs(replace: ReplaceOptions | ReplaceOptions[]): string[] {
  if (Array.isArray(replace)) return replace.map(singleReplaceNotation).flat()
  return [singleReplaceNotation(replace)]
}

function rerollNotation(reroll: RerollOptions) {
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

  if (rerollList.length === 0) return ''
  return `R{${rerollList.join(',')}}${maxNotation(reroll.maxReroll)}`
}

function maxNotation(max: number | undefined): string | number {
  if (max === undefined) return ''
  return max
}

function explodeNotation() {
  return '!'
}
function plusNotation(plus: number) {
  return `+${plus}`
}

function minusNotation(minus: number) {
  return `-${minus}`
}

function uniqueNotation(unique: boolean | UniqueOptions) {
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
  return `${fromValue(replace.from)}=${replace.to}`
}

function fromValue(from: number | GreaterLessOptions) {
  if (typeof from === 'number') return from
  return formatGreaterLess(from).join(',')
}

export function formatModifierNotation({ modifiers }: RollOptions): string {
  if (!isValidModifier(modifiers)) return ''

  const modifierStrings = []

  if (modifiers.cap) modifierStrings.push(capNotation(modifiers.cap))
  if (modifiers.drop) modifierStrings.push(dropNotation(modifiers.drop))
  if (modifiers.replace)
    modifierStrings.push(replaceNotation(modifiers.replace))
  if (modifiers.reroll) modifierStrings.push(rerollNotation(modifiers.reroll))
  if (modifiers.explode) modifierStrings.push(explodeNotation())
  if (modifiers.unique) modifierStrings.push(uniqueNotation(modifiers.unique))
  if (modifiers.plus) modifierStrings.push(plusNotation(modifiers.plus))
  if (modifiers.minus) modifierStrings.push(minusNotation(modifiers.minus))

  return modifierStrings.join('')
}
export function formatCoreNotation({
  quantity = 1,
  sides
}: RollOptions<string | number>): Notation {
  if (Array.isArray(sides)) {
    return formatNotation(quantity, `{${formatSides(sides)}}`)
  }

  return formatNotation(quantity, sides)
}

function formatNotation(quantity: number, sides: string | number): Notation {
  return `${quantity}d${sides}` as Notation
}

function formatSides(sides: string[]): string {
  return sides
    .map((s) => {
      if (s === '') return ' '
      return s
    })
    .join('')
}

export function optionsToNotation<S extends string | number>(
  options: RollOptions<S>
): Notation<S> {
  return `${formatCoreNotation(options)}${formatModifierNotation(options)}` as Notation<S>
}
