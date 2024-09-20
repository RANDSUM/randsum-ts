import { Die } from './die'

export class StandardDie extends Die<number> {}
export class CustomSidesDie extends Die<string> {}

export const D4 = new StandardDie(4)
export const D6 = new StandardDie(6)
export const D8 = new StandardDie(8)
export const D10 = new StandardDie(10)
export const D12 = new StandardDie(12)
export const D20 = new StandardDie(20)
export const D100 = new StandardDie(100)

export const FudgeDice = new CustomSidesDie(['+', '+', '+', '-', '0', '0'])
