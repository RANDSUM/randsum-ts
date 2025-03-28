import { uniquePattern } from '../patterns'
import type {
  ModifierOptions,
  NumericRollBonus,
  RequiredNumericRollParameters,
  UniqueOptions
} from '../types'
import { extractMatches } from '../utils/extractMatches'
import { formatters } from '../utils/formatters'
import { InvalidUniqueError } from '../utils/invalidUniqueError'
import { BaseModifier } from './BaseModifier'

export class UniqueModifier extends BaseModifier<boolean | UniqueOptions> {
  static override parse(
    modifiersString: string
  ): Pick<ModifierOptions, 'unique'> {
    return extractMatches(modifiersString, uniquePattern).reduce<
      Pick<ModifierOptions, 'unique'>
    >((acc, notationString) => {
      if (notationString.toUpperCase() === 'U') {
        if (typeof acc.unique === 'object') {
          return acc
        }
        return { unique: true }
      }
      const notUnique = notationString
        .replaceAll(/[Uu]{/g, '')
        .replaceAll('}', '')
        .split(',')

      return {
        unique: {
          notUnique: notUnique.map(Number)
        }
      }
    }, {})
  }

  apply(
    bonus: NumericRollBonus,
    { sides, quantity }: RequiredNumericRollParameters,
    rollOne: () => number
  ): NumericRollBonus {
    if (this.options === undefined) return bonus
    if (quantity > sides) {
      throw new InvalidUniqueError()
    }
    const notUnique = this.generateNotUniqueArray()

    const filteredArray = new Set(
      bonus.rolls.filter((n) => !notUnique.includes(Number(n)))
    )

    const uniqueRolls = bonus.rolls.map(Number).map((roll, index, array) => {
      let newRoll: number
      if (array.indexOf(roll) === index || notUnique.includes(roll)) {
        return roll
      }
      do {
        newRoll = rollOne()
      } while (filteredArray.has(newRoll))
      return newRoll
    })

    return {
      ...bonus,
      rolls: uniqueRolls
    }
  }

  toDescription(): string[] | undefined {
    if (this.options === undefined) return undefined
    if (typeof this.options === 'boolean') {
      return ['No Duplicate Rolls']
    }
    return [
      `No Duplicates (except ${this.formatHumanList(this.options.notUnique)})`
    ]
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    if (typeof this.options === 'boolean') return 'U'
    return `U{${this.options.notUnique.join(',')}}`
  }

  private generateNotUniqueArray(): number[] {
    if (this.options === undefined || typeof this.options === 'boolean') {
      return []
    }
    return this.options.notUnique.map(Number)
  }

  private formatHumanList(list: number[]): string {
    return formatters.humanList(list)
  }
}
