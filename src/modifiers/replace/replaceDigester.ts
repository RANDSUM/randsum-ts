import { ReplaceOptions } from 'types'
import { singleCapDigester } from '../cap/singleCapDigester'

export function replaceDigester(rollTotals: number[], { from, to }: ReplaceOptions) {
  return rollTotals.map(num => {
    if (from) {
      if (typeof from === 'number') {
        if (num === from) {
          return to
        }
      } else {
        return singleCapDigester(from, to)(num)
      }
    }
    return num
  })
}