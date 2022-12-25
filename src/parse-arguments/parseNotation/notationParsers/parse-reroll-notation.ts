import { RerollMatch, RerollModifier, RerollOptions } from 'types'

export default function parseRerollNotation({
  rerollMatch: notationString
}: RerollMatch): RerollModifier<number> {
  const parsedString = notationString
    .split(/[Rr]/)[1]
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
