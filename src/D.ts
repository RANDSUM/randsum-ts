import type { BaseD } from '~types'
import { NewD } from './newD'

export function D(arg: number): BaseD<number>
export function D(arg: string[]): BaseD<string[]>
export function D(arg: string[] | number): BaseD<number> | BaseD<string[]>
export function D(arg: string[] | number): BaseD<number> | BaseD<string[]> {
  if (typeof arg === 'number') {
    return new NewD(arg)
  }

  return new NewD(arg)
}
