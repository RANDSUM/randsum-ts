export function parseUniqeNotation(notationString: string) {
  if (notationString === 'u') {
    return true
  }

  const notUnique = notationString.replace(/u{/g, '').replace(/}/g, '').split(',')

  return {
    notUnique: notUnique.map(number => Number(number)),
  }
}
