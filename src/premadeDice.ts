import type { BaseD } from '~types'
import { D } from './D'

export const D4: BaseD<number> = new D(4)
export const D6: BaseD<number> = new D(6)
export const D8: BaseD<number> = new D(8)
export const D10: BaseD<number> = new D(10)
export const D12: BaseD<number> = new D(12)
export const D20: BaseD<number> = new D(20)
export const D100: BaseD<number> = new D(100)

export const Coin: BaseD<string[]> = new D(['Heads', 'Tails'])
export const FudgeDice: BaseD<string[]> = new D(['+', '+', '+', '-', ' ', ' '])
