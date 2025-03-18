import type { CustomD } from '~src/CustomD'
import type { NumericalD } from '~src/NumericalD'

export function isCustomD(arg: NumericalD | CustomD): arg is CustomD {
  return arg.type === 'custom'
}
