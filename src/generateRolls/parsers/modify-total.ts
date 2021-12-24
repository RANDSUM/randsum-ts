import { RollParameters } from 'types'

import { parseMinusFactory } from './parse-minus'
import { parsePlusFactory } from './parse-plus'

export function modifyTotal(total: number, { plus, minus }: Pick<RollParameters, 'plus' | 'minus'>) {
  const modifiers = [parsePlusFactory(plus), parseMinusFactory(minus)]

  let modifiedTotal = total
  for (const modifierFunction of modifiers) {
    modifiedTotal = modifierFunction(modifiedTotal)
  }

  return modifiedTotal
}
