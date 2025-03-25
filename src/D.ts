import type { BaseD } from '~types'
import { CustomD } from './CustomD'
import { NumericalD } from './NumericalD'

export function D(arg: number): BaseD<number>
export function D(arg: string[]): BaseD<string[]>
export function D(arg: string[] | number): BaseD<number> | BaseD<string[]>
export function D(arg: string[] | number): BaseD<number> | BaseD<string[]> {
  if (typeof arg === 'number') {
    return new NumericalD(arg)
  }

  return new CustomD(arg)
}
