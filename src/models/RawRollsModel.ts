import { DicePools, RandsumRollResult } from '~types'

function generate<Sides extends string | number = string | number>(
  dicePools: DicePools<Sides>['dicePools']
): RandsumRollResult<Sides>['rawRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const {
        die,
        options: { quantity }
      } = dicePools[key]
      return [key, die.rollMany(quantity || 1) as Sides[]]
    })
  )
}

export default { generate }
