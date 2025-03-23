import type { DropOptions, NumericRollBonus } from '~types'
import { formatGreaterLess } from '~utils/descriptionFormatters/formatGreaterLess'
import { formatHumanList } from '~utils/formatHumanList'
import { formatGreaterLess as formatGreaterLessNotation } from '~utils/notationFormatters/formatGreaterLess'
import { times } from '~utils/times'

export class DropModifier {
  private options: DropOptions | undefined
  constructor(options: DropOptions | undefined) {
    this.options = options
  }

  apply(rolls: number[]): NumericRollBonus {
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
      times(highest)(() => sortedResults.pop())
    }

    if (lowest !== undefined) {
      times(lowest)(() => sortedResults.shift())
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
      const exact = formatHumanList(this.options.exact)
      dropList.push(`Drop ${exact}`)
    }

    formatGreaterLess(this.options).forEach((str) =>
      dropList.push(`Drop ${str}`)
    )

    return dropList
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    const dropList: string[] = []
    const greaterLess = formatGreaterLessNotation(this.options)
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
}
