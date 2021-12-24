export function parseRerollNotation(modifierString: string) {
  return modifierString
    .split('r')[1]
    .replace(/{/g, '')
    .replace(/}/g, ',!')
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
