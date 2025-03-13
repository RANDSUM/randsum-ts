import { D } from '~src/D'

export const D4: D<4> = new D(4)
export const D6: D<6> = new D(6)
export const D8: D<8> = new D(8)
export const D10: D<10> = new D(10)
export const D12: D<12> = new D(12)
export const D20: D<20> = new D(20)
export const D100: D<100> = new D(100)

export const Coin: D<['Heads', 'Tails']> = new D(['Heads', 'Tails'])
export const FudgeDice: D<['+', '+', '+', '-', ' ', ' ']> = new D([
  '+',
  '+',
  '+',
  '-',
  ' ',
  ' '
])
