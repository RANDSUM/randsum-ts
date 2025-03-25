import { CustomD } from '~src/CustomD'
import { NumericalD } from '~src/NumericalD'
import type { BaseD } from '~types'

export function isD(arg: unknown): arg is BaseD<string[] | number> {
  return arg instanceof NumericalD || arg instanceof CustomD
}
