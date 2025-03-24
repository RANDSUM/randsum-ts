import type {
  NumericRollBonus,
  RequiredNumericRollParameters,
  UniqueOptions
} from '~types'
import { InvalidUniqueError } from '~utils/invalidUniqueError'

export class UniqueModifier {
  private options: boolean | UniqueOptions | undefined
  constructor(options: boolean | UniqueOptions | undefined) {
    this.options = options
  }

  apply(
    rolls: number[],
    { sides, quantity }: RequiredNumericRollParameters,
    rollOne: () => number
  ): NumericRollBonus {
    if (this.options === undefined) return { rolls, simpleMathModifier: 0 }
    if (quantity > sides) {
      throw new InvalidUniqueError()
    }
    const notUnique = this.generateNotUniqueArray()

    const filteredArray = new Set(
      rolls.filter((n) => !notUnique.includes(Number(n)))
    )

    const uniqueRolls = rolls.map(Number).map((roll, index, array) => {
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
      rolls: uniqueRolls,
      simpleMathModifier: 0
    }
  }

  toDescription(): string | undefined {
    if (this.options === undefined) return undefined
    if (typeof this.options === 'boolean' || this.options === undefined) {
      return 'No Duplicate Rolls'
    }
    return `No Duplicates (except ${this.formatHumanList(this.options.notUnique)})`
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    if (typeof this.options === 'boolean' || this.options === undefined)
      return 'U'
    return `U{${this.options.notUnique.join(',')}}`
  }

  private generateNotUniqueArray(): number[] {
    if (this.options === undefined || typeof this.options === 'boolean') {
      return []
    }
    return this.options.notUnique.map(Number)
  }

  private formatHumanList(list: number[]): string {
    return list
      .map((num, index, list) => {
        if (list.length === 1) return `[${num}]`

        if (index === list.length - 1) return `and [${num}]`

        return `[${num}] `
      })
      .join('')
  }
}
