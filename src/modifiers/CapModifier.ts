import { capPattern } from '~patterns'
import type {
  ComparisonOptions,
  ModifierOptions,
  NumericRollBonus
} from '~types'
import { formatGreaterLessDescriptions } from '~utils/descriptionFormatters/formatGreaterLessDescriptions'
import { formatGreaterLessNotation } from '~utils/notationFormatters/formatGreaterLessNotation'
import { extractMatches } from '~utils/notationParsers/extractMatches'

export class CapModifier {
  static parse(modifiersString: string): Pick<ModifierOptions, 'cap'> {
    const notations = extractMatches(modifiersString, capPattern)
    if (notations.length === 0) {
      return {}
    }
    return notations.reduce(
      (acc, notationString) => {
        const capString = notationString
          .split(/[Cc]/)[1]
          .replaceAll(/{|}/g, '')
          .split(',')

        const capOptions = capString.reduce((innerAcc, note) => {
          if (note.includes('<')) {
            return {
              ...innerAcc,
              lessThan: Number(note.replaceAll('<', ''))
            }
          }
          return {
            ...innerAcc,
            greaterThan: Number(note.replaceAll('>', ''))
          }
        }, {} as ComparisonOptions)

        return {
          cap: {
            ...acc.cap,
            ...capOptions
          }
        }
      },
      { cap: {} } as Pick<ModifierOptions, 'cap'>
    )
  }
  static applySingleCap(
    { greaterThan, lessThan }: ComparisonOptions,
    value?: number
  ): (roll: number) => number {
    return (roll: number) => {
      if (greaterThan !== undefined && roll > greaterThan) {
        return value ?? greaterThan
      }
      if (lessThan !== undefined && roll < lessThan) {
        return value ?? lessThan
      }
      return roll
    }
  }

  private options: ComparisonOptions | undefined
  constructor(options: ComparisonOptions | undefined) {
    this.options = options
  }

  apply(rolls: number[]): NumericRollBonus {
    if (this.options === undefined) return { rolls, simpleMathModifier: 0 }
    return {
      rolls: rolls.map(CapModifier.applySingleCap(this.options)),
      simpleMathModifier: 0
    }
  }

  toDescription(): string[] | undefined {
    if (this.options === undefined) return undefined
    return formatGreaterLessDescriptions(this.options).map(
      (str) => `No Rolls ${str}`
    )
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    const capList = formatGreaterLessNotation(this.options)
    return `C{${capList.join(',')}}`
  }
}
