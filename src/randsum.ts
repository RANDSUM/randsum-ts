import { generateTotal } from 'calculators'
import { isNumber, RollModifier, RollResult } from 'types'
import { randomNumber } from 'utils'


function formatResult(total, rolls, {})
function calculateNumberArg(sides: number, modifier?: RollModifier) {
    if (!modifier) return randomNumber(sides)
    const roll = generateTotal([sides], modifier)



}

export function randsum(firstArg: string | number, modifier?: RollModifier): number | RollResult {
  if (isNumber(firstArg)) { return calculateNumberArg(firstArg, modifier) }



  return 2
}
