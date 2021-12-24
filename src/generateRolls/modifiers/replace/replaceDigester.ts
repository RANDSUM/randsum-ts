import { ReplaceOptions } from 'types'

import { singleCapDigester } from '../cap/singleCapDigester'

export function replaceDigester(rollTotals: number[], { from, to }: ReplaceOptions) {
  return rollTotals.map(number_ => {
    if (from) {
      if (typeof from === 'number') {
        if (number_ === from) {
          return to
        }
      } else {
        return singleCapDigester(from, to)(number_)
      }
    }
    return number_
  })
}
