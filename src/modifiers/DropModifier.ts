import {
  dropConstraintsPattern,
  dropHighestPattern,
  dropLowestPattern
} from '~patterns'
import type { DropOptions, ModifierOptions, NumericRollBonus } from '~types'
import { extractMatches } from '~utils/extractMatches'
import { formatters } from '~utils/formatters'

export class DropModifier {
  static parseConstraints = (
    notations: string[]
  ): Pick<ModifierOptions, 'drop'> => {
    if (notations.length === 0) {
      return {}
    }
    const dropConstraintParameters: DropOptions = {}

    return notations.reduce(
      (acc, notationString) => {
        const constraints = notationString
          .split(/[Dd]/)[1]
          .replaceAll('{', '')
          .replaceAll('}', '')
          .split(',')
        const parsedConstraints = constraints.reduce((innerAcc, constraint) => {
          if (constraint.includes('<')) {
            return {
              ...innerAcc,
              lessThan: Number(constraint.split('<')[1])
            }
          }

          if (constraint.includes('>')) {
            return {
              ...innerAcc,
              greaterThan: Number(constraint.split('>')[1])
            }
          }

          const exact = [...(innerAcc?.exact || []), Number(constraint)]

          return {
            ...innerAcc,
            exact
          }
        }, dropConstraintParameters)

        return {
          drop: {
            ...acc.drop,
            ...parsedConstraints
          }
        }
      },
      { drop: dropConstraintParameters }
    )
  }

  static parseHigh(notations: string[]): Pick<ModifierOptions, 'drop'> {
    if (notations.length === 0) {
      return {}
    }

    const notationString = notations[notations.length - 1]
    const highestCount = notationString.split(/[Hh]/)[1]

    if (highestCount === '') {
      return {
        drop: { highest: 1 }
      }
    }

    return {
      drop: { highest: Number(highestCount) }
    }
  }

  static parseLow(notations: string[]): Pick<ModifierOptions, 'drop'> {
    if (notations.length === 0) {
      return { drop: {} }
    }
    const notationString = notations[notations.length - 1]
    const lowestCount = notationString.split(/[Ll]/)[1]

    if (lowestCount === '') {
      return {
        drop: {
          lowest: 1
        }
      }
    }

    return {
      drop: {
        lowest: Number(lowestCount)
      }
    }
  }

  static parse = (modifiersString: string): Pick<ModifierOptions, 'drop'> => {
    const dropHighModifiers = DropModifier.parseHigh(
      extractMatches(modifiersString, dropHighestPattern)
    )
    const dropLowModifiers = DropModifier.parseLow(
      extractMatches(modifiersString, dropLowestPattern)
    )
    const dropConstraintsModifiers = DropModifier.parseConstraints(
      extractMatches(modifiersString, dropConstraintsPattern)
    )

    const rawDropModifiers = {
      drop: {
        ...dropHighModifiers.drop,
        ...dropLowModifiers.drop,
        ...dropConstraintsModifiers.drop
      }
    }

    if (Object.keys(rawDropModifiers.drop).length > 0) {
      return rawDropModifiers
    }
    return {}
  }

  private options: DropOptions | undefined

  constructor(options: DropOptions | undefined) {
    this.options = options
  }

  apply = (rolls: number[]): NumericRollBonus => {
    if (this.options === undefined) return { rolls, simpleMathModifier: 0 }
    const { highest, lowest, greaterThan, lessThan, exact } = this
      .options as DropOptions
    const sortedResults = rolls
      .filter(
        (roll) =>
          !(
            (greaterThan !== undefined && roll > greaterThan) ||
            (lessThan !== undefined && roll < lessThan) ||
            exact?.map((number) => number).includes(roll) === true
          )
      )
      .sort((a, b) => a - b)

    if (highest !== undefined) {
      this.times(highest)(() => sortedResults.pop())
    }

    if (lowest !== undefined) {
      this.times(lowest)(() => sortedResults.shift())
    }

    return {
      rolls: sortedResults,
      simpleMathModifier: 0
    }
  }

  toDescription(): string[] | undefined {
    if (this.options === undefined) return undefined
    const dropList = []

    if (this.options.highest && this.options.highest > 1)
      dropList.push(`Drop highest ${this.options.highest}`)

    if (this.options.highest && this.options.highest <= 1)
      dropList.push(`Drop highest`)

    if (this.options.lowest && this.options.lowest > 1)
      dropList.push(`Drop lowest ${this.options.lowest}`)

    if (this.options.lowest && this.options.lowest <= 1)
      dropList.push(`Drop lowest`)

    if (this.options.exact) {
      const exact = formatters.humanList(this.options.exact)
      dropList.push(`Drop ${exact}`)
    }

    formatters.greaterLess
      .descriptions(this.options)
      .forEach((str) => dropList.push(`Drop ${str}`))

    return dropList
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    const dropList: string[] = []
    const greaterLess = formatters.greaterLess.notation(this.options)
    greaterLess.forEach((str) => dropList.push(str))
    if (this.options.exact) {
      this.options.exact.forEach((roll) => {
        dropList.push(String(roll))
      })
    }

    const finalList = []

    if (this.options.highest && this.options.highest > 1) {
      finalList.push(`H${this.options.highest}`)
    }

    if (this.options.highest && this.options.highest <= 1) {
      finalList.push(`H`)
    }

    if (this.options.lowest && this.options.lowest > 1) {
      finalList.push(`L${this.options.lowest}`)
    }

    if (this.options.lowest && this.options.lowest <= 1) {
      finalList.push(`L`)
    }

    if (dropList.length > 0) {
      finalList.push(`D{${dropList.map((str) => str).join(',')}}`)
    }

    return finalList.join('')
  }

  private times = (iterator: number) => {
    return (callback: (index?: number) => void): void => {
      if (iterator > 0) {
        callback(iterator)
        this.times(iterator - 1)(callback)
      }
    }
  }
}
