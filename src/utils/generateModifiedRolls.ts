import { CapModifier } from '~src/modifiers/CapModifier'
import { DropModifier } from '~src/modifiers/DropModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { CustomRollParams, DicePool, RollParams, RollResult } from '~types'
import { calculateTotal } from './calculateTotal'
import { coreRandom } from './coreRandom'

function isCustomParameters(
  poolParameters: RollParams
): poolParameters is CustomRollParams {
  return Array.isArray(poolParameters.options.sides)
}

export function generateModifiedRolls(
  dicePools: DicePool,
  rawRolls: RollResult['rawRolls']
): RollResult['modifiedRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools.dicePools).map((key) => {
      const params = dicePools.dicePools[key]
      const rolls = rawRolls[key]
      if (isCustomParameters(params)) {
        return [
          key,
          {
            total: calculateTotal(rolls),
            rolls: rolls
          }
        ]
      }

      const {
        options: { sides, quantity = 1, modifiers = {} }
      } = params
      const rollOne = () => coreRandom(sides)
      const modified = Object.keys(modifiers).reduce(
        (bonuses, key) => {
          switch (key) {
            case 'reroll':
              return new RerollModifier(modifiers.reroll).apply(
                bonuses.rolls,
                rollOne
              )

            case 'unique':
              return new UniqueModifier(modifiers.unique).apply(
                bonuses.rolls,
                { sides, quantity },
                rollOne
              )

            case 'replace':
              return new ReplaceModifier(modifiers.replace).apply(bonuses.rolls)

            case 'cap':
              return new CapModifier(modifiers.cap).apply(bonuses.rolls)

            case 'drop':
              return new DropModifier(modifiers.drop).apply(bonuses.rolls)

            case 'explode':
              return new ExplodeModifier(modifiers.explode).apply(
                bonuses.rolls,
                { sides, quantity },
                rollOne
              )

            case 'plus':
              return new PlusModifier(modifiers.plus).apply(bonuses.rolls)

            case 'minus':
              return new MinusModifier(modifiers.minus).apply(bonuses.rolls)

            default:
              throw new Error(`Unknown modifier: ${key}`)
          }
        },
        {
          simpleMathModifier: 0,
          rolls: rolls as number[]
        }
      )

      return [
        key,
        {
          rolls: modified.rolls,
          total: calculateTotal(modified.rolls, modified.simpleMathModifier)
        }
      ]
    })
  )
}
