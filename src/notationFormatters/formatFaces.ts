export function formatFaces(sides: string[]): string {
  return sides
    .map((s) => {
      if (s === '') return ' '
      return s
    })
    .join('')
}
