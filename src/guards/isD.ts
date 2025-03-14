import { D } from '~src/D'

export function isD(arg: unknown): arg is D<number | string[]> {
  return arg instanceof D
}
