export function parseUniqeNotation(modifierString: string) {
  if (modifierString === 'u') {
    return true
  }

  const notUnique = modifierString.replace(/u{/g, '').replace(/}/g, '').split(',')

  return {
    notUnique: notUnique.map(number_ => Number(number_)),
  }
}
