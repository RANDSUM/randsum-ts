import { RollParameters, RollResult } from '../../types'

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
