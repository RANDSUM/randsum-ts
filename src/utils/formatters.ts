import type { ComparisonOptions } from '~types'

export const formatters = {
  humanList: (list: (string | number)[]): string => {
    return list
      .map((num, index, list) => {
        if (list.length === 1) return `[${num}]`
        if (index === list.length - 1) return `and [${num}]`
        return `[${num}] `
      })
      .join('')
  },

  greaterLess: {
    descriptions: (
      options: ComparisonOptions,
      list: string[] = []
    ): string[] => {
      if (options.greaterThan) {
        list.push(`greater than [${options.greaterThan}]`)
      }
      if (options.lessThan) {
        list.push(`less than [${options.lessThan}]`)
      }
      return list
    },

    notation: (options: ComparisonOptions, list: string[] = []): string[] => {
      if (options.greaterThan) {
        list.push(`>${options.greaterThan}`)
      }
      if (options.lessThan) {
        list.push(`<${options.lessThan}`)
      }
      return list
    }
  }
}
