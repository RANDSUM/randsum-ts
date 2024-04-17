import { CustomSidesDie, StandardDie } from '../Die'

export function generateInitialRolls(dice: StandardDie[]): number[]
export function generateInitialRolls(dice: CustomSidesDie[]): string[]
export function generateInitialRolls<D extends string | number>(
  dice: D extends number ? StandardDie[] : CustomSidesDie[]
): D extends number ? number[] : string[]
export function generateInitialRolls(
  dice: StandardDie[] | CustomSidesDie[]
): number[] | string[] {
  return dice.map((die) => die.roll()) as number[] | string[]
}
