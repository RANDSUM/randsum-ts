import { RollParameters } from 'types'

import { parseMinusFactory } from './parse-minus'
import { parsePlusFactory } from './parse-plus'

export function totalParsers({ plus, minus }: RollParameters) {
  return [parsePlusFactory(plus), parseMinusFactory(minus)]
}
