import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'

export default function generateRawRolls(
  dicePools: RollParameters['dicePools']
): RollResult['rawRolls'] {
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
      ) as string[] | number[]
      return [key, rolls]
    })
  )
}
