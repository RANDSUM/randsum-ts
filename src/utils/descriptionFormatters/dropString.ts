import type { DropOptions } from '~types'
import { formatHumanList } from '../formatHumanList'
import { formatGreaterLess } from './formatGreaterLess'

export function dropString(drop: DropOptions): string[] {
  const dropList = []

  if (drop.highest && drop.highest > 1)
    dropList.push(`Drop highest ${drop.highest}`)

  if (drop.highest && drop.highest <= 1) dropList.push(`Drop highest`)

  if (drop.lowest && drop.lowest > 1)
    dropList.push(`Drop lowest ${drop.lowest}`)

  if (drop.lowest && drop.lowest <= 1) dropList.push(`Drop lowest`)

  if (drop.exact) {
    const exact = formatHumanList(drop.exact)
    dropList.push(`Drop ${exact}`)
  }

  formatGreaterLess(drop).forEach((str) => dropList.push(`Drop ${str}`))

  return dropList
}
