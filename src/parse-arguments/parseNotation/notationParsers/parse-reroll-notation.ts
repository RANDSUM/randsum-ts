import { RerollModifier, RerollOptions } from 'types'

export default function parseRerollNotation(
  notationString: string
): RerollModifier<number> {
  const parsedString = notationString
    .split('r')[1]
    .replace(/{/g, '')
    .replace(/}/g, ',!')
    .split(',')
  let rerollParameters: RerollOptions<number> = {}
  parsedString.forEach((notation) => {
    if (notation === '!') {
      return
    }
    if (notation.includes('<')) {
      rerollParameters = {
        ...rerollParameters,
        lessThan: Number(notation.split('<')[1])
      }
      return
    }
    if (notation.includes('>')) {
      rerollParameters = {
        ...rerollParameters,
        greaterThan: Number(notation.split('>')[1])
      }
      return
    }
    if (notation.includes('!')) {
      rerollParameters = {
        ...rerollParameters,
        maxReroll: Number(notation.split('!')[1])
      }
      return
    }
    rerollParameters = {
      ...rerollParameters,
      exact: [
        ...(Array.isArray(rerollParameters?.exact)
          ? rerollParameters.exact
          : ([] as number[])),
        Number(notation)
      ]
    }
  })

  return { reroll: rerollParameters }
}
