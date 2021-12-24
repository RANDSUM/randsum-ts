import { RollParameters } from 'types'

export function parsePlusFactory(plus: RollParameters['plus']) {
  return function parsePlus(temporaryTotal: number) {
    return plus !== undefined ? temporaryTotal + plus : temporaryTotal
  }
}
