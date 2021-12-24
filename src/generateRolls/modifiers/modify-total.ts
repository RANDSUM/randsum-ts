import { RollParameters } from 'types'

import { parseMinusFactory } from './minus'
import { parsePlusFactory } from './plus'

export function modifyTotal(total: number, { plus, minus }: Pick<RollParameters, 'plus' | 'minus'>) {
  const modifiers = [parsePlusFactory(plus), parseMinusFactory(minus)]

  let modifiedTotal = total
  for (const modifierFunction of modifiers) {
    modifiedTotal = modifierFunction(modifiedTotal)
  }

  return modifiedTotal
}
