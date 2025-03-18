import { CustomD } from './CustomD'
import { NumericalD } from './NumericalD'

export function D(arg: string[]): CustomD
export function D(arg: number): NumericalD
export function D(arg: string[] | number): NumericalD | CustomD
export function D(arg: string[] | number): NumericalD | CustomD {
  if (typeof arg === 'number') {
    return new NumericalD(arg)
  }

  return new CustomD(arg)
}
