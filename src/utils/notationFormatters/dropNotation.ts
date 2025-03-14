import type { DropOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function dropNotation(drop: DropOptions): string {
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
