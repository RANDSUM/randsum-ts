import { RollParameters } from '../../types/parameters'
import { RollResult } from '../../types/results'
import generateCustomResults from './generate-custom-results'
import applyModifiers from './generate-standard-results'

function generateResult(rollParameters: RollParameters): RollResult {
  const rawRolls = Object.fromEntries(
    Object.keys(rollParameters.dicePools).map((key) => {
      const rawSides = rollParameters.dicePools[key].options.sides
      const sides = Array.isArray(rawSides) ? rawSides.length : rawSides
      const die = rollParameters.dicePools[key].die
      const rolls = Array.from(
        {
          length: sides
        },
        () => die.roll()
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

  return {
    ...rollParameters,
    rawRolls,
    modifiedRolls: {},
    result: [],
    total: 0
  }
}

export default generateResult
