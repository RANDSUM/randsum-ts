import type { NumericRollBonus, ReplaceOptions } from '~types'
import { extractFromValue } from '~utils/descriptionFormatters/extractFromValue'
import { replaceArgs } from '~utils/notationFormatters/replaceArgs'
import { CapModifier } from './CapModifier'

export class ReplaceModifier {
  private options: ReplaceOptions | ReplaceOptions[] | undefined
  constructor(options: ReplaceOptions | ReplaceOptions[] | undefined) {
    this.options = options
  }

  apply(rolls: number[]): NumericRollBonus {
    if (this.options === undefined) return { rolls, simpleMathModifier: 0 }
    let replaceRolls = rolls
    const parameters = [this.options].flat()

    parameters.forEach(({ from, to }) => {
      replaceRolls = replaceRolls.map((roll) => {
        if (from !== undefined) {
          if (typeof from === 'object') {
            return CapModifier.applySingleCap(from, to)(roll)
          }
          if (roll === from) {
            return to
          }
        }
        return roll
      })
    })

    return {
      rolls: replaceRolls,
      simpleMathModifier: 0
    }
  }

  toDescription(): string[] | string | undefined {
    if (this.options === undefined) return undefined
    if (Array.isArray(this.options)) {
      return this.options.map(this.singleReplaceString)
    }

    return this.singleReplaceString(this.options)
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    return `V{${replaceArgs(this.options).join(',')}}`
  }

  private singleReplaceString({ from, to }: ReplaceOptions): string {
    return `Replace ${extractFromValue(from)} with [${to}]`
  }
}
