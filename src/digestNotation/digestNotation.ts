const corePattern = /(\d+)[dD](\d+)/g

export function digestNotation(notationString: string) {
  const coreMatches = notationString.toLowerCase().match(corePattern)

  if (!coreMatches) {
    throw `Dice Notation is not parseable. Received: ${notationString}`
  }

  const core = coreMatches[0]
  const [rolls, sides] = core.split('d').map(Number)

  return {
    rolls,
    sides,
  }
}
