import type { NumericRollBonus, RerollOptions } from '~types'
import { formatGreaterLess } from '~utils/descriptionFormatters/formatGreaterLess'
import { formatHumanList } from '~utils/formatHumanList'
import { rerollRoll } from '~utils/modifierApplicators/rerollRoll'
import { maxNotation } from '~utils/notationFormatters/maxNotation'

export class RerollModifier {
  private options: RerollOptions | undefined
  constructor(options: RerollOptions | undefined) {
    this.options = options
  }

  apply(rolls: number[], rollOne: () => number): NumericRollBonus {
    return {
      rolls: this.reroll(rolls, rollOne),
      simpleMathModifier: 0
    }
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    const rerollList = []

    if (this.options.exact) {
      this.options.exact.forEach((roll) => {
        rerollList.push(String(roll))
      })
    }
    const greaterLess = formatGreaterLess(this.options)
    if (greaterLess.length > 0) {
      rerollList.push(greaterLess.join(','))
    }

    if (rerollList.length === 0) return ''
    return `R{${rerollList.join(',')}}${maxNotation(this.options.max)}`
  }

  toDescription(): string | undefined {
    if (this.options === undefined) return undefined
    const rerollList: string[] = []

    if (this.options.exact) {
      this.options.exact.forEach((roll) => {
        rerollList.push(String(roll))
      })
    }
    const greaterLess = `${formatGreaterLess(this.options).join(' and ')}`

    const exactList = formatHumanList(rerollList)

    const exactString = [exactList, greaterLess]
      .filter((i) => i !== '')
      .join(', ')

    if (exactString === '') return ''
    const coreString = `Reroll ${exactString}`

    if (this.options.max) {
      return `${coreString} (up to ${this.options.max} times)`
    }

    return coreString
  }

  private reroll(rolls: number[], rollOne: () => number): number[] {
    if (this.options === undefined) return []
    return [...rolls].map((roll) =>
      rerollRoll(roll, this.options as RerollOptions, rollOne)
    )
  }
}
