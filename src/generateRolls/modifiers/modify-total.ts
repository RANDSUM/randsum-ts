import { RollParameters } from 'types'

export function modifyTotal(total: number, { plus, minus }: Pick<RollParameters, 'plus' | 'minus'>) {
  return [
    (temporaryTotal: number) => (plus !== undefined ? temporaryTotal + plus : temporaryTotal),
    (temporaryTotal: number) => (minus !== undefined ? temporaryTotal - minus : temporaryTotal),
  ].reduce((newTotal, modifierFunction) => {
    return modifierFunction(newTotal)
  }, total)
}
