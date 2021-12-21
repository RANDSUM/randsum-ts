const corePattern = /(\d+)[dD](\d+)/g

export function digestCore(notationString: string) {
  const coreMatches = notationString.toLowerCase().match(corePattern)

  if (!coreMatches) {
    throw `Dice Notation is not parseable. Received: ${notationString}`
  }

  const [rolls, sides] = coreMatches[0].split('d').map(Number)

  return {
    rolls,
    sides,
  }
}
