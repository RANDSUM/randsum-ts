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
      const rolls = Array.from(
        {
          length: quantity || 1
        },
        () => die.roll()
      ) as Sides[]
      return [key, rolls]
    })
  )
}

export default { generate }
