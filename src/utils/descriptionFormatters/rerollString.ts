import type { RerollOptions } from '~types'
import { formatHumanList } from '../formatHumanList'
import { formatGreaterLess } from './formatGreaterLess'

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
  const coreString = `Reroll ${exactString}`

  if (reroll.maxReroll) {
    return [`${coreString} (up to ${reroll.maxReroll} times)`]
  }

  return [coreString]
}
