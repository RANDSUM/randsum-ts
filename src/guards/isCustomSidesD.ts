import { D } from '../D'

export function isCustomSidesD(arg: D<number | string[]>): arg is D<string[]> {
  return arg.type === 'custom'
}
