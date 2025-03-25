import type { BaseD } from '~types'
import { D } from './D'

export const D4: BaseD<number> = D(4)
export const D6: BaseD<number> = D(6)
export const D8: BaseD<number> = D(8)
export const D10: BaseD<number> = D(10)
export const D12: BaseD<number> = D(12)
export const D20: BaseD<number> = D(20)
export const D100: BaseD<number> = D(100)

export const Coin: BaseD<string[]> = D(['Heads', 'Tails'])
export const FudgeDice: BaseD<string[]> = D(['+', '+', '+', '-', ' ', ' '])
