import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'

const generateCustomResults = (
  rollParameters: RollParameters<string>
): RollResult<string> => {
  const rawRolls = Object.fromEntries(
    Object.keys(rollParameters.dicePools).map((key) => {
      const rolls = Array.from(
        {
          length: rollParameters.dicePools[key].options.sides.length
        },
        () => rollParameters.dicePools[key].die.roll()
      )
      return [
        key,
        {
          rolls,
          total: rolls.join(',')
        }
      ]
    })
  )
  const total = Object.values(rawRolls)
    .map((pool) => pool.total)
    .join(',')

  return {
    ...rollParameters,
    rawRolls,
    modifiedRolls: rawRolls,
    total
  }
}

export default generateCustomResults
