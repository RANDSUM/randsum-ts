import { ReplaceOptions } from 'types'
import { singleCapDigester } from './singleCapDigester'

export function replacementDigester(rollTotals: number[], { from, to }: ReplaceOptions) {
  return rollTotals
    .slice()
    .map(num => {
      if(from){
        if(typeof from === 'number'){
          if(num === from){
            return to
          }
        } else {
          return singleCapDigester(from, to)(num)
        }
      }
      return num
    })
}
