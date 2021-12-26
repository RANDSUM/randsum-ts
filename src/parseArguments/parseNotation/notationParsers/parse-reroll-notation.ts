import { RerollOptions } from 'types'

export function parseRerollNotation(notationString: string) {
  const parsedString = notationString.split('r')[1].replace(/{/g, '').replace(/}/g, ',!').split(',')
  let rerollParameters: RerollOptions<number> = { on: [] }
  for (const notation of parsedString) {
    if (notation === '!') {
      continue
    }
    if (notation.includes('<')) {
      rerollParameters = { ...rerollParameters, below: Number(notation.split('<')[1]) }
      continue
    }
    if (notation.includes('>')) {
      rerollParameters = { ...rerollParameters, above: Number(notation.split('>')[1]) }
      continue
    }
    if (notation.includes('!')) {
      rerollParameters = { ...rerollParameters, maxReroll: Number(notation.split('!')[1]) }
      continue
    }
    rerollParameters = {
      ...rerollParameters,
      on: [...(Array.isArray(rerollParameters?.on) ? rerollParameters.on : ([] as number[])), Number(notation)],
    }
  }

  return { reroll: rerollParameters }
}
