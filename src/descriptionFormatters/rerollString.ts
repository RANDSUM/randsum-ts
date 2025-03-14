import type { RerollOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'
import { formatHumanList } from './formatHumanList'

export function rerollString(reroll: RerollOptions): string[] {
  const rerollList: string[] = []

  if (reroll.exact) {
    reroll.exact.forEach((roll) => {
      rerollList.push(String(roll))
    })
  }
  const greaterLess = `${formatGreaterLess(reroll).join(' and ')}`

  const exactList = formatHumanList(rerollList)

  const exactString = [exactList, greaterLess]
    .filter((i) => i !== '')
    .join(', ')

  if (exactString === '') return []

  if (reroll.maxReroll) {
    return [`Reroll ${exactString} (up to ${reroll.maxReroll} times)`]
  }

  return [`Reroll ${exactString}`]
}
