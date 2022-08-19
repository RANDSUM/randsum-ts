import { DropModifier } from '../../../../types'

export function parseDropLowNotation (notationString: string): DropModifier<number> {
  const lowestCount = notationString.split('l')[1]

  return {
    drop: {
      lowest: lowestCount !== '' ? Number(lowestCount) : 1
    }
  }
}
