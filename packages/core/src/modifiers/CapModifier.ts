import { capPattern } from '../patterns'
import type {
  ComparisonOptions,
  ModifierOptions,
  NumericRollBonus
} from '../types'
import { extractMatches } from '../utils/extractMatches'
import { formatters } from '../utils/formatters'
import { BaseModifier } from './BaseModifier'

export class CapModifier extends BaseModifier<ComparisonOptions> {
  static override parse = (
    modifiersString: string
  ): Pick<ModifierOptions, 'cap'> => {
    const notations = extractMatches(modifiersString, capPattern)
    if (notations.length === 0) {
      return {}
    }
    return notations.reduce(
      (acc, notationString = '') => {
        const capString = (notationString.split(/[Cc]/)[1] || '')
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

  static applySingleCap = (
    { greaterThan, lessThan }: ComparisonOptions,
    value?: number
  ): ((roll: number) => number) => {
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

  constructor(options: ComparisonOptions | undefined) {
    super(options)
  }

  apply = (rolls: number[]): NumericRollBonus => {
    if (this.options === undefined) return this.defaultBonus(rolls)
    return this.defaultBonus(
      rolls.map(CapModifier.applySingleCap(this.options))
    )
  }

  toDescription = (): string[] | undefined => {
    if (this.options === undefined) return undefined
    return formatters.greaterLess
      .descriptions(this.options)
      .map((str) => `No Rolls ${str}`)
  }

  toNotation = (): string | undefined => {
    if (this.options === undefined) return undefined
    const capList = formatters.greaterLess.notation(this.options)
    return `C{${capList.join(',')}}`
  }
}
