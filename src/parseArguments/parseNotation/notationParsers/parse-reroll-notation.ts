import { RerollOptions, RollParameters } from '../../../types'

export function parseRerollNotation(notationString: string): Pick<RollParameters, 'reroll'> {
  const parsedString = notationString.split('r')[1].replace(/{/g, '').replace(/}/g, ',!').split(',')
  let rerollParameters: RerollOptions<number> = { exact: [] }
  for (const notation of parsedString) {
    if (notation === '!') {
      continue
    }
    if (notation.includes('<')) {
      rerollParameters = { ...rerollParameters, lessThan: Number(notation.split('<')[1]) }
      continue
    }
    if (notation.includes('>')) {
      rerollParameters = { ...rerollParameters, greaterThan: Number(notation.split('>')[1]) }
      continue
    }
    if (notation.includes('!')) {
      rerollParameters = { ...rerollParameters, maxReroll: Number(notation.split('!')[1]) }
      continue
    }
    rerollParameters = {
      ...rerollParameters,
      exact: [
        ...(Array.isArray(rerollParameters?.exact) ? rerollParameters.exact : ([] as number[])),
        Number(notation),
      ],
    }
  }

  return { reroll: rerollParameters }
}
