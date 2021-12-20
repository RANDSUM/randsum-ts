import { randomNumber } from 'utils'

export function generateRollTotals(sides: number, rolls: number){
  return Array.from(Array(rolls)).map(() => randomNumber(sides))
}
