export function parseUniqeNotation(notationString: string) {
  if (notationString === 'u') {
    return { unique: true }
  }

  const notUnique = notationString.replace(/u{/g, '').replace(/}/g, '').split(',')

  return {
    unique: {
      notUnique: notUnique.map(number => Number(number)),
    },
  }
}
