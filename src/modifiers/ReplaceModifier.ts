import { replacePattern } from '~patterns'
import type { ModifierOptions, NumericRollBonus, ReplaceOptions } from '~types'
import { extractFromValue } from '~utils/descriptionFormatters/extractFromValue'
import { replaceArgs } from '~utils/notationFormatters/replaceArgs'
import { extractMatches } from '~utils/notationParsers/extractMatches'
import { CapModifier } from './CapModifier'

export class ReplaceModifier {
  static parse(modifiersString: string): Pick<ModifierOptions, 'replace'> {
    const notations = extractMatches(modifiersString, replacePattern)
    if (notations.length === 0) {
      return {}
    }
    const replace = notations
      .map((notationString) => {
        const replaceOptions = notationString
          .split(/[Vv]/)[1]
          .replaceAll('{', '')
          .replaceAll('}', '')
          .split(',')
          .map((replacement) => {
            const [noteFrom, noteTo] = replacement.split('=')

            const coreReplacement = { to: Number(noteTo) }
            if (noteFrom.includes('>')) {
              return {
                ...coreReplacement,
                from: { greaterThan: Number(noteFrom.replaceAll('>', '')) }
              }
            }
            if (noteFrom.includes('<')) {
              return {
                ...coreReplacement,
                from: { lessThan: Number(noteFrom.replaceAll('<', '')) }
              }
            }
            return { ...coreReplacement, from: Number(noteFrom) }
          })

        if (replaceOptions.length === 1) {
          return replaceOptions[0]
        }
        return replaceOptions.filter(Boolean)
      })
      .flat()
    return { replace }
  }

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
