import { RollParameters } from 'types'
import { sumArray } from 'utils'
import { dropDigester } from './dropDigester'

export function calculateTotal(rollTotals: number[], { accessor, drop, plus, minus }: RollParameters) {
  if (accessor) {
    return accessor(rollTotals)
  }

  let modifiedTotals = rollTotals.slice()

  if (drop !== undefined) {
    modifiedTotals = dropDigester(modifiedTotals, drop)
  }

  let total = sumArray(modifiedTotals)

  if (plus !== undefined) {
    total += plus
  }

  if (minus !== undefined) {
    total -= minus
  }

  return total
}
