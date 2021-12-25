import { RollParameters } from 'types'

export function parseMinusFactory(minus: RollParameters['minus']) {
  return function parseMinus(temporaryTotal: number) {
    return minus !== undefined ? temporaryTotal - Number(minus) : temporaryTotal
  }
}
