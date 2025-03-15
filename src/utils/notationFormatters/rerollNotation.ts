import type { RerollOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'
import { maxNotation } from './maxNotation'

export function rerollNotation(reroll: RerollOptions): string {
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
  return `R{${rerollList.join(',')}}${maxNotation(reroll.max)}`
}
