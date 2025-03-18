import { CustomD } from '~src/CustomD'
import { NumericalD } from '~src/NumericalD'

export function isD(arg: unknown): arg is NumericalD | CustomD {
  return arg instanceof NumericalD || arg instanceof CustomD
}
