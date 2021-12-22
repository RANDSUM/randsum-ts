import { RollParameters } from 'types'

export function modifyTotal(total: number, { plus, minus }: Pick<RollParameters, 'plus' | 'minus'>) {
  return [
    (tempTotal: number) => (plus !== undefined ? tempTotal + plus : tempTotal),
    (tempTotal: number) => (minus !== undefined ? tempTotal - minus : tempTotal),
  ].reduce((newTotal, modifierFunc) => {
    return modifierFunc(newTotal)
  }, total)
}
