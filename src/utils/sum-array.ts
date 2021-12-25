import { RollTotals } from 'types'

export function sumArray(array: RollTotals) {
  return Number(array.reduce((total, roll) => Number(total) + Number(roll), 0))
}
