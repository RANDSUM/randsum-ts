import { reroll } from 'digestNotation/matchers'

export function parseRerollNotation(modifierString: string) {
  const match = modifierString.match(reroll)

  if (!match) {
    return undefined
  }

  return match[0]
    .toLowerCase()
    .split('r')[1]
    .replace('{', '')
    .replace('}', ',!')
    .split(',')
    .reduce(
      (options, notation) => {
        if (notation === '!') {
          return options
        }
        switch (true) {
          case notation.includes('<'):
            return { ...options, below: Number(notation.split('<')[1]) }
          case notation.includes('>'):
            return { ...options, above: Number(notation.split('>')[1]) }
          case notation.includes('!'):
            return { ...options, maxReroll: Number(notation.split('!')[1]) }
          default:
            return { ...options, on: [...options.on, Number(notation)] }
        }
      },
      { on: [] as number[] },
    )
}
