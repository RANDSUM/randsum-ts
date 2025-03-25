import { D } from '~src/D'
import type { BaseD } from '~types'

export function isD(arg: unknown): arg is BaseD<string[] | number> {
  return arg instanceof D
}
