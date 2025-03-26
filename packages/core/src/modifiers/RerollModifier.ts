import { rerollPattern } from '../patterns'
import type { ModifierOptions, NumericRollBonus, RerollOptions } from '../types'
import { extractMatches } from '../utils/extractMatches'
import { formatters } from '../utils/formatters'

export class RerollModifier {
  static parse(modifiersString: string): Pick<ModifierOptions, 'replace'> {
    const notations = extractMatches(modifiersString, rerollPattern)
    if (notations.length === 0) {
      return {}
    }

    return notations.reduce(
      (acc, notationString) => {
        const parsedString = (notationString.split(/[Rr]/)[1] || '')
          .replaceAll('{', '')
          .replaceAll('}', ',!')
          .split(',')

        const rerollOptions = parsedString.reduce((innerAcc, notation) => {
          if (notation === '!') {
            return innerAcc
          }
          if (notation.includes('<')) {
            return {
              ...innerAcc,
              lessThan: Number(notation.split('<')[1])
            }
          }
          if (notation.includes('>')) {
            return {
              ...innerAcc,
              greaterThan: Number(notation.split('>')[1])
            }
          }
          if (notation.includes('!')) {
            return {
              ...innerAcc,
              max: Number(notation.split('!')[1])
            }
          }

          return {
            ...innerAcc,
            exact: [...(innerAcc.exact || []), Number(notation)]
          }
        }, {} as RerollOptions)

        return {
          reroll: {
            ...acc.reroll,
            ...rerollOptions
          }
        }
      },
      { reroll: {} }
    ) as Pick<ModifierOptions, 'replace'>
  }
  private options: RerollOptions | undefined
  constructor(options: RerollOptions | undefined) {
    this.options = options
  }

  apply(rolls: number[], rollOne: () => number): NumericRollBonus {
    if (this.options === undefined) return { rolls, simpleMathModifier: 0 }

    return {
      rolls: [...rolls].map((roll) =>
        this.rerollRoll(roll, this.options as RerollOptions, rollOne)
      ),
      simpleMathModifier: 0
    }
  }

  toDescription(): string | undefined {
    if (this.options === undefined) return undefined
    const rerollList: string[] = []

    if (this.options.exact) {
      this.options.exact.forEach((roll) => {
        rerollList.push(String(roll))
      })
    }
    const greaterLess = `${formatters.greaterLess.descriptions(this.options).join(' and ')}`

    const exactList = formatters.humanList(rerollList)

    const exactString = [exactList, greaterLess]
      .filter((i) => i !== '')
      .join(', ')

    if (exactString === '') return undefined
    const coreString = `Reroll ${exactString}`

    if (this.options.max) {
      return `${coreString} (up to ${this.options.max} times)`
    }

    return coreString
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    const rerollList = []

    if (this.options.exact) {
      this.options.exact.forEach((roll) => {
        rerollList.push(String(roll))
      })
    }
    const greaterLess = formatters.greaterLess.notation(this.options)
    if (greaterLess.length > 0) {
      rerollList.push(greaterLess.join(','))
    }

    if (rerollList.length === 0) return ''
    return `R{${rerollList.join(',')}}${this.maxNotation(this.options.max)}`
  }

  private extractExactValue(
    exact: number[] | undefined,
    roll: number
  ): boolean {
    if (exact === undefined) {
      return false
    }
    return exact.includes(roll)
  }

  private maxNotation(max: number | undefined) {
    if (max === undefined) return ''
    return max
  }

  private rerollRoll(
    roll: number,
    { greaterThan, lessThan, exact, max }: RerollOptions,
    rollOne: () => number,
    index = 0
  ): number {
    if (max === index) {
      return roll
    }
    if (index === 99) {
      return roll
    }

    if (
      greaterThan !== undefined &&
      lessThan !== undefined &&
      exact !== undefined &&
      max !== undefined &&
      ((greaterThan !== undefined && roll > greaterThan) ||
        (lessThan !== undefined && roll < lessThan) ||
        exact !== undefined ||
        this.extractExactValue(exact, roll))
    ) {
      return this.rerollRoll(
        rollOne(),
        {
          greaterThan,
          lessThan,
          exact,
          max
        },
        rollOne,
        index + 1
      )
    }
    return roll
  }
}
