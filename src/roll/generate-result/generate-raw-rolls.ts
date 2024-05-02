import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'

export default function generateRawRolls(
  dicePools: RollParameters['dicePools']
): RollResult['rawRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const rawSides = dicePools[key].options.sides
      const {
        die,
        options: { quantity }
      } = dicePools[key]
      const length = Array.isArray(rawSides) ? rawSides.length : quantity || 1
      const rolls = Array.from(
        {
          length
        },
        () => die.roll()
      ) as string[] | number[]
      return [key, rolls]
    })
  )
}
