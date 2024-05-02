import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'

export default function generateRawRolls(
  dicePools: RollParameters['dicePools']
): RollResult['rawRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const rawSides = dicePools[key].options.sides
      const sides = Array.isArray(rawSides) ? rawSides.length : rawSides
      const { die } = dicePools[key]
      const rolls = Array.from(
        {
          length: sides
        },
        () => die.roll()
      ) as string[] | number[]
      return [key, rolls]
    })
  )
}
